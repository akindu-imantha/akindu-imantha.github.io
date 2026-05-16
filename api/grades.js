import { hasValidAnalyticsToken } from '../server/analytics-store.js';
import {
  getStoredAcademicGrades,
  isGradesStorageConfigured,
  saveStoredAcademicGrades,
} from '../server/grades-store.js';

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
  response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
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

  try {
    if (request.method === 'GET') {
      if (!isGradesStorageConfigured()) {
        sendJson(response, 200, { academicGrades: null });
        return;
      }

      sendJson(response, 200, { academicGrades: await getStoredAcademicGrades() });
      return;
    }

    if (request.method === 'PUT') {
      if (!hasValidAnalyticsToken(request)) {
        sendJson(response, 401, { message: 'Admin token is required.' });
        return;
      }

      if (!isGradesStorageConfigured()) {
        sendJson(response, 503, { message: 'Grades storage is not configured.' });
        return;
      }

      const result = await saveStoredAcademicGrades(request.body?.academicGrades);
      sendJson(response, 200, result);
      return;
    }

    sendJson(response, 405, { message: 'Method not allowed.' });
  } catch (error) {
    console.error('Grades request failed:', error);
    sendJson(response, error.status ?? 500, { message: error.message || 'Grades request failed.' });
  }
}
