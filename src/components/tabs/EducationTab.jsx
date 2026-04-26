import { motion } from 'framer-motion';
import { education } from '../../data/portfolioData';
import SectionTitle from '../SectionTitle';
import { fadeInUp, staggerContainer } from '../motionVariants';

export default function EducationTab() {
  return (
    <motion.div
      key="education"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="console-section"
    >
      <SectionTitle
        eyebrow="./education.sh"
        title="Academic background"
        text="My studies combine school qualifications with undergraduate IT learning and module-based practical training."
      />

      <div className="project-grid">
        {education.map((item) => (
          <motion.article key={item.title} variants={fadeInUp} className="project-card console-card">
            <p className="project-stack">{item.subtitle}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
