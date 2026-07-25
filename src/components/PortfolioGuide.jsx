import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BookOpenCheck, ChevronLeft, ChevronRight, FileText, Languages, MousePointer2, Search, Terminal, X } from 'lucide-react';

const copies = {
  en: {
    close: 'Close guide', back: 'Back', next: 'Next', finish: 'Done', skip: 'Skip', openGrades: 'Open grades',
    steps: [
      { selector: '[data-tour="topbar"]', icon: Languages, title: 'Top controls', text: 'Use this bar to jump to the terminal, reopen this guide, view analytics, switch language, or change theme.' },
      { selector: '[data-tour="hero-actions"]', icon: FileText, title: 'Main actions', text: 'These buttons take visitors to contact, download the CV, or open GitHub.' },
      { selector: '[data-tour="terminal"]', icon: Terminal, title: 'Portfolio workspace', text: 'This is the main area where the portfolio content is displayed like an interactive terminal.' },
      { selector: '[data-tour="sidebar"]', icon: MousePointer2, title: 'Section commands', text: 'Visitors can move between About, Education, Skills, Projects, Experience, and Contact from here.' },
      { selector: '[data-tour="education-grades"]', icon: BookOpenCheck, title: 'Degree modules and grades', text: 'The Education section links each degree to the Grades page, where course modules, credits, completed grades, and pending modules are grouped by semester.', targetTab: 'education', action: 'grades' },
      { selector: '[data-tour="search"]', icon: Search, title: 'Search content', text: 'Typing here filters skills, projects, tools, modules, and other portfolio details immediately.' },
    ],
  },
  si: {
    close: 'Guide eka close karanna', back: 'Apassata', next: 'Next', finish: 'Iwarai', skip: 'Skip', openGrades: 'Grades balanna',
    steps: [
      { selector: '[data-tour="topbar"]', icon: Languages, title: 'Top controls', text: 'Meken terminal ekata yanna, guide eka aye open karanna, analytics balanna, language/theme maaru karanna puluwan.' },
      { selector: '[data-tour="hero-actions"]', icon: FileText, title: 'Main actions', text: 'Me buttons walin contact section ekata yanna, CV download karanna, GitHub open karanna puluwan.' },
      { selector: '[data-tour="terminal"]', icon: Terminal, title: 'Portfolio workspace', text: 'Portfolio details pennanne me interactive terminal-style area eke.' },
      { selector: '[data-tour="sidebar"]', icon: MousePointer2, title: 'Section commands', text: 'About, Education, Skills, Projects, Experience, Contact sections walata me commands walin yanna puluwan.' },
      { selector: '[data-tour="education-grades"]', icon: BookOpenCheck, title: 'Degree modules saha grades', text: 'Education section eke degree cards walin Grades page ekata yanna puluwan. Ethana course modules, credits, completed grades saha pending modules semester anuwa pennanawa.', targetTab: 'education', action: 'grades' },
      { selector: '[data-tour="search"]', icon: Search, title: 'Search content', text: 'Methana type karala skills, projects, tools, modules saha portfolio details ikmanata filter karanna puluwan.' },
    ],
  },
};

const fallbackRect = { top: 120, left: 24, width: 320, height: 120 };
const motionTransition = { type: 'spring', stiffness: 260, damping: 30, mass: 0.78 };

function getTipStyle(rect) {
  const margin = 16;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const width = Math.min(380, viewportWidth - margin * 2);
  const heightEstimate = Math.min(280, viewportHeight - margin * 2);
  const hasRoomBelow = rect.top + rect.height + heightEstimate + margin < viewportHeight;
  const hasRoomAbove = rect.top - heightEstimate - margin > margin;
  const top = hasRoomBelow
    ? rect.top + rect.height + margin
    : hasRoomAbove
      ? rect.top - heightEstimate - margin
      : Math.max(margin, viewportHeight - heightEstimate - margin);

  return {
    width,
    top,
    left: Math.min(Math.max(margin, rect.left + rect.width / 2 - width / 2), viewportWidth - width - margin),
  };
}

