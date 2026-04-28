import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useCallback, useState } from 'react';
import { creativeProfile, technicalSkills, tools } from '../../data/portfolioData';
import { SkillMeter, SkillOrb, SkillPill } from '../../utils/skillIcons';
import SectionTitle from '../SectionTitle';
import { fadeInUp, staggerContainer } from '../motionVariants';

export default function SkillsTab({ data = {} }) {
  const [animationCycle, setAnimationCycle] = useState(0);
  const skills = data.technicalSkills ?? technicalSkills;
  const toolItems = data.tools ?? tools;
  const profile = data.creativeProfile ?? creativeProfile;
  const section = data.sections?.skills ?? {
    eyebrow: './skills.sh',
    title: 'Technical capabilities',
    text: 'This section focuses on the technical skills, tools, and software I use across development and creative work.',
  };
  const restartSkillAnimation = useCallback(() => {
    setAnimationCycle((cycle) => cycle + 1);
  }, []);

  return (
    <motion.div
      key="skills"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="console-section"
    >
      <SectionTitle
        eyebrow={section.eyebrow}
        title={section.title}
        text={section.text}
      />

      <motion.div
        className="skills-layout"
        onViewportEnter={restartSkillAnimation}
        viewport={{ amount: 0.35, once: true }}
      >
        <motion.article variants={fadeInUp} className="about-card console-card">
          <h3>{data.ui?.programmingTitle ?? 'Programming and web'}</h3>
          <div className="skill-meter-list">
            {skills.map((skill, index) => (
              <SkillMeter key={`${skill}-${animationCycle}`} label={skill} index={index} />
            ))}
          </div>
        </motion.article>

        <motion.article variants={fadeInUp} className="about-card console-card">
          <h3>{data.ui?.toolsTitle ?? 'Tools and creative software'}</h3>
          <div className="skill-orb-grid">
            {toolItems.map((tool, index) => (
              <SkillOrb key={`${tool}-${animationCycle}`} label={tool} index={index} />
            ))}
          </div>
        </motion.article>
      </motion.div>

      <motion.article variants={fadeInUp} className="about-card console-card creative-profile-card">
        <div className="creative-profile-copy">
          <p className="project-kicker">{data.ui?.creativeProfile ?? 'Creative profile'}</p>
          <h3>{profile.title}</h3>
          <p>{profile.text}</p>
        </div>

        <div className="creative-profile-actions">
          <div className="skill-list">
            {profile.highlights.map((item) => (
              <SkillPill key={item} label={item} />
            ))}
          </div>

          <a
            className="project-link creative-profile-link"
            href={profile.link.href}
            target="_blank"
            rel="noreferrer"
          >
            {profile.link.label}
            <ExternalLink size={16} />
          </a>
        </div>
      </motion.article>
    </motion.div>
  );
}
