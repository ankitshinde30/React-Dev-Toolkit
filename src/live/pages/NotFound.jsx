import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Page not found';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <section className="section container container--narrow">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist or has moved.</p>
      <p>
        <Link className="btn btn--primary" to="/">
          Go to the home page
        </Link>
      </p>
    </section>
  );
}
