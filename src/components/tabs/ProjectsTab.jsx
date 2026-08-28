import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { projects } from '../../data/portfolioData';
import ProjectCard from '../ProjectCard';
import SectionTitle from '../SectionTitle';
import { fadeInUp, staggerContainer } from '../motionVariants';

export default function ProjectsTab({ data = {} }) {
  const featuredProjectsRef = useRef(null);
  const [activeFeaturedProject, setActiveFeaturedProject] = useState(0);
  const projectItems = data.projects ?? projects;
  const section = data.sections?.projects ?? {
    eyebrow: './projects.sh',
    title: 'Selected work',
    text: 'The strongest builds are highlighted first, while private and supporting work stays visible in a cleaner secondary layout.',
  };
  const featuredProjects = projectItems
    .filter((project) => project.featured)
    .sort((left, right) => (left.featuredRank ?? 99) - (right.featuredRank ?? 99));
  const supportingProjects = projectItems.filter((project) => !project.featured);

  useEffect(() => {
    const gallery = featuredProjectsRef.current;
    if (!gallery) return undefined;

    const updateActiveProject = () => {
      const cardWidth = gallery.firstElementChild?.getBoundingClientRect().width ?? gallery.clientWidth;
      setActiveFeaturedProject(Math.round(gallery.scrollLeft / cardWidth));
    };

    gallery.addEventListener('scroll', updateActiveProject, { passive: true });
    return () => gallery.removeEventListener('scroll', updateActiveProject);
  }, []);

  const scrollToFeaturedProject = (index) => {
    const gallery = featuredProjectsRef.current;
    const card = gallery?.children[index];
    if (!gallery || !card) return;

    gallery.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
  };

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
        eyebrow={section.eyebrow}
        title={section.title}
        text={section.text}
      />

      <div className="projects-layout">
        <div ref={featuredProjectsRef} className="featured-project-grid" data-swipe-ignore>
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

        {featuredProjects.length > 1 ? (
          <div className="project-gallery-pagination" aria-label="Featured projects">
            {featuredProjects.map((project, index) => (
              <button
                key={project.title}
                type="button"
                className={index === activeFeaturedProject ? 'active' : ''}
                onClick={() => scrollToFeaturedProject(index)}
                aria-label={`Show project ${index + 1}: ${project.title}`}
                aria-current={index === activeFeaturedProject ? 'true' : undefined}
              />
            ))}
          </div>
        ) : null}

        {supportingProjects.length > 0 ? (
          <motion.section variants={fadeInUp} className="project-archive console-card">
            <div className="project-archive-copy">
              <p className="eyebrow">{data.ui?.additionalWork ?? 'Additional work'}</p>
              <h3>{data.ui?.supportingBuilds ?? 'Supporting and private builds'}</h3>
              <p>
                {data.ui?.supportingBuildsText ??
                  'Smaller or non-public projects stay grouped separately, so the main work gets a stronger first impression.'}
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
