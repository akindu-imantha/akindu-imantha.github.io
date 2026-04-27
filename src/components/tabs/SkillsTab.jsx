import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { creativeProfile, technicalSkills, tools } from '../../data/portfolioData';
import { SkillMeter, SkillOrb, SkillPill } from '../../utils/skillIcons';
import SectionTitle from '../SectionTitle';
import { fadeInUp, staggerContainer } from '../motionVariants';

export default function SkillsTab() {
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
        eyebrow="./skills.sh"
        title="Technical capabilities"
        text="This section focuses on the technical skills, tools, and software I use across development and creative work."
      />

      <div className="skills-layout">
        <motion.article variants={fadeInUp} className="about-card console-card">
          <h3>Programming and web</h3>
          <div className="skill-meter-list">
            {technicalSkills.map((skill) => (
              <SkillMeter key={skill} label={skill} />
            ))}
          </div>
        </motion.article>

        <motion.article variants={fadeInUp} className="about-card console-card">
          <h3>Tools and creative software</h3>
          <div className="skill-orb-grid">
            {tools.map((tool) => (
              <SkillOrb key={tool} label={tool} />
            ))}
          </div>
        </motion.article>
      </div>

      <motion.article variants={fadeInUp} className="about-card console-card creative-profile-card">
        <div className="creative-profile-copy">
          <p className="project-kicker">Creative profile</p>
          <h3>{creativeProfile.title}</h3>
          <p>{creativeProfile.text}</p>
        </div>

        <div className="creative-profile-actions">
          <div className="skill-list">
            {creativeProfile.highlights.map((item) => (
              <SkillPill key={item} label={item} />
            ))}
          </div>

          <a
            className="project-link creative-profile-link"
            href={creativeProfile.link.href}
            target="_blank"
            rel="noreferrer"
          >
            {creativeProfile.link.label}
            <ExternalLink size={16} />
          </a>
        </div>
      </motion.article>
    </motion.div>
  );
}
