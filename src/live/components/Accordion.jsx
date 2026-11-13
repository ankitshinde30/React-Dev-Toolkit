import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items, allowMultiple = false, defaultOpenId = null }) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState(() => new Set(defaultOpenId ? [defaultOpenId] : []));

  function toggle(id) {
    setOpenIds((previous) => {
      const next = new Set(allowMultiple ? previous : []);
      if (previous.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const buttonId = baseId + '-btn-' + item.id;
        const panelId = baseId + '-panel-' + item.id;
        return (
          <div key={item.id} className={'accordion__item' + (isOpen ? ' is-open' : '')}>
            <h3>
              <button
                type="button"
                id={buttonId}
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                {item.title}
                <ChevronDown className="accordion__icon" aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} className="accordion__panel">
              <div className="accordion__inner">
                <div className="accordion__content">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Usage: <Accordion items={[{ id: 'a', title: 'Question', content: <p>Answer</p> }]} />
