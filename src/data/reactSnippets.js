/**
 * Reusable React snippets. Written for React 18, Vite and react-router-dom 6.
 * The code shown on screen is imported from the real files in src/live (using Vite's ?raw),
 * so the preview you run and the code you copy are always the same.
 */
import src1 from '../live/components/Navbar.jsx?raw';
import src2 from '../live/hooks/useMobileMenu.js?raw';
import src3 from '../live/main.jsx?raw';
import src4 from '../live/App.jsx?raw';
import src5 from '../live/pages/NotFound.jsx?raw';
import src6 from '../live/components/ScrollToTop.jsx?raw';
import src7 from '../live/utils/scrollToSection.js?raw';
import src8 from '../live/components/Button.jsx?raw';
import src9 from '../live/components/Card.jsx?raw';
import src10 from '../live/components/Modal.jsx?raw';
import src11 from '../live/components/Accordion.jsx?raw';
import src12 from '../live/components/Loader.jsx?raw';
import src13 from '../live/components/Footer.jsx?raw';
import src14 from '../live/components/FormField.jsx?raw';
import src15 from '../live/components/ContactForm.jsx?raw';
import src16 from '../live/hooks/useFetch.js?raw';
import src17 from '../live/components/UserList.jsx?raw';
import src18 from '../live/components/ProtectedRoute.jsx?raw';
import src19 from '../live/components/ErrorBoundary.jsx?raw';
import src20 from '../live/LazyApp.jsx?raw';

const entries = [];

function add(group, title, fileName, requires, what, when, notes, code) {
  entries.push({
    id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    group,
    title,
    fileName,
    requires,
    what,
    when,
    notes,
    code,
  });
}

const files = (list) =>
  list.map(([path, source]) => '// ---------- ' + path + ' ----------\n' + source.trim() + '\n').join('\n');

add("Navigation and routing",
  "Reusable Navbar component",
  "src/components/Navbar.jsx",
  "npm i react-router-dom lucide-react",
  "A navbar with a logo, desktop links, a hamburger that opens a mobile menu, and active-route styling from NavLink.",
  "Top of every page layout.",
  "Needs the navbar, mobile menu and skip-link CSS from the cheatsheet and the useMobileMenu hook below. Edit the links array for your routes.",
  src1.trim());

add("Navigation and routing",
  "Responsive mobile menu hook (scroll lock and cleanup)",
  "src/hooks/useMobileMenu.js",
  "npm i react-router-dom",
  "Opens and closes a mobile menu, locks body scroll while it is open, closes on Escape, outside click, route change and resize to desktop, and removes every listener on cleanup.",
  "Any menu, drawer or sheet that covers the page.",
  "The menu panel must be inside the element you pass as rootRef, otherwise clicks inside it count as outside clicks. It reads ownerDocument and composedPath, so it also works inside iframes, portals and shadow DOM. For a smaller drawer, add a backdrop element that calls close.",
  src2.trim());

add("Navigation and routing",
  "React Router setup",
  "src/main.jsx and src/App.jsx",
  "npm i react-router-dom",
  "Mounts BrowserRouter and defines the routes inside one shared layout (navbar, main, footer) with a catch-all 404 route.",
  "The starting point of any multi-page React app.",
  "Hosting must rewrite unknown paths to index.html (SPA fallback), otherwise refreshing a nested route returns a server 404. Create the page components yourself.",
  files([["src/main.jsx", src3], ["src/App.jsx", src4]]));

add("Navigation and routing",
  "404 page",
  "src/pages/NotFound.jsx",
  "npm i react-router-dom",
  "A helpful not-found page with the correct document title and a link back home.",
  "The catch-all route (path=\"*\").",
  "A client-side 404 still returns HTTP 200 from the server. For SEO on a static host, also configure a real 404 page or noindex this route.",
  src5.trim());

add("Navigation and routing",
  "ScrollToTop component",
  "src/components/ScrollToTop.jsx",
  "npm i react-router-dom",
  "Scrolls to the top on every route change, or to the element named in the URL hash when there is one.",
  "Inside the layout, next to the Routes.",
  "It renders nothing. Scrolling is instant on purpose, because a smooth scroll across a new page feels slow. For content that loads after render, call scrollToSection again when the data arrives.",
  src6.trim());

add("Navigation and routing",
  "Scroll to section utility",
  "src/utils/scrollToSection.js",
  "No dependencies",
  "Scrolls smoothly to an element by id, subtracts a fixed navbar offset, respects reduced motion and moves keyboard focus to the section.",
  "CTA buttons and in-page links on a single page.",
  "The CSS scroll-margin-top rule handles hash links; this helper handles button clicks. Returns false if the id does not exist so you can show a fallback.",
  src7.trim());

add("UI components",
  "Reusable Button",
  "src/components/Button.jsx",
  "No dependencies",
  "One button component with variant, size, loading, block and icon props that maps to the .btn classes.",
  "Every button in the app, so styles and behavior stay consistent.",
  "Defaults to type=\"button\" so it never submits a form by accident. While loading it is disabled and sets aria-busy. Extra props such as onClick and aria-label are passed through.",
  src8.trim());

