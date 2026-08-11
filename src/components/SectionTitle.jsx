import { motion } from 'framer-motion';
import { fadeInUp } from './motionVariants';

export default function SectionTitle({ eyebrow, title, text, className = '' }) {
  return (
    <motion.div variants={fadeInUp} className={`section-heading ${className}`.trim()} style={{ marginBottom: '2rem' }}>
      <span style={{ color: 'var(--accent)', fontWeight: 'bold', letterSpacing: '1px', fontSize: '0.8rem', textTransform: 'uppercase' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{title}</h2>
      <p style={{ color: 'var(--text-muted)' }}>{text}</p>
    </motion.div>
  );
}
