import { motion } from 'framer-motion';
import { projects } from '../../data/portfolioData';
import ProjectCard from '../ProjectCard';
import SectionTitle from '../SectionTitle';
import { fadeInUp, staggerContainer } from '../motionVariants';

export default function ProjectsTab() {
  const featuredProjects = projects
    .filter((project) => project.featured)
    .sort((left, right) => (left.featuredRank ?? 99) - (right.featuredRank ?? 99));
  const supportingProjects = projects.filter((project) => !project.featured);

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
        text="The strongest builds are highlighted first, while private and supporting work stays visible in a cleaner secondary layout."
      />

      <div className="projects-layout">
        <div className="featured-project-grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              Component={motion.article}
              project={project}
              variant={index === 0 ? 'lead' : 'featured'}
              variants={fadeInUp}
            />
          ))}
        </div>

        {supportingProjects.length > 0 ? (
          <motion.section variants={fadeInUp} className="project-archive console-card">
            <div className="project-archive-copy">
              <p className="eyebrow">Additional work</p>
              <h3>Supporting and private builds</h3>
              <p>
                Smaller or non-public projects stay grouped separately, so the main work gets a
                stronger first impression.
              </p>
            </div>

            <div className="project-list">
              {supportingProjects.map((project) => (
                <ProjectCard
                  key={project.title}
                  Component={motion.article}
                  project={project}
                  variant="compact"
                  variants={fadeInUp}
                />
              ))}
            </div>
          </motion.section>
        ) : null}
      </div>
    </motion.div>
  );
}
