import { upload } from '@vercel/blob/client';

const DEFAULT_ENDPOINT = 'https://akindu-portfolio-api.vercel.app/api/certificates';

function getEndpoint() {
  return import.meta.env.VITE_CERTIFICATES_API_URL || DEFAULT_ENDPOINT;
}

async function read(response, fallback) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || fallback);
  return data;
}

export async function fetchStoredCertificates() {
  return read(await fetch(getEndpoint()), 'Certificates could not be loaded.');
}

export async function uploadStoredCertificate(token, name, file) {
  const endpoint = getEndpoint();
  const blob = await upload(`certificates/${file.name}`, file, {
    access: 'public',
    handleUploadUrl: `${endpoint.replace(/\/$/, '')}/upload`,
    clientPayload: JSON.stringify({ adminToken: token, name, mimeType: file.type }),
  });
  return read(await fetch(getEndpoint(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, url: blob.url, mimeType: file.type }),
  }), 'Certificate could not be uploaded.');
}

export async function deleteStoredCertificate(token, id) {
  return read(await fetch(`${getEndpoint()}?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  }), 'Certificate could not be deleted.');
}
