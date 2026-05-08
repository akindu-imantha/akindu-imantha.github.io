import { useEffect, useMemo, useState } from 'react';
import AnalyticsPage from './components/AnalyticsPage';
import GradesPage from './components/GradesPage';
import Hero from './components/Hero';
import ScrollHint from './components/ScrollHint';
import TerminalConsole from './components/TerminalConsole';
import { portfolioContent } from './data/portfolioData';
import { trackPageView } from './utils/analytics';

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
      {isAnalyticsPage ? (
        <AnalyticsPage />
      ) : isGradesPage ? (
        <GradesPage content={content} activeGradeId={activeGradeId} />
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
