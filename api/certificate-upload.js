import { handleUpload } from '@vercel/blob/client';
import { hasValidAnalyticsToken } from '../server/analytics-store.js';
import {
  getStoredCertificates,
  isCertificateListingStorageConfigured,
  isCertificatesStorageConfigured,
} from '../server/certificates-store.js';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];

function setCors(request, response) {
  const origins = String(process.env.CORS_ORIGIN ?? '').split(',').map((value) => value.trim()).filter(Boolean);
  const origin = request.headers.origin;
  if (origin && origins.includes(origin)) response.setHeader('Access-Control-Allow-Origin', origin);
  response.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(request, response) {
  setCors(request, response);
  if (request.method === 'OPTIONS') return response.status(204).end();
  if (request.method !== 'POST') return response.status(405).json({ message: 'Method not allowed.' });
  if (!isCertificatesStorageConfigured() || !isCertificateListingStorageConfigured()) {
    return response.status(503).json({ message: 'Certificate storage is not configured. Set the Upstash Redis and Vercel Blob environment variables.' });
  }

  try {
    // Pass the configured store token explicitly so token generation always
    // uses the same Blob store as the deployment's BLOB_READ_WRITE_TOKEN.
    const result = await handleUpload({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      body: request.body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        let details;
        try {
          details = JSON.parse(clientPayload || '{}');
        } catch {
          throw new Error('Invalid upload details.');
        }
        if (!hasValidAnalyticsToken({ headers: { authorization: `Bearer ${details.adminToken ?? ''}` } })) {
          throw new Error('Admin token is required.');
        }
        if (!allowedTypes.includes(details.mimeType)) throw new Error('Choose a PDF, JPG, PNG, or WebP certificate.');
        const certificates = await getStoredCertificates() ?? [];
        if (certificates.length >= 30) throw new Error('You can store up to 30 certificates.');
        return {
          allowedContentTypes: [details.mimeType],
          maximumSizeInBytes: MAX_FILE_SIZE,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({
            name: String(details.name ?? '').trim().slice(0, 100) || 'Certificate',
            mimeType: details.mimeType,
          }),
        };
      },
      onUploadCompleted: async () => {},
    });
    return response.status(200).json(result);
  } catch (error) {
    const message = error.message || 'Certificate upload could not be authorized.';
    if (/access denied|valid token for this resource/i.test(message)) {
      return response.status(error.status ?? 400).json({
        message: 'Vercel Blob rejected BLOB_READ_WRITE_TOKEN. In the Vercel project serving this API, connect the intended Blob store, update BLOB_READ_WRITE_TOKEN for this deployment environment, then redeploy.',
      });
    }
    return response.status(error.status ?? 400).json({ message });
  }
}

