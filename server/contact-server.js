import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import {
  getAnalyticsSummary,
  hasValidAnalyticsToken,
  isAnalyticsConfigured,
  recordAnalyticsVisit,
} from './analytics-store.js';

const app = express();
const port = Number(process.env.PORT ?? 5000);

const allowedOrigin = (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: '20kb' }));

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
