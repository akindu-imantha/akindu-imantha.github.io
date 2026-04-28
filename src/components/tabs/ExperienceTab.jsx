import { motion } from 'framer-motion';
import { experience } from '../../data/portfolioData';
import ExperienceCard from '../ExperienceCard';
import SectionTitle from '../SectionTitle';
import { fadeInUp, staggerContainer } from '../motionVariants';

export default function ExperienceTab({ data = {} }) {
  const experienceItems = data.experience ?? experience;
  const section = data.sections?.experience ?? {
    eyebrow: './experience.sh',
    title: 'Leadership and community involvement',
    text: 'My background also includes programme participation and field-based work that developed communication and coordination skills.',
  };

  return (
    <motion.div
      key="experience"
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

      <div className="timeline">
        {experienceItems.map((item) => (
          <ExperienceCard
            key={item.title}
            Component={motion.article}
            item={item}
            variants={fadeInUp}
          />
        ))}
      </div>
    </motion.div>
  );
}
