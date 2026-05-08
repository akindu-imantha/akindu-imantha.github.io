import {
  getAnalyticsSummary,
  hasValidAnalyticsToken,
  isAnalyticsConfigured,
  recordAnalyticsVisit,
} from '../server/analytics-store.js';

function setCorsHeaders(request, response) {
  const allowedOrigins = String(process.env.CORS_ORIGIN ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  const origin = request.headers.origin;

  if (!origin || !allowedOrigins.includes(origin)) {
    return;
  }

  response.setHeader('Access-Control-Allow-Origin', origin);
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Analytics-Token');
}

function sendJson(response, status, data) {
  response.status(status).json(data);
}

export default async function handler(request, response) {
  setCorsHeaders(request, response);

  if (request.method === 'OPTIONS') {
    response.status(204).end();
    return;
  }

  if (!isAnalyticsConfigured()) {
    sendJson(response, 503, { message: 'Analytics storage is not configured.' });
    return;
  }

  try {
    if (request.method === 'POST') {
      const result = await recordAnalyticsVisit(request, request.body);
      sendJson(response, 200, result);
      return;
    }

    if (request.method === 'GET') {
      if (!hasValidAnalyticsToken(request)) {
        sendJson(response, 401, { message: 'Analytics token is required.' });
        return;
      }

      const summary = await getAnalyticsSummary();
      sendJson(response, 200, summary);
      return;
    }

    sendJson(response, 405, { message: 'Method not allowed.' });
  } catch (error) {
    console.error('Analytics request failed:', error);
    sendJson(response, 500, { message: 'Analytics request failed.' });
  }
}
