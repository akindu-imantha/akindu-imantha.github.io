import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, Search } from 'lucide-react';
import { useState } from 'react';
import { academicGrades, portfolioContent } from '../data/portfolioData';
import SectionTitle from './SectionTitle';
import { fadeInUp, staggerContainer } from './motionVariants';

export default function GradesPage({ content = portfolioContent.en, activeGradeId = '' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const grades = content.academicGrades ?? academicGrades;
  const ui = content.ui ?? {};
  const visibleGrades = activeGradeId
    ? grades.filter((group) => group.id === activeGradeId)
    : grades;

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
              const filteredSubjects = searchQuery.trim()
                ? group.subjects.filter((subject) =>
                    `${subject.name} ${subject.grade}`
                      .toLowerCase()
                      .includes(searchQuery.trim().toLowerCase()),
                  )
                : group.subjects;

              if (searchQuery.trim() && filteredSubjects.length === 0) {
                return null;
              }

              return (
                <motion.article
                  key={`${group.program}-${group.institution}`}
                  variants={fadeInUp}
                  className="console-card grades-card"
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
                </motion.article>
              );
            })}
          </div>
          {searchQuery.trim() && visibleGrades.every((group) =>
            group.subjects.filter((subject) =>
              `${subject.name} ${subject.grade}`.toLowerCase().includes(searchQuery.trim().toLowerCase()),
            ).length === 0,
          ) && (
            <p className="grades-search-empty">
              {ui.gradesNoResults ?? `No grade subjects matched "${searchQuery}".`}
            </p>
          )}
        </motion.section>
      </div>
    </main>
  );
}