export default function PortfolioGuide({ isOpen, language = 'en', onClose, onTabChange }) {
  const copy = copies[language] ?? copies.en;
  const [stepIndex, setStepIndex] = useState(0);
  const [rect, setRect] = useState(fallbackRect);
  const frameRef = useRef(0);
  const touchStartRef = useRef(null);
  const step = copy.steps[stepIndex];
  const { selector, icon: Icon, title, text } = step;
  const tipStyle = useMemo(() => getTipStyle(rect), [rect]);
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === copy.steps.length - 1;

  useEffect(() => {
    if (isOpen) setStepIndex(0);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !step.targetTab) return;
    onTabChange?.(step.targetTab);
  }, [isOpen, onTabChange, step.targetTab]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    let measureTimer;

    const measure = () => {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = window.requestAnimationFrame(() => {
        const target = document.querySelector(selector);
        const next = target?.getBoundingClientRect();

        if (!next) {
          setRect(fallbackRect);
          return;
        }

        setRect({ top: next.top, left: next.left, width: next.width, height: next.height });
      });
    };

    const scrollAndMeasure = () => {
      const target = document.querySelector(selector);

      if (target) {
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center', inline: 'nearest' });
      }

      measureTimer = window.setTimeout(measure, reducedMotion ? 60 : 360);
    };

    scrollAndMeasure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true });

    return () => {
      window.clearTimeout(measureTimer);
      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
    };
  }, [isOpen, selector, step.targetTab]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const target = document.querySelector(selector);
    target?.classList.add('guide-target-active');
    return () => target?.classList.remove('guide-target-active');
  }, [isOpen, selector, rect]);

  useEffect(() => {
    const updateGradesClass = () => {
      const isGrades = Boolean(document.querySelector('.grades-page') || window.location.hash.startsWith('#grades'));
      document.body.classList.toggle('guide-open', isOpen);
      if (isOpen && isGrades) document.body.classList.add('guide-open-grades');
      else document.body.classList.remove('guide-open-grades');
    };

    updateGradesClass();
    window.addEventListener('hashchange', updateGradesClass);

    return () => {
      window.removeEventListener('hashchange', updateGradesClass);
      document.body.classList.remove('guide-open');
      document.body.classList.remove('guide-open-grades');
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') setStepIndex((current) => Math.min(current + 1, copy.steps.length - 1));
      if (event.key === 'ArrowLeft') setStepIndex((current) => Math.max(current - 1, 0));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [copy.steps.length, isOpen, onClose]);

  const nextStep = () => {
    if (isLast) onClose();
    else setStepIndex((current) => current + 1);
  };

  const openGrades = () => {
    onClose();
    window.location.hash = '#grades-sltc';
  };

  const handleTouchEnd = (event) => {
    if (touchStartRef.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartRef.current;
    touchStartRef.current = null;

    if (Math.abs(deltaX) < 48) return;
    if (deltaX < 0) nextStep();
    else setStepIndex((current) => Math.max(current - 1, 0));
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div className="guide-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-hidden="true" />
          <motion.div
            className="guide-spotlight"
            style={{ top: rect.top - 10, left: rect.left - 10, width: rect.width + 20, height: rect.height + 20 }}
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={motionTransition}
            aria-hidden="true"
          />
          <motion.section
            className="guide-popover"
            style={tipStyle}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={motionTransition}
            role="dialog"
            aria-modal="false"
            aria-labelledby="portfolio-guide-title"
            onTouchStart={(event) => { touchStartRef.current = event.touches[0].clientX; }}
            onTouchEnd={handleTouchEnd}
          >
            <button type="button" className="guide-close" onClick={onClose} aria-label={copy.close}><X size={18} /></button>
            <div className="guide-popover-header">
              <span>{String(stepIndex + 1).padStart(2, '0')} / {String(copy.steps.length).padStart(2, '0')}</span>
              <div className="guide-step-icon"><Icon size={20} /></div>
            </div>
            <h2 id="portfolio-guide-title">{title}</h2>
            <p>{text}</p>
            <div className="guide-progress" aria-label={`Step ${stepIndex + 1} of ${copy.steps.length}`}>
              {copy.steps.map((guideStep, index) => (
                <button key={guideStep.title} type="button" className={`guide-progress-dot ${index === stepIndex ? 'active' : ''}`} onClick={() => setStepIndex(index)} aria-label={`Go to step ${index + 1}`} />
              ))}
            </div>
            <div className="guide-actions">
              <button type="button" className="secondary-button guide-action" onClick={onClose}>{copy.skip}</button>
              <button type="button" className="secondary-button guide-action" onClick={() => setStepIndex((current) => Math.max(current - 1, 0))} disabled={isFirst}><ChevronLeft size={16} />{copy.back}</button>
              {step.action === 'grades' ? (
                <button type="button" className="secondary-button guide-action" onClick={openGrades}>{copy.openGrades}</button>
              ) : null}
              <button type="button" className="primary-button guide-action" onClick={nextStep}>{isLast ? copy.finish : copy.next}<ChevronRight size={16} /></button>
            </div>
          </motion.section>
        </>
      ) : null}
    </AnimatePresence>
  );
}