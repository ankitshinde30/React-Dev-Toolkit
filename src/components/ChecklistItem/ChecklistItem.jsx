import { memo } from 'react';
import { Check } from 'lucide-react';

const ChecklistItem = memo(function ChecklistItem({ id, text, checked, onToggle }) {
  return (
    <li className="check">
      <label className={'check__label' + (checked ? ' is-done' : '')}>
        <input type="checkbox" className="check__input" checked={checked} onChange={() => onToggle(id)} />
        <span className="check__box" aria-hidden="true">
          <Check size={14} strokeWidth={3} />
        </span>
        <span className="check__text">{text}</span>
      </label>
    </li>
  );
});

export default ChecklistItem;
