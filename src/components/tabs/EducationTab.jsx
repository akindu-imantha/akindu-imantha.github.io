import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { certifications, education } from '../../data/portfolioData';
import { fetchStoredAcademicGrades } from '../../utils/grades';
import SectionTitle from '../SectionTitle';
import { fadeInUp, staggerContainer } from '../motionVariants';

function getGradeGroupId(gradeLink = '') {
  return gradeLink.startsWith('#grades-') ? gradeLink.slice('#grades-'.length) : '';
}

function getModuleSummary(academicGrades = [], gradeLink = '') {
  const gradeGroupId = getGradeGroupId(gradeLink);
  const group = academicGrades.find((item) => item.id === gradeGroupId);

  if (!group?.semesters?.length) {
    return null;
  }

  const subjects = group.semesters.flatMap((semester) => semester.subjects ?? []);
  const gradedCount = subjects.filter((subject) => !['pending', 'add grade'].includes(String(subject.grade).toLowerCase())).length;

  return {
    moduleCount: subjects.length,
    gradedCount,
  };
}

export default function EducationTab({ data = {} }) {
  const educationItems = data.education ?? education;
  const certificationItems = data.certifications ?? certifications;
  const [storedGrades, setStoredGrades] = useState(null);
  const academicGradeItems = storedGrades ?? data.academicGrades ?? [];
  const section = data.sections?.education ?? {
    eyebrow: './education.sh',
    title: 'Academic background',
    text: 'My studies combine school qualifications, undergraduate IT learning, and completed courses or certifications that support my technical foundation.',
  };

  useEffect(() => {
    let isActive = true;

    const loadStoredGrades = async () => {
      try {
        const nextGrades = await fetchStoredAcademicGrades();

        if (isActive && nextGrades?.length) {
          setStoredGrades(nextGrades);
        }
      } catch {
        // Keep the portfolio's bundled grades when live storage is unavailable.
      }
    };

    loadStoredGrades();

    return () => {
      isActive = false;
    };
  }, []);

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
        {educationItems.map((item) => {
          const moduleSummary = getModuleSummary(academicGradeItems, item.gradeLink);

          return (
            <motion.article
              key={item.title}
              variants={fadeInUp}
              className="project-card console-card education-card"
              data-tour={item.gradeLink ? 'education-grades' : undefined}
            >
              {item.logo && (
                <div className="education-logo-wrap">
                  <img src={item.logo} alt={item.logoAlt} className="education-logo" />
                </div>
              )}
              <div className="education-card-copy">
                <p className="project-stack">{item.subtitle}</p>
                <h3>{item.title}</h3>
                {Array.isArray(item.text) ? (
                  <div className="education-text-list">
                    {item.text.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                ) : (
                  <p>{item.text}</p>
                )}
                {moduleSummary ? (
                  <div className="education-grade-meta" aria-label={`${moduleSummary.moduleCount} course modules in Grades`}>
                    <span>{moduleSummary.moduleCount} course modules in Grades</span>
                    <span>{moduleSummary.gradedCount} grades available</span>
                  </div>
                ) : null}
                {item.gradeLink ? (
                  <a href={item.gradeLink} className="project-link education-card-link">
                    {item.gradeButtonLabel ?? data.ui?.gradesButton ?? 'View subjects and grades'}
                  </a>
                ) : null}
              </div>
            </motion.article>
          );
        })}
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
