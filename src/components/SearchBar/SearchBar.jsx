import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, label, placeholder }) {
  return (
    <div className="search">
      <Search size={16} className="search__icon" aria-hidden="true" />
      <input
        type="search"
        className="input search__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
      />
      {value && (
        <button type="button" className="icon-btn search__clear" aria-label="Clear search" onClick={() => onChange('')}>
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
