export default function ExperienceCard({ item, Component = 'article', ...rest }) {
  return (
    <Component className="timeline-item console-card" {...rest}>
      <span>{item.period}</span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      {item.images ? (
        <div className="experience-gallery">
          {item.images.map((image) => (
            <figure key={image.src} className="experience-media">
              <img src={image.src} alt={image.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      ) : null}
    </Component>
  );
}
