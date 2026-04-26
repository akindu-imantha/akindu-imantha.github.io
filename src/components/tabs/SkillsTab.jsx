import { motion } from 'framer-motion';
import { certifications, technicalSkills, tools } from '../../data/portfolioData';
import SectionTitle from '../SectionTitle';
import { fadeInUp, staggerContainer } from '../motionVariants';

export default function SkillsTab() {
  return (
    <motion.div
      key="skills"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="console-section"
    >
      <SectionTitle
        eyebrow="./skills.sh"
        title="Technical capabilities"
        text="My CV shows a mixed skill base across programming, office productivity, design tools, and web development."
      />

      <div className="skills-layout">
        <motion.article variants={fadeInUp} className="about-card console-card">
          <h3>Programming and web</h3>
          <div className="skill-list">
            {technicalSkills.map((skill) => (
              <span key={skill} className="skill-pill">
                {skill}
              </span>
            ))}
          </div>
        </motion.article>

        <motion.article variants={fadeInUp} className="about-card console-card">
          <h3>Tools and creative software</h3>
          <div className="skill-list">
            {tools.map((tool) => (
              <span key={tool} className="skill-pill">
                {tool}
              </span>
            ))}
          </div>
        </motion.article>
      </div>

      <motion.div variants={fadeInUp} className="skill-list" style={{ marginTop: '1.25rem' }}>
        {certifications.map((item) => {
          const Icon = item.icon;

          return (
            <span key={item.name} className="skill-pill">
              <Icon size={16} />
              <span>{item.name}</span>
            </span>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
