import { motion } from 'framer-motion';
import { focusAreas, heroData } from '../data/portfolioData';
import { fadeInUp, staggerContainer } from './motionVariants';

export default function Hero() {
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
          <a href="#console">Terminal</a>
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
            {heroData.eyebrow}
          </motion.p>
          <motion.h1 variants={fadeInUp}>{heroData.name}</motion.h1>
          <motion.p variants={fadeInUp} className="intro">
            {heroData.intro}
          </motion.p>

          <motion.div variants={fadeInUp} className="hero-meta">
            {heroData.meta.map((item) => (
              <span key={item} className="hero-meta-item">
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="hero-actions">
            <a href={heroData.primaryAction.href} className="primary-button">
              {heroData.primaryAction.label}
            </a>
            <a href={heroData.secondaryAction.href} className="secondary-button">
              {heroData.secondaryAction.label}
            </a>
          </motion.div>
        </div>

        <motion.div variants={fadeInUp} className="hero-card profile-card">
          <div className="profile-image-container">
            <img
              src={heroData.profileImage}
              alt={heroData.profileImageAlt}
              className="profile-image"
            />
            <div className="profile-glow"></div>
          </div>
          <div className="profile-card-content">
            <div className="card-label">{heroData.profileLabel}</div>
            <h3>{heroData.profileTitle}</h3>
            <p>{heroData.profileText}</p>

            <ul>
              {focusAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
}
