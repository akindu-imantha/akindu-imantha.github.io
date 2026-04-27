import { motion } from 'framer-motion';
import { certifications, education } from '../../data/portfolioData';
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
        text="My studies combine school qualifications, undergraduate IT learning, and completed courses or certifications that support my technical foundation."
      />

      <div className="project-grid">
        {education.map((item) => (
          <motion.article
            key={item.title}
            variants={fadeInUp}
            className="project-card console-card education-card"
          >
            {item.logo && (
              <div className="education-logo-wrap">
                <img src={item.logo} alt={item.logoAlt} className="education-logo" />
              </div>
            )}
            <div className="education-card-copy">
              <p className="project-stack">{item.subtitle}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.article variants={fadeInUp} className="about-card console-card" style={{ marginTop: '1.25rem' }}>
        <h3>Courses and certifications</h3>
        <div className="skill-list">
          {certifications.map((item) => {
            const Icon = item.icon;

            return (
              <span key={item.name} className="skill-pill">
                <Icon size={16} />
                <span>{item.name}</span>
              </span>
            );
          })}
        </div>
      </motion.article>
    </motion.div>
  );
}
