const DEFAULT_ENDPOINT = 'https://akindu-portfolio-api.vercel.app/api/moments';

function endpoint() {
  return import.meta.env.VITE_MOMENTS_API_URL || DEFAULT_ENDPOINT;
}

async function read(response, fallback) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || fallback);
  return data;
}

export async function fetchStoredMoments() {
  return read(await fetch(endpoint()), 'Portfolio moments could not be loaded.');
}

export async function saveStoredMoments(token, imageBar) {
  return read(await fetch(endpoint(), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ imageBar }),
  }), 'Portfolio moments could not be saved.');
}
