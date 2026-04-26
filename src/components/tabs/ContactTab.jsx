import { motion } from 'framer-motion';
import { contactLinks } from '../../data/portfolioData';
import SectionTitle from '../SectionTitle';
import { fadeInUp, staggerContainer } from '../motionVariants';

export default function ContactTab() {
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
        eyebrow="./contact.sh"
        title="Get in touch"
        text="Open for opportunities, collaboration, and portfolio discussions."
      />

      <motion.div
        variants={fadeInUp}
        className="contact-links console-card"
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}
      >
        {contactLinks.map((item) => {
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
      </motion.div>
    </motion.div>
  );
}
