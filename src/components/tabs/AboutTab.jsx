import { motion } from 'framer-motion';
import { aboutCards } from '../../data/portfolioData';
import SectionTitle from '../SectionTitle';
import { fadeInUp, staggerContainer } from '../motionVariants';

export default function AboutTab({ data = {} }) {
  const cards = data.aboutCards ?? aboutCards;
  const section = data.sections?.about ?? {
    eyebrow: './about.sh',
    title: 'A broader profile beyond only frontend development.',
    text: 'This section introduces my academic path, technical range, project mindset, and the wider experience I have built through both study and community work.',
  };

  return (
    <motion.div
      key="about"
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

      <div className="about-grid">
        {cards.map((card) => (
          <motion.article key={card.title} variants={fadeInUp} className="about-card console-card">
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
