import { Link } from 'react-router-dom';

const footerLinks = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy policy' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-4" role="list">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-muted">© {new Date().getFullYear()} Company name. All rights reserved.</p>
      </div>
    </footer>
  );
}
