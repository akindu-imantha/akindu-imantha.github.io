import nodemailer from 'nodemailer';

const requiredEnv = ['SMTP_USER', 'SMTP_PASS', 'CONTACT_TO_EMAIL'];

function setCorsHeaders(request, response) {
  const allowedOrigin = process.env.CORS_ORIGIN;
  const origin = request.headers.origin;

  if (!allowedOrigin || !origin || origin !== allowedOrigin) {
    return;
  }

  response.setHeader('Access-Control-Allow-Origin', origin);
  response.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(response, status, data) {
  response.status(status).json(data);
}

function getMissingEnv() {
  return requiredEnv.filter((key) => !process.env[key]);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clean(value) {
  return String(value ?? '').trim();
}

function getEmailErrorMessage(error) {
  if (error?.code === 'EAUTH') {
    return 'Gmail SMTP authentication failed. Check SMTP_USER and SMTP_PASS in Vercel.';
  }

  if (error?.code === 'ECONNECTION' || error?.code === 'ETIMEDOUT') {
    return 'Email server connection failed. Please try again shortly.';
  }

  return 'Email could not be sent.';
}

export default async function handler(request, response) {
  setCorsHeaders(request, response);

  if (request.method === 'OPTIONS') {
    response.status(204).end();
    return;
  }

  if (request.method !== 'POST') {
    sendJson(response, 405, { message: 'Method not allowed.' });
    return;
  }

  const missingEnv = getMissingEnv();

  if (missingEnv.length > 0) {
    sendJson(response, 500, {
      message: `Email server is missing: ${missingEnv.join(', ')}`,
    });
    return;
  }

  const name = clean(request.body?.name);
  const email = clean(request.body?.email);
  const subject = clean(request.body?.subject);
  const message = clean(request.body?.message);

  if (!name || !email || !subject || !message || !isEmail(email)) {
    sendJson(response, 400, { message: 'Invalid contact form details.' });
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

    sendJson(response, 200, { ok: true });
  } catch (error) {
    console.error('Email send failed:', error);
    sendJson(response, 500, { message: getEmailErrorMessage(error) });
  }
}
