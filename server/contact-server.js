import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';
import {
  clearAnalyticsSummary,
  getAnalyticsSummary,
  hasValidAnalyticsToken,
  isAnalyticsConfigured,
  recordAnalyticsVisit,
} from './analytics-store.js';
import {
  getStoredAcademicGrades,
  isGradesStorageConfigured,
  saveStoredAcademicGrades,
} from './grades-store.js';
import {
  getStoredMoments,
  isMomentsStorageConfigured,
  saveStoredMoments,
} from './moments-store.js';

const app = express();
const port = Number(process.env.PORT ?? 5000);
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const certificateDirectory = path.join(projectRoot, 'public', 'upload');
const certificatesManifest = path.join(projectRoot, 'output', 'certificates.json');
const allowedCertificateTypes = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);

const defaultAllowedOrigins = [
  'http://localhost:5173',
  'https://akindu-imantha.github.io',
];

const allowedOrigin = [
  ...defaultAllowedOrigins,
  ...(process.env.CORS_ORIGIN ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean),
].filter((origin, index, origins) => origins.indexOf(origin) === index);

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: '15mb' }));

async function readLocalCertificates() {
  try {
    const certificates = JSON.parse(await readFile(certificatesManifest, 'utf8'));
    return Array.isArray(certificates) ? certificates : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

app.get('/api/certificates', async (_request, response) => {
  try {
    response.json({ certificates: await readLocalCertificates() });
  } catch (error) {
    console.error('Certificates load failed:', error);
    response.status(500).json({ message: 'Certificates could not be loaded.' });
  }
});

app.post('/api/certificates', async (request, response) => {
  if (!hasValidAnalyticsToken(request)) return response.status(401).json({ message: 'Admin token is required.' });
  const { name, mimeType, data } = request.body ?? {};
  if (!allowedCertificateTypes.has(mimeType) || typeof data !== 'string') {
    return response.status(400).json({ message: 'Choose a PDF, JPG, PNG, or WebP certificate.' });
  }
  const match = data.match(/^data:([\w.+-]+\/[\w.+-]+);base64,([A-Za-z0-9+/]+={0,2})$/);
  if (!match || match[1] !== mimeType) return response.status(400).json({ message: 'Certificate file data is invalid.' });
  const buffer = Buffer.from(match[2], 'base64');
  if (!buffer.length || buffer.length > 10 * 1024 * 1024) return response.status(400).json({ message: 'Each certificate must be 10 MB or smaller.' });
  try {
    const certificates = await readLocalCertificates();
    if (certificates.length >= 30) return response.status(400).json({ message: 'You can store up to 30 certificates.' });
    const extension = ({ 'application/pdf': '.pdf', 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' })[mimeType];
    const filename = `${randomUUID()}${extension}`;
    await mkdir(certificateDirectory, { recursive: true });
    await mkdir(path.dirname(certificatesManifest), { recursive: true });
    await writeFile(path.join(certificateDirectory, filename), buffer, { flag: 'wx' });
    const certificate = {
      id: randomUUID(),
      name: String(name ?? '').trim().slice(0, 100) || 'Certificate',
      url: `/upload/${filename}`,
      type: mimeType === 'application/pdf' ? 'pdf' : 'image',
      createdAt: new Date().toISOString(),
    };
    const nextCertificates = [certificate, ...certificates];
    await writeFile(certificatesManifest, `${JSON.stringify(nextCertificates, null, 2)}\n`, 'utf8');
    return response.json({ certificates: nextCertificates });
  } catch (error) {
    console.error('Certificate upload failed:', error);
    return response.status(500).json({ message: 'Certificate could not be saved to public/upload.' });
  }
});

app.delete('/api/certificates', async (request, response) => {
  if (!hasValidAnalyticsToken(request)) return response.status(401).json({ message: 'Admin token is required.' });
  try {
    const certificates = await readLocalCertificates();
    const certificate = certificates.find((item) => item.id === String(request.query.id ?? ''));
    if (!certificate) return response.status(404).json({ message: 'Certificate not found.' });
    const filename = path.basename(certificate.url);
    const nextCertificates = certificates.filter((item) => item.id !== certificate.id);
    await writeFile(certificatesManifest, `${JSON.stringify(nextCertificates, null, 2)}\n`, 'utf8');
    await unlink(path.join(certificateDirectory, filename)).catch((error) => {
      if (error.code !== 'ENOENT') throw error;
    });
    return response.json({ certificates: nextCertificates });
  } catch (error) {
    console.error('Certificate delete failed:', error);
    return response.status(500).json({ message: 'Certificate could not be removed.' });
  }
});

const requiredEnv = ['SMTP_USER', 'SMTP_PASS', 'CONTACT_TO_EMAIL'];
const contributionCache = new Map();

function getMissingEnv() {
  return requiredEnv.filter((key) => !process.env[key]);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clean(value) {
  return String(value ?? '').trim();
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true });
});

app.get('/api/analytics', async (request, response) => {
  if (!isAnalyticsConfigured()) {
    response.status(503).json({ message: 'Analytics storage is not configured.' });
    return;
  }

  if (!hasValidAnalyticsToken(request)) {
    response.status(401).json({ message: 'Analytics token is required.' });
    return;
  }

  try {
    response.json(await getAnalyticsSummary());
  } catch (error) {
    console.error('Analytics summary failed:', error);
    response.status(500).json({ message: 'Analytics request failed.' });
  }
});

app.post('/api/analytics', async (request, response) => {
  if (!isAnalyticsConfigured()) {
    response.status(503).json({ message: 'Analytics storage is not configured.' });
    return;
  }

  try {
    response.json(await recordAnalyticsVisit(request, request.body));
  } catch (error) {
    console.error('Analytics tracking failed:', error);
    response.status(500).json({ message: 'Analytics request failed.' });
  }
});

app.delete('/api/analytics', async (request, response) => {
  if (!isAnalyticsConfigured()) {
    response.status(503).json({ message: 'Analytics storage is not configured.' });
    return;
  }

  if (!hasValidAnalyticsToken(request)) {
    response.status(401).json({ message: 'Analytics token is required.' });
    return;
  }

  try {
    response.json(await clearAnalyticsSummary());
  } catch (error) {
    console.error('Analytics clear failed:', error);
    response.status(500).json({ message: 'Analytics request failed.' });
  }
});

app.get('/api/grades', async (_request, response) => {
  if (!isGradesStorageConfigured()) {
    response.json({ academicGrades: null });
    return;
  }

  try {
    response.json({ academicGrades: await getStoredAcademicGrades() });
  } catch (error) {
    console.error('Grades load failed:', error);
    response.status(500).json({ message: 'Grades request failed.' });
  }
});

app.put('/api/grades', async (request, response) => {
  if (!hasValidAnalyticsToken(request)) {
    response.status(401).json({ message: 'Admin token is required.' });
    return;
  }

  if (!isGradesStorageConfigured()) {
    response.status(503).json({ message: 'Grades storage is not configured.' });
    return;
  }

  try {
    response.json(await saveStoredAcademicGrades(request.body?.academicGrades));
  } catch (error) {
    console.error('Grades save failed:', error);
    response.status(error.status ?? 500).json({ message: error.message || 'Grades request failed.' });
  }
});

app.get('/api/moments', async (_request, response) => {
  try {
    response.json({ imageBar: await getStoredMoments() });
  } catch (error) {
    console.error('Portfolio moments load failed:', error);
    response.status(500).json({ message: 'Portfolio moments could not be loaded.' });
  }
});

app.put('/api/moments', async (request, response) => {
  if (!hasValidAnalyticsToken(request)) {
    response.status(401).json({ message: 'Admin token is required.' });
    return;
  }
  if (!isMomentsStorageConfigured()) {
    response.status(503).json({ message: 'Portfolio moments storage is not configured.' });
    return;
  }
  try {
    response.json(await saveStoredMoments(request.body?.imageBar));
  } catch (error) {
    console.error('Portfolio moments save failed:', error);
    response.status(error.status ?? 500).json({ message: error.message || 'Portfolio moments could not be saved.' });
  }
});

app.get('/api/github/contributions', async (request, response) => {
  const username = clean(request.query.username ?? process.env.GITHUB_USERNAME);
  const year = Number(request.query.year ?? new Date().getFullYear());

  if (!username || !process.env.GITHUB_TOKEN) {
    response.status(500).json({ message: 'GitHub contributions are not configured.' });
    return;
  }

  if (!Number.isInteger(year) || year < 2008 || year > 2100) {
    response.status(400).json({ message: 'Invalid contribution year.' });
    return;
  }

  const cacheKey = `${username}-${year}`;
  const cached = contributionCache.get(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    response.json(cached.data);
    return;
  }

  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  try {
    const githubResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query Contributions($username: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $username) {
              contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      color
                      contributionCount
                      date
                      weekday
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { username, from, to },
      }),
    });

    const payload = await githubResponse.json();

    if (!githubResponse.ok || payload.errors?.length) {
      response.status(502).json({ message: 'GitHub contributions could not be loaded.' });
      return;
    }

    const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      response.status(404).json({ message: 'GitHub user contributions were not found.' });
      return;
    }

    const data = {
      username,
      year,
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    };

    contributionCache.set(cacheKey, {
      data,
      expiresAt: Date.now() + 1000 * 60 * 60,
    });

    response.json(data);
  } catch (error) {
    console.error('GitHub contributions failed:', error);
    response.status(500).json({ message: 'GitHub contributions could not be loaded.' });
  }
});

app.post('/api/contact', async (request, response) => {
  const missingEnv = getMissingEnv();

  if (missingEnv.length > 0) {
    response.status(500).json({
      message: `Email server is missing: ${missingEnv.join(', ')}`,
    });
    return;
  }

  const name = clean(request.body.name);
  const email = clean(request.body.email);
  const subject = clean(request.body.subject);
  const message = clean(request.body.message);

  if (!name || !email || !subject || !message || !isEmail(email)) {
    response.status(400).json({ message: 'Invalid contact form details.' });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_TO_EMAIL,
      subject: `Portfolio contact: ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        '',
        message,
      ].join('\n'),
    });

    response.json({ ok: true });
  } catch (error) {
    console.error('Email send failed:', error);
    response.status(500).json({ message: 'Email could not be sent.' });
  }
});

app.listen(port, () => {
  console.log(`Contact email server running on http://localhost:${port}`);
});
