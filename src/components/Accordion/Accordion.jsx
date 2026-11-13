import { ChevronDown } from 'lucide-react';

/** Controlled accordion item. level 1 = top-level, level 2 = nested. */
export default function Accordion({ id, title, icon, meta, isOpen, onToggle, level = 1, children }) {
  const Heading = level === 1 ? 'h3' : 'h4';
  const buttonId = id + '-trigger';
  const panelId = id + '-panel';

  return (
    <section className={'acc acc--l' + level + (isOpen ? ' is-open' : '')}>
      <Heading className="acc__heading">
        <button
          type="button"
          id={buttonId}
          className="acc__trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          {icon && (
            <span className="acc__icon" aria-hidden="true">
              {icon}
            </span>
          )}
          <span className="acc__title">{title}</span>
          {meta}
          <ChevronDown className="acc__chevron" size={18} aria-hidden="true" />
        </button>
      </Heading>
      <div id={panelId} role="region" aria-labelledby={buttonId} className="acc__panel">
        <div className="acc__inner">{children}</div>
      </div>
    </section>
  );
}
