const DEFAULT_ENDPOINT = '/api/certificates';

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
  const data = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(new Error('The selected certificate could not be read.'));
    reader.readAsDataURL(file);
  });
  return read(await fetch(getEndpoint(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, mimeType: file.type, data }),
  }), 'Certificate could not be saved to the upload folder.');
}

export async function deleteStoredCertificate(token, id) {
  return read(await fetch(`${getEndpoint()}?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  }), 'Certificate could not be deleted.');
}
