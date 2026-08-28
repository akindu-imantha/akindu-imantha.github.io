import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
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
import ConsoleSidebar from './ConsoleSidebar';
import { terminalScale } from './motionVariants';

const tabComponents = {
  about: lazy(() => import('./tabs/AboutTab')),
  education: lazy(() => import('./tabs/EducationTab')),
  skills: lazy(() => import('./tabs/SkillsTab')),
  projects: lazy(() => import('./tabs/ProjectsTab')),
  experience: lazy(() => import('./tabs/ExperienceTab')),
  contact: lazy(() => import('./tabs/ContactTab')),
};

const SearchResults = lazy(() => import('./SearchResults'));

function ConsoleLoading() {
  return <div className="console-loading" aria-live="polite">Loading...</div>;
}

export default function TerminalConsole({ content = portfolioContent.en, activeTab = 'about', onTabChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [edgeFeedback, setEdgeFeedback] = useState('');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const touchStartRef = useRef(null);
  const edgeFeedbackTimerRef = useRef(null);

  const ActiveTab = tabComponents[activeTab] ?? tabComponents.about;
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
    academicGrades: content.academicGrades,
    aboutCards: content.aboutCards,
    sections: content.sections,
    ui: content.ui,
  };
  const activeTabIndex = Math.max(0, data.tabs.findIndex((tab) => tab.id === activeTab));

  useEffect(() => {
    const updateScrollToTopVisibility = () => {
      const consoleElement = document.getElementById('console');
      setShowScrollToTop(Boolean(consoleElement && consoleElement.getBoundingClientRect().top < -180));
    };

    updateScrollToTopVisibility();
    window.addEventListener('scroll', updateScrollToTopVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollToTopVisibility);
  }, []);

  useEffect(() => () => window.clearTimeout(edgeFeedbackTimerRef.current), []);

  const showEdgeFeedback = (message) => {
    setEdgeFeedback(message);
    window.clearTimeout(edgeFeedbackTimerRef.current);
    edgeFeedbackTimerRef.current = window.setTimeout(() => setEdgeFeedback(''), 1300);
  };

  const scrollCurrentTabToTop = () => {
    const consoleElement = document.getElementById('console');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    consoleElement?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const handleTouchStart = (event) => {
    if (
      event.touches.length !== 1
      || event.target.closest?.('input, textarea, select, button, a, [data-swipe-ignore]')
    ) {
      touchStartRef.current = null;
      return;
    }

    const [touch] = event.touches;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    const touchStart = touchStartRef.current;
    touchStartRef.current = null;

    if (!touchStart || event.changedTouches.length !== 1) return;

    const [touch] = event.changedTouches;
    const distanceX = touch.clientX - touchStart.x;
    const distanceY = touch.clientY - touchStart.y;
    const isHorizontalSwipe = Math.abs(distanceX) >= 56 && Math.abs(distanceX) > Math.abs(distanceY) * 1.25;

    if (!isHorizontalSwipe) return;

    const direction = distanceX < 0 ? 1 : -1;
    const nextTab = data.tabs[activeTabIndex + direction];

    if (!nextTab) {
      setShowSwipeHint(false);
      showEdgeFeedback(
        direction > 0
          ? data.ui?.lastSectionMessage ?? 'You are on the last section'
          : data.ui?.firstSectionMessage ?? 'You are on the first section',
      );
      return;
    }

    onTabChange?.(nextTab.id);
    setSearchQuery('');
    setShowSwipeHint(false);
  };

  return (
    <main id="console" className="console-wrapper">
      <motion.div
        className="interactive-console" data-tour="terminal"
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

          <div
            className="console-content-area"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="scanlines"></div>
            <div className="mobile-tab-progress" aria-live="polite">
              <span>{activeTabIndex + 1} / {data.tabs.length}</span>
              <strong>{data.tabs[activeTabIndex]?.label}</strong>
            </div>
            <div
              className={`swipe-navigation-hint ${showSwipeHint ? '' : 'is-dismissed'}`}
              aria-hidden="true"
            >
              <ChevronLeft size={16} />
              <span>{data.ui?.swipeNavigationHint ?? 'Swipe left or right to browse sections'}</span>
              <ChevronRight size={16} />
            </div>
            <div className={`swipe-edge-feedback ${edgeFeedback ? 'is-visible' : ''}`} aria-live="polite">
              {edgeFeedback}
            </div>
            <Suspense fallback={<ConsoleLoading />}>
              <AnimatePresence mode="wait">
                {searchQuery.trim() ? (
                  <SearchResults searchQuery={searchQuery} data={data} />
                ) : (
                  <ActiveTab data={data} />
                )}
              </AnimatePresence>
            </Suspense>
          </div>
        </div>
      </motion.div>
      <button
        type="button"
        className={`mobile-scroll-to-top ${showScrollToTop ? 'is-visible' : ''}`}
        onClick={scrollCurrentTabToTop}
        aria-label={data.ui?.scrollToTopLabel ?? 'Scroll to the top of this section'}
      >
        <ChevronUp size={20} aria-hidden="true" />
      </button>
    </main>
  );
}
