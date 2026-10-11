import { upload } from '@vercel/blob/client';

const DEFAULT_ENDPOINT = '/api/certificates';

function getEndpoint() {
  return import.meta.env.VITE_CERTIFICATES_API_URL || DEFAULT_ENDPOINT;
}

function getUploadEndpoint() {
  const configuredEndpoint = import.meta.env.VITE_CERTIFICATE_UPLOAD_API_URL?.trim();
  if (configuredEndpoint) return configuredEndpoint;

  // The data-URL fallback is only supported by the local Express server. If
  // the listing API is hosted remotely, derive its matching Blob token route so
  // a missing optional upload URL cannot silently select the incompatible API.
  const endpoint = getEndpoint();
  try {
    const url = new URL(endpoint);
    if (/\/api\/certificates\/?$/.test(url.pathname)) {
      url.pathname = url.pathname.replace(/\/certificates\/?$/, '/certificate-upload');
      url.search = '';
      url.hash = '';
      return url.toString();
    }
  } catch {
    // Relative endpoints use the local Express data-URL upload route.
  }
  return '';
}

async function read(response, fallback) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || fallback);
  return data;
}

async function request(url, options, fallback) {
  try {
    return await read(await fetch(url, options), fallback);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Could not reach the local upload server. Run "npm run server" and use the local site at http://localhost:5173.');
    }
    throw error;
  }
}

export async function fetchStoredCertificates() {
  return request(getEndpoint(), undefined, 'Certificates could not be loaded.');
}

export async function uploadStoredCertificate(token, name, file) {
  const uploadEndpoint = getUploadEndpoint();
  if (uploadEndpoint) {
    const blob = await upload(file.name, file, {
      access: 'public',
      handleUploadUrl: uploadEndpoint,
      clientPayload: JSON.stringify({ adminToken: token, name, mimeType: file.type }),
    });
    return request(getEndpoint(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, mimeType: file.type, url: blob.url }),
    }, 'Certificate could not be added to the public listing.');
  }

  const endpoint = getEndpoint();
  const data = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(new Error('The selected certificate could not be read.'));
    reader.readAsDataURL(file);
  });
  return request(getEndpoint(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, mimeType: file.type, data }),
  }, 'Certificate could not be saved to public/upload.');
}

export async function deleteStoredCertificate(token, id) {
  return request(`${getEndpoint()}?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  }, 'Certificate could not be deleted.');
}
