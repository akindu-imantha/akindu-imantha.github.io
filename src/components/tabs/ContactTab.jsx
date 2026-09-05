import { motion } from 'framer-motion';
import { Check, Copy, Send } from 'lucide-react';
import { useState } from 'react';
import { contactLinks } from '../../data/portfolioData';
import { trackEvent } from '../../utils/analytics';
import SectionTitle from '../SectionTitle';
import { fadeInUp, staggerContainer } from '../motionVariants';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function getContactApiUrl() {
  const configuredUrl = import.meta.env.VITE_CONTACT_API_URL;

  if (
    import.meta.env.PROD &&
    configuredUrl &&
    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(configuredUrl)
  ) {
    return '/api/contact';
  }

  return configuredUrl || '/api/contact';
}

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
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactApiUrl = getContactApiUrl();

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const copyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
      trackEvent('contact_email_copy', { label: email });
    } catch {
      setStatus({ type: 'error', message: 'Could not copy the email address. Please select it manually.' });
    }
  };

  const sendMessage = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });
    trackEvent('contact_form_submit', { label: form.subject || 'No subject' });

    try {
      const response = await fetch(contactApiUrl, {
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
        const responseText = await response.text();
        let errorMessage = `Contact API failed (${response.status})`;

        try {
          const errorPayload = JSON.parse(responseText);
          errorMessage = errorPayload?.message || errorMessage;
        } catch {
          if (responseText) {
            errorMessage = `${errorMessage}: ${responseText.slice(0, 120)}`;
          }
        }

        throw new Error(errorMessage);
      }

      setForm(initialForm);
      setStatus({ type: 'success', message: 'Message sent successfully.' });
      trackEvent('contact_form_success', { label: form.subject || 'No subject' });
    } catch (error) {
      trackEvent('contact_form_error', { label: form.subject || 'No subject' });
      setStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Message could not be sent. Please try again or email me directly.',
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
            const isEmail = item.href.startsWith('mailto:');

            return (
              <div key={item.href} className="contact-link-row">
                <a
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                  className="contact-link-item"
                  onClick={() => trackEvent('contact_link_click', { label: item.href })}
                >
                  <Icon size={20} /> {item.label}
                </a>
                {isEmail ? (
                  <button
                    type="button"
                    className="contact-copy-button"
                    onClick={() => copyEmail(item.label)}
                    aria-label={copiedEmail ? 'Email copied' : 'Copy email address'}
                    title={copiedEmail ? 'Copied' : 'Copy email address'}
                  >
                    {copiedEmail ? <Check size={17} /> : <Copy size={17} />}
                  </button>
                ) : null}
              </div>
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
