import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { certifications, education } from '../../data/portfolioData';
import { fetchStoredAcademicGrades } from '../../utils/grades';
import { fetchStoredCertificates } from '../../utils/certificates';
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
  const [storedCertificates, setStoredCertificates] = useState([]);
  const [certificateLoadError, setCertificateLoadError] = useState('');
  const academicGradeItems = storedGrades ?? data.academicGrades ?? [];
  const certificateCards = [
    ...certificationItems.map((item) => ({
      name: item.name,
      icon: item.icon,
      certificate: storedCertificates.find((entry) => entry.name === item.name),
    })),
    ...storedCertificates
      .filter((certificate) => !certificationItems.some((item) => item.name === certificate.name))
      .map((certificate) => ({ name: certificate.name, icon: FileText, certificate })),
  ];
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

  useEffect(() => {
    let isActive = true;
    fetchStoredCertificates()
      .then((result) => {
        if (isActive) {
          setStoredCertificates(result.certificates ?? []);
          setCertificateLoadError('');
        }
      })
      .catch((error) => {
        if (isActive) setCertificateLoadError(error.message || 'Certificates could not be loaded.');
      });
    return () => { isActive = false; };
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

      {certificateLoadError ? (
        <p className="analytics-state analytics-state--error" role="status">Uploaded certificates could not be loaded: {certificateLoadError}</p>
      ) : null}

      {certificateCards.length ? (
        <motion.section variants={fadeInUp} className="education-certificates" aria-labelledby="education-certificates-title">
          <div className="education-certificates-heading">
            <p className="project-stack">Academic documents</p>
            <h2 id="education-certificates-title">{data.ui?.coursesTitle ?? 'Courses and certifications'}</h2>
            <p>Course certificates and previews in one place.</p>
          </div>
          <div className="education-certificate-grid">
            {certificateCards.map(({ name, icon: Icon, certificate }) => (
              <article className="education-certificate-card" key={name}>
                {certificate ? (
                  <a href={certificate.url} target="_blank" rel="noreferrer" aria-label={`Preview ${name} certificate`}>
                    {certificate.type === 'image' ? (
                      <img src={certificate.url} alt={`Preview of ${name} certificate`} loading="lazy" />
                    ) : (
                      <div className="education-certificate-pdf"><FileText size={38} /><span>Open PDF preview</span></div>
                    )}
                  </a>
                ) : (
                  <div className="education-certificate-empty" aria-label={`No certificate preview available for ${name}`}>
                    <Icon size={25} aria-hidden="true" />
                    <span>Preview coming soon</span>
                  </div>
                )}
                <div className="education-certificate-meta">
                  <h3>{name}</h3>
                  <span className={certificate ? 'education-certificate-status is-available' : 'education-certificate-status'}>
                    {certificate ? 'Certificate available' : 'Certificate pending'}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </motion.section>
      ) : null}
    </motion.div>
  );
}
