export default function ProjectCard({ project, Component = 'article', ...rest }) {
  return (
    <Component className="project-card console-card" {...rest}>
      <p className="project-stack">{project.stack}</p>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      {project.previewImage ? (
        <a
          className="project-preview"
          href={project.secondaryUrl ?? project.liveUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} demo preview`}
        >
          <img
            src={project.previewImage}
            alt={project.previewAlt ?? `${project.title} preview`}
            loading="lazy"
          />
          <span className="project-preview-badge">Watch Demo</span>
        </a>
      ) : null}
      <div className="project-actions">
        <a className="project-link" href={project.liveUrl} target="_blank" rel="noreferrer">
          {project.primaryLinkLabel}
        </a>
        {project.secondaryUrl ? (
          <a
            className="project-link secondary"
            href={project.secondaryUrl}
            target="_blank"
            rel="noreferrer"
          >
            {project.secondaryLinkLabel}
          </a>
        ) : null}
      </div>
    </Component>
  );
}
