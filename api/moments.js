import { hasValidAnalyticsToken } from '../server/analytics-store.js';
import { getStoredMoments, isMomentsStorageConfigured, saveStoredMoments } from '../server/moments-store.js';

function cors(request, response) {
  const origins = String(process.env.CORS_ORIGIN ?? '').split(',').map((value) => value.trim()).filter(Boolean);
  const origin = request.headers.origin;
  if (origin && origins.includes(origin)) response.setHeader('Access-Control-Allow-Origin', origin);
  response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
}

export default async function handler(request, response) {
  cors(request, response);
  if (request.method === 'OPTIONS') return response.status(204).end();
  try {
    if (request.method === 'GET') {
      return response.status(200).json({ imageBar: await getStoredMoments() });
    }
    if (request.method === 'PUT') {
      if (!hasValidAnalyticsToken(request)) return response.status(401).json({ message: 'Admin token is required.' });
      if (!isMomentsStorageConfigured()) return response.status(503).json({ message: 'Portfolio moments storage is not configured.' });
      return response.status(200).json(await saveStoredMoments(request.body?.imageBar));
    }
    return response.status(405).json({ message: 'Method not allowed.' });
  } catch (error) {
    return response.status(error.status ?? 500).json({ message: error.message || 'Portfolio moments request failed.' });
  }
}
