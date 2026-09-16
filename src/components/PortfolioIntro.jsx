import { motion } from 'framer-motion';

export default function PortfolioIntro({ onComplete, litePerformanceMode = false }) {
  return (
    <motion.section
      className={`portfolio-intro ${litePerformanceMode ? 'portfolio-intro--lite' : ''}`}
      aria-label="Loading අකිඳු ඉමන්ත portfolio"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: litePerformanceMode ? 0.16 : 0.28, ease: 'easeOut' }}
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
        <div className="portfolio-intro-monogram" aria-label="අකිඳු ඉමන්ත">
          <motion.div
            className="portfolio-intro-initial portfolio-intro-initial--a"
            initial={litePerformanceMode ? false : { opacity: 0, x: -76, rotate: -14 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: litePerformanceMode ? 0 : 0.62, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="portfolio-intro-letter portfolio-intro-letter--a">ඉ</span>
            <span className="portfolio-intro-initial-name">අකිඳු ඉමන්ත</span>
          </motion.div>
        </div>
        <motion.p
          className="portfolio-intro-status"
          initial={litePerformanceMode ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: litePerformanceMode ? 0 : 0.35, delay: litePerformanceMode ? 0 : 1.08 }}
        >
          <i /> PORTFOLIO READY
        </motion.p>
      </div>
      <div className="portfolio-intro-progress" aria-hidden="true"><span /></div>
    </motion.section>
  );
}
