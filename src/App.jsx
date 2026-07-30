import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import PortfolioGuide from './components/PortfolioGuide';
import ScrollHint from './components/ScrollHint';
import TerminalConsole from './components/TerminalConsole';
import { portfolioContent } from './data/portfolioData';
import { startTimeOnPageTracking, trackPageView } from './utils/analytics';
import { shouldUseLitePerformanceMode } from './utils/performance';

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
  const [language, setLanguage] = useState(() => localStorage.getItem('portfolio-language') ?? 'en');
  const [theme, setTheme] = useState(getStoredTheme);
  const [litePerformanceMode] = useState(() => shouldUseLitePerformanceMode());
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [showGuidePrompt, setShowGuidePrompt] = useState(
    () => localStorage.getItem('portfolio-guide-seen') !== 'true',
  );
  const [activeTab, setActiveTab] = useState(() =>
    window.location.hash.startsWith('#grades') ? 'education' : 'about',
  );

  const isMobileViewport = () =>
    window.matchMedia?.('(max-width: 760px)').matches ?? window.innerWidth <= 760;

  useEffect(() => {
    if (!showGuidePrompt || isGuideOpen) return;
    if (isMobileViewport()) {
      setIsGuideOpen(true);
    }
  }, [showGuidePrompt, isGuideOpen]);

  const content = useMemo(() => portfolioContent[language] ?? portfolioContent.en, [language]);
  const isGradesPage = currentHash.startsWith('#grades');
  const isAnalyticsPage = currentHash.startsWith('#analytics');
  const isGradeAdminPage = currentHash.startsWith('#grade-admin');
  const activeGradeId = currentHash.startsWith('#grades-') ? currentHash.slice('#grades-'.length) : '';

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
      if (hash.startsWith('#grades')) {
        setActiveTab('education');
      }
      setCurrentHash(hash);
    };

    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  useEffect(() => {
    trackPageView(window.location.pathname + currentHash);
  }, [currentHash]);

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

  const guidePrompt = guidePromptCopy[language] ?? guidePromptCopy.en;

  return (
    <div className="page-shell">
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
            onTabChange={setActiveTab}
          />
          <ScrollHint label={content.ui.scrollHint} />
          {showGuidePrompt && !isGuideOpen ? (
            <aside className="guide-prompt" aria-labelledby="guide-prompt-title">
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
            </aside>
          ) : null}
          <PortfolioGuide
            isOpen={isGuideOpen}
            language={language}
            onClose={closeGuide}
            onTabChange={setActiveTab}
          />
        </>
      )}
    </div>
  );
}

export default App;