add("UI components",
  "Reusable Card",
  "src/components/Card.jsx",
  "No dependencies",
  "A card with optional image, title, body and footer, using the .card classes and a configurable heading level.",
  "Service, product, blog and team grids.",
  "headingLevel keeps the heading order correct on each page. The image always gets width and height to prevent layout shift; change them to match your design.",
  src9.trim());

add("UI components",
  "Reusable Modal with focus handling",
  "src/components/Modal.jsx",
  "npm i lucide-react",
  "A modal built on the native dialog element: focus is trapped inside, Escape closes it, clicking the backdrop closes it, focus returns to the button that opened it, and page scroll is locked.",
  "Confirmations, small forms and previews.",
  "Render content only while open so it resets each time. Pair with the modal CSS from the cheatsheet. Always provide a visible way to close.",
  src10.trim());

add("UI components",
  "Reusable Accordion",
  "src/components/Accordion.jsx",
  "npm i lucide-react",
  "An accessible accordion driven by an items array, with single or multiple open panels, aria-expanded and aria-controls wired up.",
  "FAQs, filters, collapsible content.",
  "Uses the accordion CSS from the cheatsheet. Panels stay in the DOM and are hidden with CSS so the open and close animation works. Set allowMultiple to keep several open.",
  src11.trim());

add("UI components",
  "Reusable Loader",
  "src/components/Loader.jsx",
  "No dependencies",
  "A spinner with an announced label for screen readers, optionally covering the whole screen.",
  "Lazy-loaded routes and any data fetch.",
  "role=\"status\" makes assistive tech announce the label. Uses the spinner and visually-hidden CSS.",
  src12.trim());

add("UI components",
  "Reusable Footer",
  "src/components/Footer.jsx",
  "npm i react-router-dom",
  "A semantic footer with a navigation landmark, a legal link row and an automatic copyright year.",
  "The bottom of every layout.",
  "Needs the footer spacing CSS so it sits at the bottom of short pages. Replace the links and company name.",
  src13.trim());

add("Forms and data",
  "Reusable FormField",
  "src/components/FormField.jsx",
  "No dependencies",
  "A label, control, hint and error message that are linked with ids, so errors are announced and the field is marked invalid.",
  "Every input, textarea and select.",
  "Pass as=\"textarea\" or as=\"select\" for other controls. Pass the error only when you want it shown. Uses the form CSS (.field, .input, .field__error).",
  src14.trim());

add("Forms and data",
  "Form validation example (contact form)",
  "src/components/ContactForm.jsx",
  "FormField and Button snippets, plus VITE_API_URL in .env",
  "A controlled form with required, email and phone validation, errors shown after a field is touched, a honeypot spam trap, and idle, loading, success and error states.",
  "Contact, quote and sign-up forms.",
  "Client validation is for convenience only. The server must validate again. The form uses noValidate so your own messages replace the browser bubbles. The honeypot field is hidden from people and screen readers; bots tend to fill it.",
  src15.trim());

add("Forms and data",
  "API fetching with loading and error states",
  "src/hooks/useFetch.js",
  "Loader snippet for the usage example",
  "A small data-fetching hook that cancels outdated requests, exposes data, loading and error, and can refetch. The usage example shows loading, error, empty and success rendering.",
  "Simple GET requests. For caching, retries and many queries, consider TanStack Query.",
  "AbortController prevents state updates after unmount and stops a slow old request from overwriting a newer one. Pass a stable url string, never a new object on every render.",
  files([["src/hooks/useFetch.js", src16], ["src/components/UserList.jsx", src17]]));

add("App structure",
  "Protected route example",
  "src/components/ProtectedRoute.jsx",
  "npm i react-router-dom",
  "Redirects visitors who are not signed in to the login page and remembers where they were going so you can send them back after login.",
  "Dashboards, account pages and any private area.",
  "This only controls what the interface shows. Real protection must happen on the server, because anyone can read client code. Pass isAuthenticated from your auth state.",
  src18.trim());

add("App structure",
  "Error boundary",
  "src/components/ErrorBoundary.jsx",
  "No dependencies",
  "Catches rendering errors in its children and shows a fallback instead of a blank screen, with a button to try again.",
  "Around the whole app and around risky widgets such as charts or third-party embeds.",
  "Error boundaries must be class components; React has no hook version. Errors in event handlers and async code are not caught, so handle those yourself. Send the error to your logging service in componentDidCatch.",
  src19.trim());

add("App structure",
  "Lazy-loaded route example",
  "src/App.jsx (lazy routes)",
  "npm i react-router-dom and the Loader snippet",
  "Loads each page only when its route is visited, with a loader shown while the code downloads.",
  "Any app with more than a couple of heavy pages, to shrink the first bundle.",
  "Pages must use export default. Wrap all lazy routes in one Suspense, placed around the Outlet or Routes. Check the build output to confirm separate chunks were created.",
  src20.trim());

export const reactSnippets = entries;

export function buildSnippetBundle(list = entries) {
  return (
    list
      .map(
        (entry) =>
          '// ==========================================================\n' +
          '// ' + entry.title + '  (' + entry.fileName + ')\n' +
          '// Requires: ' + entry.requires + '\n' +
          '// ==========================================================\n' +
          entry.code
      )
      .join('\n\n\n') + '\n'
  );
}
