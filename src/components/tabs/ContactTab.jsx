import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { send } from '@emailjs/browser';
import { contactLinks } from '../../data/portfolioData';
import SectionTitle from '../SectionTitle';
import { fadeInUp, staggerContainer } from '../motionVariants';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactTab({ data = {} }) {
  const links = data.contactLinks ?? contactLinks;
  const section = data.sections?.contact ?? {
    eyebrow: './contact.sh',
    title: 'Get in touch',
    text: 'Open for opportunities, collaboration, and portfolio discussions.',
  };
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailConfig = {
    apiUrl: import.meta.env.VITE_CONTACT_API_URL,
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    toEmail: import.meta.env.VITE_CONTACT_TO_EMAIL,
  };
  const isBackendConfigured = Boolean(emailConfig.apiUrl);
  const isEmailJsConfigured = Boolean(
    emailConfig.serviceId &&
      emailConfig.templateId &&
      emailConfig.publicKey &&
      emailConfig.toEmail,
  );

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const sendMessage = async (event) => {
    event.preventDefault();

    if (!isBackendConfigured && !isEmailJsConfigured) {
      setStatus({
        type: 'error',
        message:
          'Email service is not configured yet. Add EmailJS values or VITE_CONTACT_API_URL to your .env file.',
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      if (isEmailJsConfigured) {
        await send(
          emailConfig.serviceId,
          emailConfig.templateId,
          {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
            to_email: emailConfig.toEmail,
          },
          emailConfig.publicKey,
        );
      } else {
        const response = await fetch(emailConfig.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
          }),
        });

        if (!response.ok) {
          throw new Error('Email send failed');
        }
      }

      setForm(initialForm);
      setStatus({ type: 'success', message: 'Message sent successfully.' });
    } catch {
      setStatus({
        type: 'error',
        message: 'Message could not be sent. Please try again or email me directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      key="contact"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="console-section"
    >
      <SectionTitle
        eyebrow={section.eyebrow}
        title={section.title}
        text={section.text}
      />

      <motion.div
        variants={fadeInUp}
        className="contact-layout"
      >
        <div className="contact-links console-card">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
                className="contact-link-item"
              >
                <Icon size={20} /> {item.label}
              </a>
            );
          })}
        </div>

        <form className="contact-form console-card" onSubmit={sendMessage}>
          <div className="contact-form-grid">
            <label className="contact-field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={updateField}
                required
                autoComplete="name"
                placeholder="Your name"
              />
            </label>

            <label className="contact-field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="contact-field">
            <span>Subject</span>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={updateField}
              required
              placeholder="Message subject"
            />
          </label>

          <label className="contact-field">
            <span>Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={updateField}
              required
              rows="5"
              placeholder="Write your message..."
            />
          </label>

          {status.message ? (
            <p className={`contact-form-status contact-form-status--${status.type}`}>
              {status.message}
            </p>
          ) : null}

          <button className="primary-button contact-submit" type="submit" disabled={isSubmitting}>
            <Send size={16} />
            <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
