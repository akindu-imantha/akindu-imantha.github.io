import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { tabs } from '../data/portfolioData';
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

export default function TerminalConsole() {
  const [activeTab, setActiveTab] = useState('about');
  const [searchQuery, setSearchQuery] = useState('');
  const [hideSidebar, setHideSidebar] = useState(false);

  const ActiveTab = tabComponents[activeTab] ?? AboutTab;

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const isScrollingDown = currentScrollY > lastScrollY + 8;
      const isScrollingUp = currentScrollY < lastScrollY - 8;

      if (isScrollingDown && currentScrollY > 80) {
        setHideSidebar(true);
      } else if (isScrollingUp) {
        setHideSidebar(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            isHidden={hideSidebar}
            onTabChange={(tabId) => {
              setActiveTab(tabId);
              setSearchQuery('');
            }}
            onSearchChange={setSearchQuery}
            searchQuery={searchQuery}
            tabs={tabs}
          />

          <div className="console-content-area">
            <div className="scanlines"></div>
            <AnimatePresence mode="wait">
              {searchQuery.trim() ? <SearchResults searchQuery={searchQuery} /> : <ActiveTab />}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
