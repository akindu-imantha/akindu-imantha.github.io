import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, Github, Globe2, HelpCircle, Moon, Sun, X } from 'lucide-react';
import { focusAreas, heroData } from '../data/portfolioData';
import { trackEvent } from '../utils/analytics';
import GitHubContributions from './GitHubContributions';
import { fadeInUp, staggerContainer } from './motionVariants';

function PortfolioImageLightbox({ item, onClose }) {
  const gallery = item?.gallery?.length ? item.gallery : item ? [{ src: item.src, alt: item.alt }] : [];
  useEffect(() => {
    if (!item) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [item, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {item ? (
        <motion.div
          key={`${item.src}-${item.label}`}
          className="portfolio-image-lightbox-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            className="portfolio-image-lightbox-scrim"
            aria-label="Close image preview"
            onClick={onClose}
          />
          <motion.div
            className="portfolio-image-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={item.label}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <button type="button" className="portfolio-image-lightbox-close" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
            <div className={`portfolio-image-lightbox-collage portfolio-image-lightbox-collage--${gallery.length}`}>
              {gallery.map((image, index) => (
                <img
                  key={`${image.src}-${index}`}
                  src={image.src}
                  alt={image.alt || item.alt}
                  onError={(event) => {
                    if (item.fallbackSrc && event.currentTarget.src !== item.fallbackSrc) {
                      event.currentTarget.src = item.fallbackSrc;
                    }
                  }}
                />
              ))}
            </div>
            <div className="portfolio-image-lightbox-caption">
              <span>{item.label}</span>
              {item.href && item.external ? (
                <a href={item.href} target="_blank" rel="noreferrer">
                  View profile
                </a>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export function PortfolioImageBar({ data, className = '' }) {
  const [activeItem, setActiveItem] = useState(null);

  if (!data?.items?.length) return null;

  return (
    <>
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
          {data.items.map((item) => (
            <button
              key={`${item.src}-${item.label}`}
              type="button"
              className="portfolio-image-tile"
              aria-label={`View ${item.label}`}
              onClick={() => {
                setActiveItem({ ...item, gallery: item.gallery?.length ? item.gallery : [{ src: item.src, alt: item.alt }] });
                trackEvent('moment_preview_open', { label: item.label });
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  if (item.fallbackSrc && event.currentTarget.src !== item.fallbackSrc) {
                    event.currentTarget.src = item.fallbackSrc;
                  }
                }}
              />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </motion.section>
      <PortfolioImageLightbox item={activeItem} onClose={() => setActiveItem(null)} />
    </>
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




