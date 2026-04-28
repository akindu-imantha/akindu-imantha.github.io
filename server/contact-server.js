import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
const port = Number(process.env.PORT ?? 5000);

const allowedOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: '20kb' }));

const requiredEnv = ['SMTP_USER', 'SMTP_PASS', 'CONTACT_TO_EMAIL'];

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
