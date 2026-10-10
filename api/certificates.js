import { hasValidAnalyticsToken } from '../server/analytics-store.js';
import {
  addStoredCertificate,
  deleteStoredCertificate,
  getMissingCertificatesStorageSettings,
  getStoredCertificates,
  isCertificateListingStorageConfigured,
  isCertificatesStorageConfigured,
} from '../server/certificates-store.js';

function setCors(request, response) {
  const origins = String(process.env.CORS_ORIGIN ?? '').split(',').map((value) => value.trim()).filter(Boolean);
  const origin = request.headers.origin;
  if (origin && origins.includes(origin)) response.setHeader('Access-Control-Allow-Origin', origin);
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
}

export const config = { api: { bodyParser: { sizeLimit: '15mb' } } };

export default async function handler(request, response) {
  setCors(request, response);
  if (request.method === 'OPTIONS') return response.status(204).end();
  try {
    if (request.method === 'GET') {
      if (!isCertificateListingStorageConfigured()) {
        return response.status(503).json({ message: 'Certificate listing storage is not configured. Set the Upstash Redis environment variables.' });
      }
      return response.status(200).json({ certificates: await getStoredCertificates() ?? [] });
    }
    if (!hasValidAnalyticsToken(request)) return response.status(401).json({ message: 'Admin token is required.' });
    if (!isCertificatesStorageConfigured()) {
      const missing = getMissingCertificatesStorageSettings();
      return response.status(503).json({ message: `Certificate storage is not configured. Missing: ${missing.join(', ')}.` });
    }
    if (request.method === 'POST') {
      return response.status(200).json(await addStoredCertificate(request.body?.url, request.body?.name, request.body?.mimeType));
    }
    if (request.method === 'DELETE') {
      return response.status(200).json(await deleteStoredCertificate(String(request.query?.id ?? '')));
    }
    return response.status(405).json({ message: 'Method not allowed.' });
  } catch (error) {
    return response.status(error.status ?? 500).json({ message: error.message || 'Certificates request failed.' });
  }
}
