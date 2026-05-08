import { motion } from 'framer-motion';
import { Github, Globe2, Moon, Sun } from 'lucide-react';
import { focusAreas, heroData } from '../data/portfolioData';
import { trackEvent } from '../utils/analytics';
import GitHubContributions from './GitHubContributions';
import { fadeInUp, staggerContainer } from './motionVariants';

export default function Hero({
  content = { heroData, focusAreas, ui: { terminal: 'Terminal' } },
  language = 'en',
  theme = 'dark',
  onLanguageToggle,
  onThemeToggle,
}) {
  const hero = content.heroData ?? heroData;
  const areas = content.focusAreas ?? focusAreas;
  const ui = content.ui ?? {};
  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <header className="hero">
      <motion.nav
        className="topbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="brand">Akindu Imantha</div>
        <div className="nav-links">
          <a href="#console" onClick={() => trackEvent('nav_click', { label: 'Terminal' })}>
            {ui.terminal ?? 'Terminal'}
          </a>
          <button
            type="button"
            className="nav-toggle"
            onClick={onLanguageToggle}
            aria-label={ui.languageToggleLabel ?? 'Toggle language'}
          >
            <Globe2 size={16} />
            <span>{language === 'en' ? 'සිං' : 'EN'}</span>
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

          <motion.div variants={fadeInUp} className="hero-actions">
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
            />
          </motion.div>
        </div>

        <motion.div variants={fadeInUp} className="hero-card profile-card">
          <div className="profile-image-container">
            <img
              src={hero.profileImage}
              alt={hero.profileImageAlt}
              className="profile-image"
              width="720"
              height="720"
              decoding="async"
              fetchPriority="high"
            />
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
    </header>
  );
}
