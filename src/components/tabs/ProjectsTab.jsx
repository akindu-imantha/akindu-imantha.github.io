import { motion } from 'framer-motion';
import { projects } from '../../data/portfolioData';
import ProjectCard from '../ProjectCard';
import SectionTitle from '../SectionTitle';
import { fadeInUp, staggerContainer } from '../motionVariants';

export default function ProjectsTab() {
  return (
    <motion.div
      key="projects"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="console-section"
    >
      <SectionTitle
        eyebrow="./projects.sh"
        title="Selected work"
        text="These projects are taken directly from the experience and project section of the CV."
      />

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            Component={motion.article}
            project={project}
            variants={fadeInUp}
          />
        ))}
      </div>
    </motion.div>
  );
}
