import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Github, Globe2, HelpCircle, Moon, Sun } from 'lucide-react';
import { focusAreas, heroData } from '../data/portfolioData';
import { trackEvent } from '../utils/analytics';
import GitHubContributions from './GitHubContributions';
import { fadeInUp, staggerContainer } from './motionVariants';

export function PortfolioImageBar({ data, className = '' }) {
  if (!data?.items?.length) return null;

  return (
    <motion.section
      className={`portfolio-image-bar${className ? ` ${className}` : ''}`}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      aria-label={data.title}
    >
      <div className="portfolio-image-bar-copy">
        <span>{data.title}</span>
        <p>{data.text}</p>
      </div>
      <div className="portfolio-image-strip">
        {data.items.map((item) => {
          const content = (
            <>
              <img src={item.src} alt={item.alt} loading="lazy" decoding="async" onError={(event) => { if (item.fallbackSrc && event.currentTarget.src !== item.fallbackSrc) event.currentTarget.src = item.fallbackSrc; }} />
              <span>{item.label}</span>
            </>
          );

          return item.href ? (
            <a
              key={`${item.src}-${item.label}`}
              href={item.href}
              className="portfolio-image-tile"
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
            >
              {content}
            </a>
          ) : (
            <div key={`${item.src}-${item.label}`} className="portfolio-image-tile">
              {content}
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

export default function Hero({
  content = { heroData, focusAreas, ui: { terminal: 'Terminal' } },
  language = 'en',
  theme = 'dark',
  onLanguageToggle,
  onThemeToggle,
  litePerformanceMode = false,
  onGuideOpen,
}) {
  const [isProfileImageLoaded, setIsProfileImageLoaded] = useState(false);
  const hero = content.heroData ?? heroData;
  const areas = content.focusAreas ?? focusAreas;
  const ui = content.ui ?? {};
  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <header className="hero">
      <motion.nav
        className="topbar" data-tour="topbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="brand">Akindu Imantha</div>
        <div className="nav-links">
          <a
            href="#console"
            className="nav-terminal-link"
            onClick={() => trackEvent('nav_click', { label: 'Terminal' })}
          >
            {ui.terminal ?? 'Terminal'}
          </a>
          <button
            type="button"
            className="nav-toggle nav-toggle--icon"
            onClick={onGuideOpen}
            aria-label="Open portfolio guide"
            title="Guide"
          >
            <HelpCircle size={16} />
          </button>
          <a
            href="#analytics"
            className="nav-icon-link"
            aria-label="Open analytics dashboard"
            title="Analytics"
          >
            <BarChart3 size={16} />
          </a>
          <button
            type="button"
            className="nav-toggle nav-toggle--language"
            onClick={onLanguageToggle}
            aria-label={language === 'en' ? 'Current language: English. Switch to Sinhala' : 'Current language: Sinhala. Switch to English'}
            title={language === 'en' ? 'English' : 'Sinhala'}
          >
            <Globe2 size={16} />
            <span className="nav-language-code">{language === 'en' ? 'EN' : '\u0dc3\u0dd2\u0d82'}</span>
          </button>
          <button
            type="button"
            className="nav-toggle nav-toggle--icon"
            onClick={onThemeToggle}
            aria-label={ui.themeToggleLabel ?? 'Toggle theme'}
          >
            <ThemeIcon size={16} />
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </motion.nav>

      <motion.div
        className="hero-grid"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-copy">
          <motion.p variants={fadeInUp} className="eyebrow">
            {hero.eyebrow}
          </motion.p>
          <motion.h1 variants={fadeInUp}>{hero.name}</motion.h1>
          <motion.p variants={fadeInUp} className="intro">
            {hero.intro}
          </motion.p>

          <motion.div variants={fadeInUp} className="hero-meta">
            {hero.meta.map((item) => (
              <span key={item} className="hero-meta-item">
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="hero-actions" data-tour="hero-actions">
            <a
              href={hero.primaryAction.href}
              className="primary-button"
              onClick={() => trackEvent('hero_action_click', { label: hero.primaryAction.label })}
            >
              {hero.primaryAction.label}
            </a>
            <a
              href={hero.secondaryAction.href}
              className="secondary-button"
              onClick={() => trackEvent('cv_download', { label: hero.secondaryAction.href })}
            >
              {hero.secondaryAction.label}
            </a>
            {hero.tertiaryAction ? (
              <a
                href={hero.tertiaryAction.href}
                className="secondary-button icon-button-link"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('external_link_click', { label: hero.tertiaryAction.href })}
              >
                <Github size={18} />
                <span>{hero.tertiaryAction.label}</span>
              </a>
            ) : null}
          </motion.div>

          <motion.div variants={fadeInUp} className="hero-github-panel">
            <GitHubContributions
              data={content.githubActivity}
              ui={content.ui}
              className="github-card--hero"
              litePerformanceMode={litePerformanceMode}
            />
          </motion.div>
        </div>

        <motion.div variants={fadeInUp} className="hero-card profile-card">
          <div
            className={`profile-image-container${isProfileImageLoaded ? ' is-loaded' : ''}`}
            style={{ '--profile-reflection-image': `url(${hero.profileImage})` }}
          >
            <img
              src={hero.profileImage}
              alt={hero.profileImageAlt}
              className="profile-image"
              width="720"
              height="720"
              decoding="async"
              fetchPriority="high"
              onLoad={() => setIsProfileImageLoaded(true)}
              onError={() => setIsProfileImageLoaded(true)}
            />
            <div className="profile-dots"></div>
            <div className="profile-glow"></div>
          </div>
          <div className="profile-card-content">
            <div className="card-label">{hero.profileLabel}</div>
            <h3>{hero.profileTitle}</h3>
            <p>{hero.profileText}</p>

            <ul>
              {areas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
      <PortfolioImageBar data={content.imageBar} />
    </header>
  );
}




