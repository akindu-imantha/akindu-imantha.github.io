import { motion } from 'framer-motion';
import { aboutCards } from '../../data/portfolioData';
import SectionTitle from '../SectionTitle';
import { fadeInUp, staggerContainer } from '../motionVariants';

export default function AboutTab() {
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
        eyebrow="./about.sh"
        title="A practical portfolio built around real CV details."
        text="This site introduces my academic background, projects, technical skills, and the experience I have built through both study and community work."
      />

      <div className="about-grid">
        {aboutCards.map((card) => (
          <motion.article key={card.title} variants={fadeInUp} className="about-card console-card">
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
