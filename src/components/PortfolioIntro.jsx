import { motion } from 'framer-motion';

export default function PortfolioIntro({ onComplete }) {
  return (
    <motion.section
      className="portfolio-intro"
      aria-label="Loading Akindu Imantha portfolio"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.025, filter: 'blur(7px)' }}
      transition={{ duration: 0.42, ease: 'easeInOut' }}
    >
      <div className="portfolio-intro-grid" aria-hidden="true" />
      <div className="portfolio-intro-ambient" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <button className="portfolio-intro-skip" type="button" onClick={onComplete}>
        Skip intro
      </button>
      <div className="portfolio-intro-content">
        <p className="portfolio-intro-command">./initialize-portfolio</p>
        <div className="portfolio-intro-monogram" aria-label="Akindu Imantha">
          <motion.div
            className="portfolio-intro-initial portfolio-intro-initial--a"
            initial={{ opacity: 0, x: -76, rotate: -14 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="portfolio-intro-letter portfolio-intro-letter--a">A</span>
            <span className="portfolio-intro-initial-name">AKINDU</span>
          </motion.div>
          <span className="portfolio-intro-divider" aria-hidden="true" />
          <motion.div
            className="portfolio-intro-initial portfolio-intro-initial--i"
            initial={{ opacity: 0, x: 76, rotate: 14 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.62, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="portfolio-intro-letter portfolio-intro-letter--i">I</span>
            <span className="portfolio-intro-initial-name">IMANTHA</span>
          </motion.div>
        </div>
        <motion.p
          className="portfolio-intro-status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 1.08 }}
        >
          <i /> PORTFOLIO READY
        </motion.p>
      </div>
      <div className="portfolio-intro-progress" aria-hidden="true"><span /></div>
    </motion.section>
  );
}
