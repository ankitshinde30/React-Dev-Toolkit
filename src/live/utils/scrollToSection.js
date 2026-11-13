export function scrollToSection(id, { offset = 0 } = {}) {
  const target = document.getElementById(id);
  if (!target) return false;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });

  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  return true;
}

// Usage:
// <button type="button" className="btn btn--primary" onClick={() => scrollToSection('pricing', { offset: 72 })}>
//   See pricing
// </button>
