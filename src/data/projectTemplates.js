import { makeSection, universalSections } from './checklistData.js';

/**
 * Project types. Each adds its own extra sections on top of the universal checklist.
 * Extra item ids are "tpl-<type>-<position>"; append new items to the end of a list.
 */
function extras(typeId, title, icon, items) {
  return [makeSection('tpl-' + typeId, title, icon, items)];
}

export const projectTypes = [
  {
    id: 'standard',
    label: 'Standard (universal checklist only)',
    description: 'The universal checklist with no extra project-specific items.',
    extras: [],
  },
  {
    id: 'business',
    label: 'Business website',
    description: 'Adds contact, trust, legal and local SEO checks.',
    extras: extras('business', 'EXTRA — Business Website', 'Globe', [
      'Services or products pages explain what the business does and for whom',
      'Contact form delivers to the right inbox and was tested end to end',
      'Phone and email links work on mobile (tel: and mailto:)',
      'Address, opening hours and map are correct and consistent everywhere',
      'Testimonials, logos or certifications are approved for use',
      'Privacy policy and terms pages are published and linked in the footer',
      'Cookie consent is implemented where required',
      'Analytics is installed and respects consent',
      'LocalBusiness structured data is added and valid',
      'Social media links open the correct profiles',
    ]),
  },
  {
    id: 'landing',
    label: 'Landing page',
    description: 'Adds conversion, tracking and speed checks.',
    extras: extras('landing', 'EXTRA — Landing Page', 'Rocket', [
      'One primary call to action is visible above the fold on every device',
      'Headline matches the ad or link that brings visitors here',
      'Form asks only for what is needed',
      'Thank-you state or page confirms the submission',
      'Navigation is minimal so visitors stay on the page',
      'LCP is under 2.5 seconds on a mid-range phone',
      'Social proof (reviews, numbers, logos) is real and approved',
      'UTM parameters are preserved through the form',
      'Click and submit events are tracked',
      'Mobile call to action stays reachable while scrolling',
    ]),
  },
  {
    id: 'portfolio',
    label: 'Portfolio website',
    description: 'Adds case study, gallery and contact checks.',
    extras: extras('portfolio', 'EXTRA — Portfolio Website', 'Layers', [
      'Each project has context, role, process and outcome',
      'Gallery images are optimised and have alt text',
      'Lightbox or gallery is keyboard accessible',
      'Project filters work and can be reached by keyboard',
      'Resume or CV download works and is up to date',
      'Contact options work (email, form, profiles)',
      'Open Graph preview looks right when the link is shared',
      'About page and bio are current',
      'Custom domain and HTTPS are active',
    ]),
  },
  {
    id: 'ecommerce',
    label: 'E-commerce website',
    description: 'Adds catalogue, cart, checkout and policy checks.',
    extras: extras('ecommerce', 'EXTRA — E-commerce Website', 'Layers', [
      'Product list and detail pages show correct price, stock and images',
      'Add to cart, remove and quantity changes work',
      'Cart persists across refresh and sessions',
      'Checkout validates addresses, email and phone',
      'Payment gateway tested in test mode, then verified in live mode',
      'Card data is never handled by your own code or servers',
      'Order confirmation page and email work',
      'Out-of-stock and low-stock states are handled',
      'Currency, tax and shipping calculations are correct',
      'Search, filters and sorting work and keep URL state',
      'Product structured data is valid',
      'Returns, shipping and privacy policy pages are published',
    ]),
  },
  {
    id: 'admin',
    label: 'Admin dashboard',
    description: 'Adds roles, tables, CRUD and destructive-action checks.',
    extras: extras('admin', 'EXTRA — Admin Dashboard', 'ShieldCheck', [
      'Roles and permissions are enforced on the server, not only hidden in the UI',
      'Tables support sorting, search and pagination',
      'Create, edit and delete forms validate input',
      'Destructive actions ask for confirmation',
      'Empty, loading and error states exist for every table and chart',
      'Charts have text alternatives or data tables',
      'Bulk actions are tested with large selections',
      'Tables stay usable on small screens (scroll or stacked layout)',
      'Export (CSV or PDF) produces correct data',
      'Session timeout warns the user and protects unsaved work',
      'Important actions are logged for audit',
    ]),
  },
  {
    id: 'exam',
    label: 'Student / exam portal',
    description: 'Adds timer, autosave, result and privacy checks.',
    extras: extras('exam', 'EXTRA — Student / Exam Portal', 'ListChecks', [
      'Timer is accurate, based on server time and survives refresh',
      'Answers autosave and survive refresh or connection loss',
      'Question navigation shows answered, skipped and flagged questions',
      'Double submission is prevented',
      'Submission confirmation is clear and cannot be missed',
      'Results display correctly for each role',
      'Student, teacher and admin roles are separated',
      'Question and option order randomisation works if required',
      'Network interruption is handled with a clear message',
      'Time extensions and accessibility accommodations are supported',
      'Student data is protected, including data about minors',
    ]),
  },
  {
    id: 'api',
    label: 'API-driven application',
    description: 'Adds request handling, caching and error checks.',
    extras: extras('api', 'EXTRA — API-Driven Application', 'Code', [
      'API base URL comes from environment variables',
      'Every request has loading, error and empty states',
      'In-flight requests are cancelled on unmount or new input',
      'Retry with backoff exists for safe, idempotent requests',
      'Pagination or infinite loading is tested at the last page',
      'Caching strategy is decided (none, in-memory or a query library)',
      'Timeouts are handled with a clear message',
      'Server error codes map to human-readable messages',
      'Response shape is validated before use',
      'Rate-limit responses are handled',
      'CORS verified against the deployed origin',
      'A mock API exists for development and tests',
    ]),
  },
  {
    id: 'auth',
    label: 'Authentication-based application',
    description: 'Adds login, session, token and role checks.',
    extras: extras('auth', 'EXTRA — Authentication', 'ShieldCheck', [
      'Register, login and logout flows work',
      'Password rules are shown before the user types',
      'Show or hide password toggle is accessible',
      'Forgot and reset password flows work end to end',
      'Tokens are stored safely (httpOnly cookies preferred over localStorage)',
      'Session expiry and refresh are handled without losing user work',
      'Protected routes redirect and return the user after login',
      'Role-based UI matches server-side permissions',
      'Logout clears all user state and cached data',
      'Failed login messages do not reveal whether an account exists',
      'Rate limiting or lockout messaging is shown',
      'Multi-factor authentication works if required',
    ]),
  },
  {
    id: 'multilingual',
    label: 'Multilingual website',
    description: 'Adds i18n, locale, font and SEO checks.',
    extras: extras('multilingual', 'EXTRA — Multilingual Website', 'Globe', [
      'i18n library chosen and configured',
      'All user-facing strings are externalised',
      'Language switcher is accessible and labelled in each language',
      'Chosen language persists across visits',
      'URL strategy per locale is decided (for example /en/ and /hi/)',
      'The html lang attribute updates with the language',
      'Right-to-left layout works if needed',
      'Dates, numbers and currency use Intl formatting',
      'Fallback language works for missing translations',
      'Layout survives longer translated text',
      'hreflang tags are present',
      'Fonts cover every script used',
      'Translations reviewed by a fluent speaker',
    ]),
  },
];

export const projectTypeIds = projectTypes.map((t) => t.id);

export function getProjectType(id) {
  return projectTypes.find((t) => t.id === id) || projectTypes[0];
}

const cache = new Map();

/** Universal sections followed by the extra sections of the chosen project type. */
export function getSectionsForType(typeId) {
  const type = getProjectType(typeId);
  if (!cache.has(type.id)) cache.set(type.id, [...universalSections, ...type.extras]);
  return cache.get(type.id);
}
