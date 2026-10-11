import { del } from '@vercel/blob';

const CERTIFICATES_KEY = 'portfolio:certificates';
const MAX_CERTIFICATES = 30;
const allowedTypes = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);

export function getBlobReadWriteToken() {
  return process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB1_READ_WRITE_TOKEN;
}

function getRedisConfig() {
  return {
    url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
  };
}

export function getMissingCertificatesStorageSettings() {
  const { url, token } = getRedisConfig();
  const missing = [];
  if (!url) missing.push('KV_REST_API_URL (or UPSTASH_REDIS_REST_URL)');
  if (!token) missing.push('KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_TOKEN)');
  if (!getBlobReadWriteToken()) missing.push('BLOB_READ_WRITE_TOKEN (or BLOB1_READ_WRITE_TOKEN)');
  return missing;
}

export function isCertificateListingStorageConfigured() {
  const { url, token } = getRedisConfig();
  return Boolean(url && token);
}

export function isCertificatesStorageConfigured() {
  return getMissingCertificatesStorageSettings().length === 0;
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
  if (!isCertificateListingStorageConfigured()) return null;
  const results = await redisPipeline([['GET', CERTIFICATES_KEY]]);
  try {
    const certificates = JSON.parse(results[0]?.result ?? 'null');
    return validCertificates(certificates) ? certificates : [];
  } catch {
    return [];
  }
}

function isVercelBlobUrl(url) {
  try {
    return new URL(url).hostname.endsWith('.public.blob.vercel-storage.com');
  } catch {
    return false;
  }
}
export async function addStoredCertificate(url, name, mimeType) {
  if (!isCertificatesStorageConfigured()) {
    const error = new Error('Certificate storage is not configured. Set the Upstash Redis and Vercel Blob environment variables.');
    error.status = 503;
    throw error;
  }
  if (typeof url !== 'string' || !isVercelBlobUrl(url) || !allowedTypes.has(mimeType)) {
    const error = new Error('Upload a PDF, JPG, PNG, or WebP certificate using Vercel Blob.');
    error.status = 400;
    throw error;
  }
  const certificates = await getStoredCertificates() ?? [];
  if (certificates.length >= MAX_CERTIFICATES) {
    const error = new Error(`You can store up to ${MAX_CERTIFICATES} certificates.`);
    error.status = 400;
    throw error;
  }
  const certificate = {
    id: crypto.randomUUID(),
    name: String(name ?? '').trim().slice(0, 100) || 'Certificate',
    url,
    type: mimeType === 'application/pdf' ? 'pdf' : 'image',
    createdAt: new Date().toISOString(),
  };
  const nextCertificates = [certificate, ...certificates];
  try {
    await redisPipeline([['SET', CERTIFICATES_KEY, JSON.stringify(nextCertificates)]]);
  } catch (error) {
    await del(url, { token: getBlobReadWriteToken() }).catch(() => {});
    throw error;
  }
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
  const certificate = certificates.find((item) => item.id === id);
  if (isVercelBlobUrl(certificate.url)) await del(certificate.url, { token: getBlobReadWriteToken() });
  await redisPipeline([['SET', CERTIFICATES_KEY, JSON.stringify(nextCertificates)]]);
  return { certificates: nextCertificates };
}
