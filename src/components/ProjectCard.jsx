import { trackEvent } from '../utils/analytics';

function getProjectActions(project) {
  if (project.actions?.length) {
    return project.actions;
  }

  return [
    project.liveUrl
      ? { label: project.primaryLinkLabel, href: project.liveUrl, variant: 'primary' }
      : null,
    project.secondaryUrl
      ? { label: project.secondaryLinkLabel, href: project.secondaryUrl, variant: 'secondary' }
      : null,
  ].filter(Boolean);
}

export default function ProjectCard({
  project,
  Component = 'article',
  variant = 'default',
  ...rest
}) {
  const previewHref = project.previewUrl ?? project.secondaryUrl ?? project.liveUrl;
  const actions = getProjectActions(project);
  const statusToneClass = project.statusTone ? `project-status--${project.statusTone}` : '';
  const className = ['project-card', 'console-card', `project-card--${variant}`].join(' ');

  return (
    <Component className={className} {...rest}>
      <div className="project-card-header">
        <div>
          {project.category ? <p className="project-kicker">{project.category}</p> : null}
          <p className="project-stack">{project.stack}</p>
        </div>
        {project.statusText ? (
          <span className={['project-status', statusToneClass].filter(Boolean).join(' ')}>
            {project.statusText}
          </span>
        ) : null}
      </div>

      <div className="project-card-copy">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>

      {variant !== 'compact' && project.previewImage && previewHref ? (
        <a
          className="project-preview"
          href={previewHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} demo preview`}
          onClick={() => trackEvent('project_preview_click', { label: project.title })}
        >
          <img
            src={project.previewImage}
            alt={project.previewAlt ?? `${project.title} preview`}
            loading="lazy"
            decoding="async"
          />
          <span className="project-preview-badge">{project.previewLabel ?? 'Watch Demo'}</span>
        </a>
      ) : null}

      {actions.length > 0 ? (
        <div className="project-actions">
          {actions.map((action) => {
            const actionClassName = [
              'project-link',
              action.variant === 'secondary' ? 'secondary' : '',
              action.disabled ? 'is-disabled' : '',
            ]
              .filter(Boolean)
              .join(' ');

            if (action.disabled || !action.href) {
              return (
                <span key={action.label} className={actionClassName} aria-disabled="true">
                  {action.label}
                </span>
              );
            }

            return (
              <a
                key={action.label}
                className={actionClassName}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent('project_link_click', {
                    label: `${project.title} - ${action.label}`,
                  })
                }
              >
                {action.label}
              </a>
            );
          })}
        </div>
      ) : null}
    </Component>
  );
}
