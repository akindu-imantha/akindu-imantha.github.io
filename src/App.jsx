import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import ScrollHint from './components/ScrollHint';
import TerminalConsole from './components/TerminalConsole';
import { portfolioContent } from './data/portfolioData';
import { startTimeOnPageTracking, trackPageView } from './utils/analytics';

const AnalyticsPage = lazy(() => import('./components/AnalyticsPage'));
const GradeAdminPage = lazy(() => import('./components/GradeAdminPage'));
const GradesPage = lazy(() => import('./components/GradesPage'));

function PageLoading() {
  return <main className="page-loading" aria-live="polite">Loading...</main>;
}

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem('portfolio-language') ?? 'en');
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') ?? 'dark');
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);
  const [activeTab, setActiveTab] = useState(() =>
    window.location.hash.startsWith('#grades') ? 'education' : 'about',
  );
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
          />
          <TerminalConsole
            content={content}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <ScrollHint label={content.ui.scrollHint} />
        </>
      )}
    </div>
  );
}

export default App;
