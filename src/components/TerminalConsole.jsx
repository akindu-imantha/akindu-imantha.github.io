import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  certifications,
  contactLinks,
  experience,
  portfolioContent,
  projects,
  tabs,
  technicalSkills,
  tools,
} from '../data/portfolioData';
import AboutTab from './tabs/AboutTab';
import ContactTab from './tabs/ContactTab';
import EducationTab from './tabs/EducationTab';
import ExperienceTab from './tabs/ExperienceTab';
import ProjectsTab from './tabs/ProjectsTab';
import SkillsTab from './tabs/SkillsTab';
import ConsoleSidebar from './ConsoleSidebar';
import SearchResults from './SearchResults';
import { terminalScale } from './motionVariants';

const tabComponents = {
  about: AboutTab,
  education: EducationTab,
  skills: SkillsTab,
  projects: ProjectsTab,
  experience: ExperienceTab,
  contact: ContactTab,
};

export default function TerminalConsole({ content = portfolioContent.en, activeTab = 'about', onTabChange }) {
  const [searchQuery, setSearchQuery] = useState('');

  const ActiveTab = tabComponents[activeTab] ?? AboutTab;
  const data = {
    certifications: content.certifications ?? certifications,
    contactLinks: content.contactLinks ?? contactLinks,
    experience: content.experience ?? experience,
    projects: content.projects ?? projects,
    tabs: content.tabs ?? tabs,
    technicalSkills: content.technicalSkills ?? technicalSkills,
    tools: content.tools ?? tools,
    creativeProfile: content.creativeProfile,
    githubActivity: content.githubActivity,
    education: content.education,
    aboutCards: content.aboutCards,
    sections: content.sections,
    ui: content.ui,
  };

  return (
    <main id="console" className="console-wrapper">
      <motion.div
        className="interactive-console"
        variants={terminalScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="console-header">
          <div className="console-dots">
            <motion.span whileHover={{ scale: 1.2 }} className="dot red"></motion.span>
            <motion.span whileHover={{ scale: 1.2 }} className="dot yellow"></motion.span>
            <motion.span whileHover={{ scale: 1.2 }} className="dot green"></motion.span>
          </div>
          <div className="console-title">
            <span className="terminal-user">guest</span>@<span className="terminal-host">akindu-portfolio</span>:{' '}
            <span className="terminal-path">~</span>
          </div>
        </div>

        <div className="console-body">
          <ConsoleSidebar
            activeTab={activeTab}
            onTabChange={(tabId) => {
              onTabChange?.(tabId);
              setSearchQuery('');
            }}
            onSearchChange={setSearchQuery}
            searchQuery={searchQuery}
            tabs={data.tabs}
            ui={data.ui}
          />

          <div className="console-content-area">
            <div className="scanlines"></div>
            <AnimatePresence mode="wait">
              {searchQuery.trim() ? (
                <SearchResults searchQuery={searchQuery} data={data} />
              ) : (
                <ActiveTab data={data} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
