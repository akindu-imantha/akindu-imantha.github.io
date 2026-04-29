import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, Search } from 'lucide-react';
import { useState } from 'react';
import { academicGrades, portfolioContent } from '../data/portfolioData';
import SectionTitle from './SectionTitle';
import { fadeInUp, staggerContainer } from './motionVariants';

const gradePoints = {
  'A+': 4.2,
  A: 4,
  'A-': 3.7,
  'B+': 3.3,
  B: 3,
  'B-': 2.7,
  'C+': 2.3,
  C: 2,
  'C-': 1.7,
  'D+': 1.3,
  D: 1,
  E: 0,
  F: 0,
};

function getGradePoint(grade) {
  return gradePoints[String(grade).trim().toUpperCase()];
}

function getGpa(subjects = []) {
  const totals = subjects.reduce(
    (result, subject) => {
      const point = getGradePoint(subject.grade);

      if (point === undefined) {
        return result;
      }

      const credits = Number(subject.credits) || 0;

      return {
        credits: result.credits + credits,
        points: result.points + point * credits,
      };
    },
    { credits: 0, points: 0 },
  );

  if (totals.credits === 0) {
    return { gpa: 'Pending', credits: 0 };
  }

  return {
    gpa: (totals.points / totals.credits).toFixed(2),
    credits: totals.credits,
  };
}

function getCompletedSubjects(group) {
  if (group.semesters?.length) {
    return group.semesters.flatMap((semester) => semester.subjects);
  }

  return group.subjects ?? [];
}

function matchesSubject(subject, query) {
  return `${subject.semester ?? ''} ${subject.code ?? ''} ${subject.name} ${subject.grade} ${subject.credits ?? ''}`
    .toLowerCase()
    .includes(query);
}

function getFilteredSemesters(group, query) {
  if (!group.semesters?.length) {
    return [];
  }

  if (!query) {
    return group.semesters;
  }

  return group.semesters
    .map((semester) => ({
      ...semester,
      subjects: semester.subjects.filter((subject) =>
        matchesSubject({ ...subject, semester: semester.title }, query),
      ),
    }))
    .filter((semester) => semester.subjects.length > 0);
}

export default function GradesPage({ content = portfolioContent.en, activeGradeId = '' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const grades = content.academicGrades ?? academicGrades;
  const ui = content.ui ?? {};
  const visibleGrades = activeGradeId
    ? grades.filter((group) => group.id === activeGradeId)
    : grades;
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  return (
    <main className="grades-page">
      <div className="grades-page-shell">
        <a href="#console" className="grades-back-link">
          <ArrowLeft size={18} />
          <span>{ui.gradesBack ?? 'Back to portfolio'}</span>
        </a>

        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="console-section grades-section"
        >
          <SectionTitle
            eyebrow={ui.gradesEyebrow ?? './grades.sh'}
            title={ui.gradesTitle ?? 'Subjects and grades'}
            text={
              ui.gradesText ??
              'A detailed academic view for visitors who want to check completed subjects and results.'
            }
          />

          <div className="grades-search-row">
            <div className="grades-search-box">
              <Search size={16} className="grades-search-icon" />
              <input
                type="search"
                className="grades-search-input"
                placeholder={ui.gradesSearchPlaceholder ?? 'Search module code, title or grade'}
                aria-label={ui.gradesSearchLabel ?? 'Search grades'}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
          </div>

          <div className="grades-grid">
            {visibleGrades.map((group) => {
              const filteredSemesters = getFilteredSemesters(group, normalizedSearchQuery);
              const filteredSubjects = normalizedSearchQuery
                ? group.subjects.filter((subject) => matchesSubject(subject, normalizedSearchQuery))
                : group.subjects;
              const groupGpa = getGpa(getCompletedSubjects(group));

              if (normalizedSearchQuery && filteredSubjects.length === 0 && filteredSemesters.length === 0) {
                return null;
              }

              return (
                <motion.article
                  key={`${group.program}-${group.institution}`}
                  variants={fadeInUp}
                  className={`console-card grades-card${group.semesters?.length ? ' grades-card--wide' : ''}`}
                >
                  <div className="grades-card-header">
                    <div className="grades-card-icon">
                      <GraduationCap size={22} />
                    </div>
                    <div>
                      <p className="project-stack">{group.institution}</p>
                      <h3>{group.program}</h3>
                    </div>
                    <span className="project-status">{group.status}</span>
                  </div>

                  <p className="grades-summary">{group.summary}</p>

                  {group.semesters?.length && (
                    <div className="grades-summary-pills">
                      <span>CGPA: {groupGpa.gpa}</span>
                      <span>Completed GPA credits: {groupGpa.credits}</span>
                    </div>
                  )}

                  {group.semesters?.length ? (
                    <div className="semester-list">
                      {filteredSemesters.map((semester) => (
                        <section className="semester-block" key={semester.title}>
                          <div className="semester-heading">
                            <h4>{semester.title}</h4>
                            <span>SGPA: {getGpa(semester.subjects).gpa}</span>
                          </div>
                          <div className="grades-table" role="table" aria-label={`${semester.title} subjects`}>
                            <div className="grades-row grades-row--head grades-row--module" role="row">
                              <span role="columnheader">Code</span>
                              <span role="columnheader">Module title</span>
                              <span role="columnheader">Grade</span>
                              <span role="columnheader">Credits</span>
                            </div>
                            {semester.subjects.map((subject) => (
                              <div className="grades-row grades-row--module" role="row" key={`${semester.title}-${subject.code}`}>
                                <span role="cell">{subject.code}</span>
                                <span role="cell">{subject.name}</span>
                                <strong role="cell">{subject.grade}</strong>
                                <span role="cell">{subject.credits}</span>
                              </div>
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  ) : (
                    <div className="grades-table" role="table" aria-label={`${group.program} subjects`}>
                      <div className="grades-row grades-row--head" role="row">
                        <span role="columnheader">Subject</span>
                        <span role="columnheader">Grade</span>
                      </div>
                      {filteredSubjects.map((subject) => (
                        <div className="grades-row" role="row" key={`${group.program}-${subject.name}`}>
                          <span role="cell">{subject.name}</span>
                          <strong role="cell">{subject.grade}</strong>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
          {normalizedSearchQuery && visibleGrades.every((group) => {
            const matchingSubjects = group.subjects.filter((subject) =>
              matchesSubject(subject, normalizedSearchQuery),
            );
            const matchingSemesters = getFilteredSemesters(group, normalizedSearchQuery);

            return matchingSubjects.length === 0 && matchingSemesters.length === 0;
          }) && (
            <p className="grades-search-empty">
              {ui.gradesNoResults ?? `No grade subjects matched "${searchQuery}".`}
            </p>
          )}
        </motion.section>
      </div>
    </main>
  );
}
