import { motion } from 'framer-motion';
import {
  certifications,
  contactLinks,
  experience,
  projects,
  technicalSkills,
  tools,
} from '../data/portfolioData';
import ExperienceCard from './ExperienceCard';
import ProjectCard from './ProjectCard';
import SectionTitle from './SectionTitle';
import { fadeInUp, staggerContainer } from './motionVariants';
import { SkillPill } from '../utils/skillIcons';

export default function SearchResults({ searchQuery, data = {} }) {
  const query = searchQuery.trim().toLowerCase();
  const skillItems = data.technicalSkills ?? technicalSkills;
  const toolItems = data.tools ?? tools;
  const certificationItems = data.certifications ?? certifications;
  const projectItems = data.projects ?? projects;
  const experienceItems = data.experience ?? experience;
  const contactItems = data.contactLinks ?? contactLinks;
  const ui = data.ui ?? {};

  const matchedSkills = skillItems.filter((skill) => skill.toLowerCase().includes(query));
  const matchedTools = toolItems.filter((tool) => tool.toLowerCase().includes(query));
  const matchedCertifications = certificationItems.filter((item) =>
    item.name.toLowerCase().includes(query),
  );
  const matchedProjects = projectItems.filter(
    (project) =>
      project.title.toLowerCase().includes(query) ||
      project.stack.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query),
  );
  const matchedExperience = experienceItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query) || item.text.toLowerCase().includes(query),
  );
  const matchedContactLinks = contactItems.filter(
    (item) => item.label.toLowerCase().includes(query) || item.href.toLowerCase().includes(query),
  );

  const hasResults =
    matchedSkills.length > 0 ||
    matchedTools.length > 0 ||
    matchedCertifications.length > 0 ||
    matchedProjects.length > 0 ||
    matchedExperience.length > 0 ||
    matchedContactLinks.length > 0;

  if (!hasResults) {
    return (
      <motion.div
        key="no-results"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="console-section"
      >
        <SectionTitle
          eyebrow={ui.search ?? 'Search'}
          title={ui.noResults ?? 'No results found'}
          text={`${ui.noResultsText ?? 'Could not find anything matching'} "${searchQuery}".`}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      key="search"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="console-section"
    >
      <SectionTitle
        eyebrow={ui.searchResults ?? 'Search Results'}
        title={`${ui.resultsFor ?? 'Results for'} "${searchQuery}"`}
        text={ui.resultsText ?? 'Here is everything matching your query across all sections.'}
      />

      {(matchedSkills.length > 0 ||
        matchedTools.length > 0 ||
        matchedCertifications.length > 0) && (
        <motion.div variants={fadeInUp} className="skills-layout" style={{ marginBottom: '2rem' }}>
          {(matchedSkills.length > 0 || matchedTools.length > 0) && (
            <article className="about-card console-card">
              <h3>{ui.matchingSkills ?? 'Matching Skills & Tools'}</h3>
              <div className="skill-list">
                {matchedSkills.map((skill) => (
                  <SkillPill key={skill} label={skill} />
                ))}
                {matchedTools.map((tool) => (
                  <SkillPill key={tool} label={tool} />
                ))}
              </div>
            </article>
          )}

          {matchedCertifications.length > 0 && (
            <div className="skill-list" style={{ marginTop: '1.25rem' }}>
              {matchedCertifications.map((item) => {
                const Icon = item.icon;

                return (
                  <span key={item.name} className="skill-pill">
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </span>
                );
              })}
            </div>
          )}
        </motion.div>
      )}

      {matchedProjects.length > 0 && (
        <motion.div variants={fadeInUp} style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--heading-color)' }}>{ui.matchingProjects ?? 'Matching Projects'}</h3>
          <div className="project-grid">
            {matchedProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </motion.div>
      )}

      {matchedExperience.length > 0 && (
        <motion.div variants={fadeInUp}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--heading-color)' }}>{ui.matchingExperience ?? 'Matching Experience'}</h3>
          <div className="timeline">
            {matchedExperience.map((item) => (
              <ExperienceCard key={item.title} item={item} />
            ))}
          </div>
        </motion.div>
      )}

      {matchedContactLinks.length > 0 && (
        <motion.div variants={fadeInUp} style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--heading-color)' }}>{ui.matchingLinks ?? 'Matching Links'}</h3>
          <div className="contact-links console-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
            {matchedContactLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                  className="contact-link-item"
                >
                  <Icon size={20} /> {item.label}
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
