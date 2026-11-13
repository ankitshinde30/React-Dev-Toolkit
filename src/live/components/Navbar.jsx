import { useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import useMobileMenu from '../hooks/useMobileMenu';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function NavItems({ listClass, linkClass, onNavigate }) {
  return (
    <ul className={listClass}>
      {links.map((link) => (
        <li key={link.to}>
          <NavLink to={link.to} end={link.end} className={linkClass} onClick={onNavigate}>
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default function Navbar() {
  const rootRef = useRef(null);
  const { isOpen, toggle, close } = useMobileMenu(rootRef);

  return (
    <header className="navbar" ref={rootRef}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" onClick={close}>
          Brand
        </Link>

        <nav aria-label="Primary">
          <NavItems listClass="navbar__links" linkClass="navbar__link" />
        </nav>

        <button
          type="button"
          className="navbar__toggle"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={toggle}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav id="mobile-menu" aria-label="Mobile" className={'mobile-menu' + (isOpen ? ' is-open' : '')}>
        <NavItems listClass="mobile-menu__list" linkClass="mobile-menu__link" onNavigate={close} />
      </nav>
    </header>
  );
}
