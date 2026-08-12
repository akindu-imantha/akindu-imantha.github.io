import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from './components/Hero';
import PortfolioGuide from './components/PortfolioGuide';
import ScrollHint from './components/ScrollHint';
import TerminalConsole from './components/TerminalConsole';
import { portfolioContent } from './data/portfolioData';
import { startTimeOnPageTracking, trackPageView } from './utils/analytics';
import { shouldUseLitePerformanceMode } from './utils/performance';
import { fetchStoredMoments } from './utils/moments';
import PortfolioIntro from './components/PortfolioIntro';

const AnalyticsPage = lazy(() => import('./components/AnalyticsPage'));
const GradeAdminPage = lazy(() => import('./components/GradeAdminPage'));
const GradesPage = lazy(() => import('./components/GradesPage'));

function getStoredTheme() {
  const storedTheme = localStorage.getItem('portfolio-theme');
  return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark';
}

function PageLoading() {
  return <main className="page-loading" aria-live="polite">Loading...</main>;
}

const guidePromptCopy = {
  en: {
    title: 'Need a quick guide?',
    text: 'A short walkthrough can show the main sections. You can skip it and browse normally.',
    start: 'Start guide',
    dismiss: 'No thanks',
  },
  si: {
    title: 'Quick guide ekak onida?',
    text: 'Main sections tika ikmanata pennanna puluwan. One nathnam normal widiyata browse karanna.',
    start: 'Guide eka start',
    dismiss: 'Epa',
  },
};

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [language, setLanguage] = useState(() => localStorage.getItem('portfolio-language') ?? 'en');
  const [theme, setTheme] = useState(getStoredTheme);
  const [litePerformanceMode] = useState(() => shouldUseLitePerformanceMode());
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [showGuidePrompt, setShowGuidePrompt] = useState(
    () => localStorage.getItem('portfolio-guide-seen') !== 'true',
  );
  const getTabFromHash = (hash = window.location.hash) => {
    const tabId = hash.replace(/^#/, '');
    return ['about', 'education', 'skills', 'projects', 'experience', 'contact'].includes(tabId)
      ? tabId
      : hash.startsWith('#grades')
        ? 'education'
        : 'about';
  };
  const [activeTab, setActiveTab] = useState(() => getTabFromHash());
  const [storedImageBar, setStoredImageBar] = useState(null);

  const content = useMemo(() => {
    const baseContent = portfolioContent[language] ?? portfolioContent.en;
    return storedImageBar ? { ...baseContent, imageBar: storedImageBar } : baseContent;
  }, [language, storedImageBar]);
  const isGradesPage = currentHash.startsWith('#grades');
  const isAnalyticsPage = currentHash.startsWith('#analytics');
  const isGradeAdminPage = currentHash.startsWith('#grade-admin');
  const activeGradeId = currentHash.startsWith('#grades-') ? currentHash.slice('#grades-'.length) : '';

  useEffect(() => {
    const introTimer = window.setTimeout(() => setShowIntro(false), 2400);
    return () => window.clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.performance = litePerformanceMode ? 'lite' : 'full';
  }, [litePerformanceMode]);

  useEffect(() => {
    document.documentElement.lang = language === 'si' ? 'si' : 'en';
    localStorage.setItem('portfolio-language', language);
  }, [language]);

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash;
      setActiveTab(getTabFromHash(hash));
      setCurrentHash(hash);
    };

    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  useEffect(() => {
    trackPageView(window.location.pathname + currentHash);
  }, [currentHash]);

  useEffect(() => {
    fetchStoredMoments()
      .then((data) => setStoredImageBar(data.imageBar ?? null))
      .catch(() => {});
  }, []);

  useEffect(() => startTimeOnPageTracking(), []);

  useEffect(() => {
    if (currentHash === '#console') {
      requestAnimationFrame(() => {
        const consoleElement = document.getElementById('console');
        if (consoleElement) {
          consoleElement.scrollIntoView({ behavior: 'auto', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      });
    }
  }, [currentHash]);

  const toggleLanguage = () => {
    setLanguage((currentLanguage) => (currentLanguage === 'en' ? 'si' : 'en'));
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  const closeGuide = () => {
    localStorage.setItem('portfolio-guide-seen', 'true');
    setIsGuideOpen(false);
    setShowGuidePrompt(false);
  };

  const startGuide = () => {
    setShowGuidePrompt(false);
    setIsGuideOpen(true);
  };

  const dismissGuidePrompt = () => {
    localStorage.setItem('portfolio-guide-seen', 'true');
    setShowGuidePrompt(false);
  };

  const handleTabChange = (tabId) => {
    if (!['about', 'education', 'skills', 'projects', 'experience', 'contact'].includes(tabId)) return;

    setActiveTab(tabId);
    if (window.location.hash !== `#${tabId}`) {
      window.history.replaceState(null, '', `#${tabId}`);
      setCurrentHash(`#${tabId}`);
    }
  };

  const guidePrompt = guidePromptCopy[language] ?? guidePromptCopy.en;

  return (
    <div className="page-shell">
      <AnimatePresence>
        {showIntro ? <PortfolioIntro onComplete={() => setShowIntro(false)} /> : null}
      </AnimatePresence>
      {isGradeAdminPage ? (
        <Suspense fallback={<PageLoading />}>
          <GradeAdminPage />
        </Suspense>
      ) : isAnalyticsPage ? (
        <Suspense fallback={<PageLoading />}>
          <AnalyticsPage />
        </Suspense>
      ) : isGradesPage ? (
        <Suspense fallback={<PageLoading />}>
          <GradesPage content={content} activeGradeId={activeGradeId} />
        </Suspense>
      ) : (
        <>
          <Hero
            content={content}
            language={language}
            theme={theme}
            onLanguageToggle={toggleLanguage}
            onThemeToggle={toggleTheme}
            litePerformanceMode={litePerformanceMode}
            onGuideOpen={() => setIsGuideOpen(true)}
          />
          <TerminalConsole
            content={content}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
          <ScrollHint label={content.ui.scrollHint} />
          <AnimatePresence>
            {showGuidePrompt && !isGuideOpen ? (
              <motion.aside
                className="guide-prompt"
                aria-labelledby="guide-prompt-title"
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              >
                <div>
                  <h2 id="guide-prompt-title">{guidePrompt.title}</h2>
                  <p>{guidePrompt.text}</p>
                </div>
                <div className="guide-prompt-actions">
                  <button type="button" className="secondary-button guide-prompt-action" onClick={dismissGuidePrompt}>
                    {guidePrompt.dismiss}
                  </button>
                  <button type="button" className="primary-button guide-prompt-action" onClick={startGuide}>
                    {guidePrompt.start}
                  </button>
                </div>
              </motion.aside>
            ) : null}
          </AnimatePresence>
          <PortfolioGuide
            isOpen={isGuideOpen}
            language={language}
            onClose={closeGuide}
            onTabChange={handleTabChange}
          />
        </>
      )}
    </div>
  );
}

export default App;
