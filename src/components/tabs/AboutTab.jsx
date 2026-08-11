import { motion } from 'framer-motion';
import { Code2, Lightbulb, Palette, ShieldCheck } from 'lucide-react';
import SectionTitle from '../SectionTitle';
import { fadeInUp, staggerContainer } from '../motionVariants';

const profileCards = [
  {
    title: 'Current direction',
    icon: Lightbulb,
    items: ['IT Undergraduate', 'Full-Stack Developer', 'Cybersecurity', 'Problem Solving'],
  },
  {
    title: 'Technical range',
    icon: Code2,
    items: ['React', 'C#', 'PHP / Laravel', 'MySQL'],
  },
  {
    title: 'Design & creative',
    icon: Palette,
    items: ['Graphic Design', 'UI / Visual Design', 'Branding'],
  },
  {
    title: 'Security-minded',
    icon: ShieldCheck,
    items: ['Cybersecurity', 'Secure Development', 'Security Thinking'],
  },
];

export default function AboutTab({ data = {} }) {
  const section = data.sections?.about ?? {
    eyebrow: './about.sh',
    title: 'Full-Stack Developer, Graphic Designer & Cybersecurity Undergraduate.',
    text: 'I am a full-stack developer and graphic designer currently pursuing a degree in cybersecurity. I combine clean visual design, practical code, and security-minded thinking to create digital experiences that look sharp, work smoothly, and solve real problems.',
  };

  return (
    <motion.div
      key="about"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="console-section console-section--about"
    >
      <SectionTitle
        eyebrow={section.eyebrow}
        title={section.title}
        text={section.text}
        className="about-intro"
      />

      <div className="about-showcase">
        <div className="about-showcase-grid">
          {profileCards.map(({ title, icon: Icon, items }) => (
            <motion.article key={title} variants={fadeInUp} className="about-showcase-card">
              <div className="about-showcase-card-heading">
                <Icon size={18} aria-hidden="true" />
                <h3>{title}</h3>
              </div>
              <ul>
                {items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </motion.article>
          ))}
        </div>

        <motion.article variants={fadeInUp} className="about-approach-card">
          <div className="about-showcase-card-heading">
            <Lightbulb size={18} aria-hidden="true" />
            <h3>Project approach</h3>
          </div>
          <p>I focus on building structured, usable, and meaningful solutions with attention to design, functionality, and implementation.</p>
        </motion.article>
      </div>
    </motion.div>
  );
}
