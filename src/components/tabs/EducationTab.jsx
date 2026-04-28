import { motion } from 'framer-motion';
import { certifications, education } from '../../data/portfolioData';
import SectionTitle from '../SectionTitle';
import { fadeInUp, staggerContainer } from '../motionVariants';

export default function EducationTab({ data = {} }) {
  const educationItems = data.education ?? education;
  const certificationItems = data.certifications ?? certifications;
  const section = data.sections?.education ?? {
    eyebrow: './education.sh',
    title: 'Academic background',
    text: 'My studies combine school qualifications, undergraduate IT learning, and completed courses or certifications that support my technical foundation.',
  };

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
        eyebrow={section.eyebrow}
        title={section.title}
        text={section.text}
      />

      <div className="project-grid">
        {educationItems.map((item) => (
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
        <h3>{data.ui?.coursesTitle ?? 'Courses and certifications'}</h3>
        <div className="skill-list">
          {certificationItems.map((item) => {
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
