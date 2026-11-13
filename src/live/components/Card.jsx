export default function Card({
  image,
  imageAlt = '',
  title,
  headingLevel = 3,
  footer,
  children,
  className = '',
}) {
  const Heading = 'h' + headingLevel;

  return (
    <article className={('card ' + className).trim()}>
      {image && (
        <img className="card__media" src={image} alt={imageAlt} width="640" height="360" loading="lazy" />
      )}
      <div className="card__body">
        {title && <Heading className="card__title">{title}</Heading>}
        {children}
      </div>
      {footer && <div className="card__footer">{footer}</div>}
    </article>
  );
}

// Usage:
// <div className="grid grid-auto">
//   <Card title="Design" image="/img/design.webp" imageAlt="Wireframes on a desk" footer={<a className="btn btn--outline" href="/design">Learn more</a>}>
//     <p>Short description.</p>
//   </Card>
// </div>
