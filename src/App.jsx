import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import ScrollHint from './components/ScrollHint';
import TerminalConsole from './components/TerminalConsole';
import { portfolioContent } from './data/portfolioData';

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem('portfolio-language') ?? 'en');
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') ?? 'dark');
  const content = useMemo(() => portfolioContent[language] ?? portfolioContent.en, [language]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language === 'si' ? 'si' : 'en';
    localStorage.setItem('portfolio-language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((currentLanguage) => (currentLanguage === 'en' ? 'si' : 'en'));
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="page-shell">
      <Hero
        content={content}
        language={language}
        theme={theme}
        onLanguageToggle={toggleLanguage}
        onThemeToggle={toggleTheme}
      />
      <TerminalConsole content={content} />
      <ScrollHint label={content.ui.scrollHint} />
    </div>
  );
}

export default App;
