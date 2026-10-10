const CERTIFICATES_KEY = 'portfolio:certificates';
const MAX_CERTIFICATES = 30;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const allowedTypes = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);
const fileExtensions = {
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

function getRedisConfig() {
  return {
    url: process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN,
  };
}

export function isCertificatesStorageConfigured() {
  const { url, token } = getRedisConfig();
  return Boolean(url && token && process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
}

async function redisPipeline(commands) {
  const { url, token } = getRedisConfig();
  const response = await fetch(`${url.replace(/\/$/, '')}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  if (!response.ok) throw new Error(`Certificate listing storage failed with ${response.status}.`);
  return response.json();
}

function validCertificates(certificates) {
  return Array.isArray(certificates) && certificates.length <= MAX_CERTIFICATES && certificates.every((certificate) =>
    certificate && typeof certificate.id === 'string' && typeof certificate.name === 'string' &&
    typeof certificate.url === 'string' && typeof certificate.type === 'string' &&
    ['image', 'pdf'].includes(certificate.type) && typeof certificate.createdAt === 'string',
  );
}

export async function getStoredCertificates() {
  if (!isCertificatesStorageConfigured()) return null;
  const results = await redisPipeline([['GET', CERTIFICATES_KEY]]);
  try {
    const certificates = JSON.parse(results[0]?.result ?? 'null');
    return validCertificates(certificates) ? certificates : [];
  } catch {
    return [];
  }
}

async function uploadToCloudinary(file) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = 'portfolio-certificates';
  const publicId = `certificate-${crypto.randomUUID()}.${fileExtensions[file.mimeType]}`;
  const signatureSource = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(signatureSource));
  const hexSignature = Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, '0')).join('');
  const resourceType = file.mimeType === 'application/pdf' ? 'raw' : 'image';
  const form = new FormData();
  form.append('file', `data:${file.mimeType};base64,${file.data}`);
  form.append('api_key', apiKey);
  form.append('timestamp', String(timestamp));
  form.append('folder', folder);
  form.append('public_id', publicId);
  form.append('signature', hexSignature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, { method: 'POST', body: form });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.secure_url) {
    const error = new Error(result.error?.message || 'Certificate file upload failed.');
    error.status = 502;
    throw error;
  }
  return result.secure_url;
}
export async function addStoredCertificate(file, name) {
  if (!isCertificatesStorageConfigured()) {
    const error = new Error('Certificate storage is not configured. Set the Upstash Redis and Cloudinary environment variables.');
    error.status = 503;
    throw error;
  }
  if (!file || !allowedTypes.has(file.mimeType) || typeof file.data !== 'string' || !file.data || file.data.length > Math.ceil(MAX_FILE_SIZE * 4 / 3) + 16) {
    const error = new Error('Choose a PDF, JPG, PNG, or WebP certificate up to 10 MB.');
    error.status = 400;
    throw error;
  }
  const certificates = await getStoredCertificates() ?? [];
  if (certificates.length >= MAX_CERTIFICATES) {
    const error = new Error(`You can store up to ${MAX_CERTIFICATES} certificates.`);
    error.status = 400;
    throw error;
  }
  const url = await uploadToCloudinary(file);
  const certificate = {
    id: crypto.randomUUID(),
    name: String(name ?? '').trim().slice(0, 100) || 'Certificate',
    url,
    type: file.mimeType === 'application/pdf' ? 'pdf' : 'image',
    createdAt: new Date().toISOString(),
  };
  const nextCertificates = [certificate, ...certificates];
  await redisPipeline([['SET', CERTIFICATES_KEY, JSON.stringify(nextCertificates)]]);
  return { certificates: nextCertificates };
}

export async function deleteStoredCertificate(id) {
  if (!isCertificatesStorageConfigured()) {
    const error = new Error('Certificate storage is not configured.');
    error.status = 503;
    throw error;
  }
  const certificates = await getStoredCertificates() ?? [];
  const nextCertificates = certificates.filter((certificate) => certificate.id !== id);
  if (nextCertificates.length === certificates.length) {
    const error = new Error('Certificate not found.');
    error.status = 404;
    throw error;
  }
  await redisPipeline([['SET', CERTIFICATES_KEY, JSON.stringify(nextCertificates)]]);
  return { certificates: nextCertificates };
}
