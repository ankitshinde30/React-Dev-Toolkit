/**
 * INDEX.CSS master cheatsheet.
 * Entries are ordered so "Copy all CSS" produces one coherent stylesheet:
 * variables first, then base, layout, components, buttons, hover effects, effects, accessibility.
 * Colors, sizes and breakpoints are starting points. Replace them with your approved design tokens.
 */
const css = String.raw;
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const entries = [];

function add(group, title, what, when, notes, code) {
  entries.push({ id: slug(title), group, title, what, when, notes, code: code.trim() });
}

/* ============================ FOUNDATION ============================ */
const G1 = 'Foundation';

add(G1, 'CSS custom properties (root variables)',
  'Defines every design token once: fonts, colors, spacing, radius, shadows, z-index, transitions and layout sizes.',
  'At the very top of index.css, before any other rule. Every other entry reads these variables.',
  'Replace all values with your Figma tokens. Never hard-code a color or spacing value elsewhere. Add new tokens here first.',
  css`
:root {
  --font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  --color-primary: #2457d6;
  --color-primary-hover: #1c46ad;
  --color-secondary: #0f766e;
  --color-on-primary: #ffffff;
  --color-bg: #ffffff;
  --color-surface: #f5f6f8;
  --color-text: #1b2330;
  --color-muted: #566173;
  --color-border: #d5dae1;
  --color-success: #17803d;
  --color-danger: #b42318;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-pill: 999px;

  --shadow-sm: 0 1px 2px rgb(16 24 40 / 0.06);
  --shadow-md: 0 4px 12px rgb(16 24 40 / 0.1);
  --shadow-lg: 0 12px 32px rgb(16 24 40 / 0.16);

  --z-base: 1;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-navbar: 300;
  --z-overlay: 400;
  --z-modal: 500;
  --z-toast: 600;

  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;

  --navbar-height: 64px;
  --container-max: 1200px;
}
`);

add(G1, 'CSS reset and universal box sizing',
  'Removes browser default margins, makes width calculations predictable and lets form controls inherit your fonts.',
  'First rules after the variables, on every project.',
  'border-box means padding and border are inside the declared width. Do not reset list styles globally; use the role="list" opt-in.',
  css`
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

button,
input,
select,
textarea {
  font: inherit;
  color: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

ul[role='list'],
ol[role='list'] {
  list-style: none;
  padding: 0;
}
`);

add(G1, 'Body and HTML defaults',
  'Sets the page background, text color, line height and font smoothing.',
  'Right after the reset.',
  'The footer entry makes the page at least one screen tall, so no min-height is set on body here.',
  css`
html {
  color-scheme: light;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
`);

add(G1, 'Font family and typography setup',
  'Applies the font stack, base size and consistent heading, paragraph, link and code styles.',
  'Once per project, after you pick fonts from the design.',
  'For web fonts, host woff2 files yourself, load only the weights you use and add font-display: swap. Heading sizes live in the clamp() entry.',
  css`
body {
  font-family: var(--font-sans);
  font-size: 1rem;
}

h1,
h2,
h3,
h4 {
  font-weight: 700;
  letter-spacing: -0.01em;
}

p {
  max-width: 70ch;
}

code,
kbd,
pre {
  font-family: var(--font-mono);
  font-size: 0.9em;
}

strong,
b {
  font-weight: 700;
}
`);

add(G1, 'Primary and secondary colors',
  'Utility classes and default link colors built from the color tokens.',
  'When you need quick color helpers without writing new CSS.',
  'Keep text contrast at or above 4.5:1. Check every foreground and background pair, including hover states.',
  css`
.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-secondary); }
.text-muted { color: var(--color-muted); }
.text-danger { color: var(--color-danger); }

.bg-primary { background: var(--color-primary); color: var(--color-on-primary); }
.bg-secondary { background: var(--color-secondary); color: var(--color-on-primary); }
.bg-surface { background: var(--color-surface); }

a { color: var(--color-primary); }
a:hover { color: var(--color-primary-hover); }
`);

add(G1, 'Global container classes',
  'Centers content, limits its width and gives consistent side padding. Also provides a vertical section rhythm.',
  'Wrap the inner content of every section.',
  'Use .container for content and let sections or backgrounds go full width. The section padding scales with the viewport.',
  css`
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--space-4);
}

.container--narrow { max-width: 720px; }
.container--wide { max-width: 1440px; }

.section {
  padding-block: clamp(2.5rem, 6vw, 5rem);
}

@media (min-width: 768px) {
  .container { padding-inline: var(--space-6); }
}
`);

add(G1, 'Responsive typography with clamp()',
  'Fluid font sizes that grow smoothly between a minimum and a maximum without media queries.',
  'For headings and hero text.',
  'clamp(min, preferred, max). Keep the preferred value in rem plus vw so text still responds to user zoom settings.',
  css`
h1 { font-size: clamp(2rem, 1.4rem + 3vw, 3.5rem); }
h2 { font-size: clamp(1.6rem, 1.2rem + 2vw, 2.5rem); }
h3 { font-size: clamp(1.3rem, 1.1rem + 1vw, 1.75rem); }
h4 { font-size: 1.125rem; }

h1,
h2,
h3,
h4 {
  line-height: 1.2;
  text-wrap: balance;
}

.lead {
  font-size: clamp(1.0625rem, 1rem + 0.5vw, 1.25rem);
  color: var(--color-muted);
}
`);

add(G1, 'Dark mode variables',
  'Overrides the color tokens when the dark theme is active, so components need no changes.',
  'When the design includes a dark theme.',
  'Set document.documentElement.dataset.theme to "dark" or "light" from JavaScript. Initialise it from matchMedia("(prefers-color-scheme: dark)") and save the choice. Check contrast again in dark.',
  css`
:root[data-theme='dark'] {
  color-scheme: dark;
  --color-primary: #7aa2ff;
  --color-primary-hover: #9bb9ff;
  --color-on-primary: #0e131b;
  --color-bg: #0e131b;
  --color-surface: #161d29;
  --color-text: #e6ebf2;
  --color-muted: #9aa6b8;
  --color-border: #2a3445;
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.4);
  --shadow-md: 0 4px 12px rgb(0 0 0 / 0.5);
  --shadow-lg: 0 12px 32px rgb(0 0 0 / 0.6);
}
`);

add(G1, 'Z-index management',
  'Utility classes mapped to the z-index scale so layers never compete with random numbers.',
  'Whenever an element must sit above or below others.',
  'z-index only works on positioned elements (or flex and grid children). A parent with transform, opacity below 1 or filter creates a new stacking context.',
  css`
.z-base { position: relative; z-index: var(--z-base); }
.z-dropdown { z-index: var(--z-dropdown); }
.z-sticky { z-index: var(--z-sticky); }
.z-navbar { z-index: var(--z-navbar); }
.z-overlay { z-index: var(--z-overlay); }
.z-modal { z-index: var(--z-modal); }
.z-toast { z-index: var(--z-toast); }
`);

add(G1, 'Box shadow presets',
  'A small, consistent set of elevation levels.',
  'Cards, dropdowns, modals and sticky bars.',
  'Use shadows to show elevation, not decoration. Dark themes need stronger shadows (see the dark mode entry).',
  css`
.shadow-none { box-shadow: none; }
.shadow-sm { box-shadow: var(--shadow-sm); }
.shadow-md { box-shadow: var(--shadow-md); }
.shadow-lg { box-shadow: var(--shadow-lg); }
.shadow-inset { box-shadow: inset 0 1px 3px rgb(16 24 40 / 0.12); }
`);

add(G1, 'Border-radius presets',
  'Consistent corner rounding from the radius tokens.',
  'Cards, buttons, inputs, avatars and badges.',
  'Round the container and clip children with overflow: hidden when an image must follow the corners.',
  css`
.rounded-none { border-radius: 0; }
.rounded-sm { border-radius: var(--radius-sm); }
.rounded-md { border-radius: var(--radius-md); }
.rounded-lg { border-radius: var(--radius-lg); }
.rounded-pill { border-radius: var(--radius-pill); }
.rounded-circle { border-radius: 50%; }
`);

/* ============================== LAYOUT ============================== */
const G2 = 'Layout';

add(G2, 'Flexbox utilities',
  'Small helpers for rows, columns, alignment, wrapping and gaps.',
  'One-dimensional layouts: toolbars, navbars, button rows, media objects.',
  'Add min-width: 0 to flex children that contain long text, otherwise they refuse to shrink and cause overflow.',
  css`
.flex { display: flex; }
.inline-flex { display: inline-flex; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.flex-1 { flex: 1 1 0%; min-width: 0; }
.shrink-0 { flex-shrink: 0; }
.gap-2 { gap: var(--space-2); }
.gap-4 { gap: var(--space-4); }
.gap-6 { gap: var(--space-6); }
.center { display: grid; place-items: center; }
`);

add(G2, 'CSS Grid utilities',
  'Responsive grids that create as many columns as fit, plus fixed column helpers.',
  'Card lists, galleries, feature sections, dashboards.',
  'min(100%, 260px) stops a column from forcing overflow on very narrow screens.',
  css`
.grid { display: grid; gap: var(--space-4); }

.grid-auto {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
}

.grid-2,
.grid-3,
.grid-4 { grid-template-columns: 1fr; }

@media (min-width: 768px) {
  .grid-2,
  .grid-3,
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 992px) {
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-4 { grid-template-columns: repeat(4, 1fr); }
}

.col-span-full { grid-column: 1 / -1; }
`);

add(G2, 'Responsive breakpoints',
  'The breakpoint scale and helpers that show or hide content by screen size.',
  'Agree on breakpoints before building and use only these values.',
  'CSS variables cannot be used inside media queries, so repeat the numbers. The show/hide helpers assume display: block; adjust for flex or grid items.',
  css`
/*
  Breakpoints (mobile-first, min-width):
  base  : 320px and up
  576px : large phones
  768px : tablets
  992px : small laptops
  1200px: desktops
  1440px: wide desktops
*/

.hide-on-mobile { display: none; }
@media (min-width: 768px) {
  .hide-on-mobile { display: block; }
  .hide-on-tablet-up { display: none; }
}
`);

add(G2, 'Mobile-first media queries',
  'Writes the phone layout as the default and adds complexity only as the screen grows.',
  'For every responsive component.',
  'Use min-width queries. Avoid mixing min-width and max-width for the same component unless you target one range on purpose.',
  css`
.layout {
  display: grid;
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .layout { grid-template-columns: 1fr 1fr; }
}

@media (min-width: 1200px) {
  .layout {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
  }
}
`);

add(G2, 'Tablet-specific styles',
  'Styles that apply only between phone and laptop widths.',
  'When a layout needs a tweak only on tablets, such as hiding a sidebar or tightening spacing.',
  'Use 991.98px as the upper bound so it never overlaps the 992px laptop rules. Test portrait and landscape.',
  css`
@media (min-width: 768px) and (max-width: 991.98px) {
  .page-header {
    padding-block: var(--space-6);
    text-align: center;
  }
}
`);

add(G2, 'Desktop-specific styles',
  'Styles for laptop and desktop screens, including pointer-precision checks.',
  'Sticky sidebars, hover-only enhancements, wider spacing.',
  'Use (hover: hover) and (pointer: fine) to detect mouse users rather than guessing from screen width.',
  css`
@media (min-width: 992px) {
  .page-sidebar {
    position: sticky;
    top: calc(var(--navbar-height) + var(--space-4));
    align-self: start;
  }
}

@media (hover: hover) and (pointer: fine) {
  .desktop-only-hint { display: inline; }
}
`);

add(G2, 'Image responsiveness',
  'Makes images, video and canvas scale down inside their container without distortion.',
  'Global default for all media.',
  'Still add width and height attributes in HTML so the browser can reserve space before the file loads.',
  css`
img,
picture,
video,
canvas {
  display: block;
  max-width: 100%;
  height: auto;
}
`);

add(G2, 'Aspect ratio',
  'Keeps boxes at a fixed ratio so media never causes layout shift.',
  'Thumbnails, video embeds, hero images, cards.',
  'Children that must fill the box need width: 100% and height: 100% with object-fit.',
  css`
.ratio {
  aspect-ratio: var(--ratio, 16 / 9);
  overflow: hidden;
}

.ratio > img,
.ratio > video,
.ratio > iframe {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 0;
}

.ratio-1x1 { --ratio: 1 / 1; }
.ratio-4x3 { --ratio: 4 / 3; }
.ratio-16x9 { --ratio: 16 / 9; }
.ratio-21x9 { --ratio: 21 / 9; }
`);

add(G2, 'Object-fit and object-position',
  'Controls how an image fills its box and which part stays visible when it is cropped.',
  'Cards, avatars, banners, anything with mixed image sizes.',
  'Use object-position to match the focal point from Figma, for example top for portraits.',
  css`
.img-cover { width: 100%; height: 100%; object-fit: cover; object-position: center; }
.img-contain { width: 100%; height: 100%; object-fit: contain; }
.img-top { object-position: top; }
.img-bottom { object-position: bottom; }
.img-focus { object-position: var(--focus-x, 50%) var(--focus-y, 50%); }
`);

add(G2, 'Overflow prevention',
  'Helpers that stop long content from breaking the layout.',
  'Long URLs, user-generated text, tables, code, flex and grid children.',
  'Find the element that overflows (DevTools, outline every element) instead of hiding the symptom on body.',
  css`
.min-w-0 { min-width: 0; }
.break-words { overflow-wrap: anywhere; }
.scroll-x { overflow-x: auto; max-width: 100%; }

.table-wrap {
  overflow-x: auto;
  max-width: 100%;
}

.table-wrap > table {
  min-width: 36rem;
  width: 100%;
}
`);

add(G2, 'Prevent horizontal scrolling',
  'A safety net that clips accidental sideways overflow at page level.',
  'As a last line of defence after fixing the real cause.',
  'overflow-x: clip does not break position: sticky (overflow-x: hidden does). Avoid width: 100vw, because it includes the scrollbar and causes overflow.',
  css`
body {
  overflow-x: clip;
}

.full-bleed {
  width: 100%;
  margin-inline: 0;
}
`);

add(G2, 'Position sticky and fixed',
  'Pins elements to the viewport or to their scroll container.',
  'Sticky headers, table headers, sidebars, cookie bars, bottom action bars.',
  'Sticky fails if an ancestor has overflow other than visible or clip. Fixed bars need bottom padding on mobile for the safe area.',
  css`
.sticky-top {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}

.sticky-below-navbar {
  position: sticky;
  top: var(--navbar-height);
  z-index: var(--z-sticky);
}

.fixed-bottom {
  position: fixed;
  inset: auto 0 0 0;
  z-index: var(--z-sticky);
  padding-bottom: env(safe-area-inset-bottom, 0);
}
`);

add(G2, 'Footer spacing',
  'Keeps the footer at the bottom of short pages and spaces it correctly on phones with a home bar.',
  'Every multi-page site.',
  'The root element must be the flex column. In Vite that is #root. Add the main element id for skip links.',
  css`
#root {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
}

.footer {
  margin-top: auto;
  padding: var(--space-8) 0 calc(var(--space-8) + env(safe-area-inset-bottom, 0px));
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}
`);

add(G2, 'Layout shift prevention',
  'Reserves space for things that load late so the page does not jump.',
  'Images, embeds, web fonts, banners, anything injected after first paint.',
  'Always set width and height on images. Keep the scrollbar gutter stable so centered layouts do not nudge when a scrollbar appears.',
  css`
html {
  scrollbar-gutter: stable;
}

.reserve-hero {
  min-height: 60vh;
}

.reserve-embed {
  aspect-ratio: 16 / 9;
  background: var(--color-surface);
}

@font-face {
  font-family: 'Brand Fallback';
  src: local('Arial');
  size-adjust: 105%;
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
}
`);

add(G2, 'Image lazy-loading guidance',
  'Defers off-screen work so the first screen loads faster.',
  'Long pages with many images or heavy sections.',
  'In HTML: loading="lazy" for below-the-fold images, and never on the hero image (use fetchpriority="high" there). contain-intrinsic-size prevents scroll jumps.',
  css`
.lazy-section {
  content-visibility: auto;
  contain-intrinsic-size: auto 600px;
}

img[loading='lazy'] {
  background: var(--color-surface);
}
`);

add(G2, 'Scroll-snap carousel',
  'A swipeable, keyboard-scrollable row of cards with no JavaScript.',
  'Testimonials, product rows, image strips on mobile.',
  'The scroll container needs tabindex="0" and an accessible label so keyboard users can scroll it.',
  css`
.snap-x {
  display: flex;
  gap: var(--space-4);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
  padding-bottom: var(--space-2);
}

.snap-x > * {
  flex: 0 0 min(85%, 320px);
  scroll-snap-align: start;
}
`);

add(G2, 'Bootstrap conflict prevention',
  'Puts Bootstrap in a lower-priority cascade layer and maps its variables to your tokens.',
  'Only when Bootstrap 5 is used alongside this stylesheet.',
  'Wrap your own rules in @layer app so they always beat Bootstrap, whatever the specificity. Generic names such as .btn, .card, .container and .modal collide with Bootstrap; layers solve that, or prefix yours (.app-btn). Needs npm i bootstrap. Not included in Copy all CSS.',
  css`
@layer bootstrap, app;
@import url('bootstrap/dist/css/bootstrap.min.css') layer(bootstrap);

@layer app {
  :root {
    --bs-body-font-family: var(--font-sans);
    --bs-body-color: var(--color-text);
    --bs-body-bg: var(--color-bg);
    --bs-link-color: var(--color-primary);
    --bs-link-hover-color: var(--color-primary-hover);
    --bs-border-color: var(--color-border);
  }

  /* put the rest of your index.css inside this layer */
}
`);
entries[entries.length - 1].inBundle = false;

/* ============================ NAVIGATION ============================ */
const G3 = 'Navigation and scrolling';

add(G3, 'Navbar and sticky navbar',
  'A fixed-height sticky bar with logo, inline links and an active state that never changes layout.',
  'Top navigation on every page.',
  'The active link keeps a transparent 2px border by default, so activating it does not move anything. NavLink from React Router adds the "active" class and aria-current.',
  css`
.navbar {
  position: sticky;
  top: 0;
  z-index: var(--z-navbar);
  height: var(--navbar-height);
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  height: 100%;
}

.navbar__logo {
  display: block;
  height: 32px;
  width: auto;
  font-weight: 700;
  text-decoration: none;
  color: var(--color-text);
}

.navbar__links {
  display: none;
  gap: var(--space-6);
  list-style: none;
  padding: 0;
}

.navbar__link {
  display: inline-block;
  padding: var(--space-2) 0;
  border-bottom: 2px solid transparent;
  color: var(--color-text);
  font-weight: 600;
  text-decoration: none;
}

.navbar__link.active,
.navbar__link[aria-current='page'] {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

@media (min-width: 992px) {
  .navbar__links { display: flex; }
}
`);

add(G3, 'Fixed navbar spacing',
  'Offsets page content so a position: fixed navbar does not cover it.',
  'Only if the navbar is fixed. A sticky navbar already takes up its own space.',
  'Use one approach, not both. Keep --navbar-height identical to the real navbar height, including its border.',
  css`
.navbar--fixed {
  position: fixed;
  inset: 0 0 auto 0;
}

.has-fixed-navbar {
  padding-top: var(--navbar-height);
}
`);

add(G3, 'Mobile menu',
  'A full-width slide-in menu under the navbar, a hamburger button and a body scroll lock class.',
  'Below the desktop breakpoint.',
  'Closed menus use visibility: hidden so their links cannot be tabbed to. Toggle .is-open and the no-scroll class on body from JavaScript, and remove them in cleanup.',
  css`
.navbar__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.mobile-menu {
  position: fixed;
  inset: var(--navbar-height) 0 0 0;
  z-index: var(--z-overlay);
  padding: var(--space-4);
  overflow-y: auto;
  background: var(--color-bg);
  transform: translateX(100%);
  visibility: hidden;
  transition: transform var(--transition-base), visibility var(--transition-base);
}

.mobile-menu.is-open {
  transform: none;
  visibility: visible;
}

.mobile-menu__list { list-style: none; padding: 0; }

.mobile-menu__link {
  display: block;
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
  font-size: 1.125rem;
  text-decoration: none;
}

.no-scroll { overflow: hidden; }

@media (min-width: 992px) {
  .navbar__toggle,
  .mobile-menu { display: none; }
}
`);

add(G3, 'Smooth scrolling',
  'Animates anchor jumps, but only for people who have not asked for reduced motion.',
  'Sites with in-page links and CTA buttons that scroll to sections.',
  'Wrapping it in no-preference makes it respect the operating system setting automatically.',
  css`
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
`);

add(G3, 'Scroll-margin-top',
  'Leaves room above anchored sections so a sticky or fixed navbar does not cover the heading.',
  'Every element that can be a link target (#id).',
  'Use the navbar height plus a little breathing room. Add the same offset to JavaScript scrolling helpers.',
  css`
section[id],
[data-anchor] {
  scroll-margin-top: calc(var(--navbar-height) + var(--space-4));
}
`);

/* ============================ COMPONENTS ============================ */
const G4 = 'Components';

add(G4, 'Card components',
  'A vertical card with media, body and a footer that sticks to the bottom so cards in a row line up.',
  'Services, products, posts, team members.',
  'Place cards in a grid so they stretch to equal height. margin-top: auto on the footer aligns the buttons.',
  css`
.card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.card__media {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
}

.card__title { font-size: 1.125rem; }

.card__footer {
  margin-top: auto;
  padding: 0 var(--space-4) var(--space-4);
}
`);

add(G4, 'Form input styling',
  'Consistent labels, inputs, selects and textareas with comfortable touch size.',
  'Every form.',
  'Keep font-size at 16px or more so iOS does not zoom on focus. The visible focus ring comes from the global :focus-visible rule.',
  css`
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.field__label {
  font-weight: 600;
  font-size: 0.9375rem;
}

.input,
.select,
.textarea {
  width: 100%;
  min-height: 2.75rem;
  padding: 0.5rem var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  font-size: 1rem;
}

.textarea {
  min-height: 7rem;
  resize: vertical;
}

.input::placeholder,
.textarea::placeholder { color: var(--color-muted); }

.input:focus-visible,
.select:focus-visible,
.textarea:focus-visible { border-color: var(--color-primary); }

.input:disabled,
.select:disabled,
.textarea:disabled {
  background: var(--color-surface);
  cursor: not-allowed;
  opacity: 0.7;
}
`);

add(G4, 'Input validation states',
  'Visual states for invalid and valid fields, plus hint and error text.',
  'Forms with client-side validation.',
  'Do not rely on color alone: pair the red border with an error message linked through aria-describedby and set aria-invalid="true".',
  css`
.input[aria-invalid='true'],
.select[aria-invalid='true'],
.textarea[aria-invalid='true'] {
  border-color: var(--color-danger);
}

.input.is-valid,
.select.is-valid,
.textarea.is-valid {
  border-color: var(--color-success);
}

.field__hint {
  font-size: 0.875rem;
  color: var(--color-muted);
}

.field__error {
  font-size: 0.875rem;
  color: var(--color-danger);
}
`);

add(G4, 'Custom checkbox styling',
  'A styled native checkbox that keeps keyboard support, focus and form behavior.',
  'Checklists, filters, consent boxes.',
  'It uses appearance: none on the real input, so there is no hidden-input trick to break accessibility.',
  css`
.checkbox {
  appearance: none;
  display: inline-grid;
  place-content: center;
  flex: none;
  width: 1.25rem;
  height: 1.25rem;
  margin: 0;
  border: 2px solid var(--color-muted);
  border-radius: var(--radius-sm);
  background: var(--color-bg);
  cursor: pointer;
}

.checkbox::after {
  content: '';
  width: 0.65rem;
  height: 0.65rem;
  background: var(--color-on-primary);
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  transform: scale(0);
  transition: transform var(--transition-fast);
}

.checkbox:checked {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.checkbox:checked::after { transform: scale(1); }

.checkbox:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
`);

add(G4, 'Toggle switch',
  'An on/off switch built from a native checkbox.',
  'Settings and preferences (dark mode, notifications).',
  'Give it role="switch" in HTML and a visible label. Do not use it for actions that need a Save button.',
  css`
.switch {
  appearance: none;
  position: relative;
  flex: none;
  width: 2.75rem;
  height: 1.5rem;
  margin: 0;
  border-radius: var(--radius-pill);
  background: var(--color-muted);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(1.5rem - 4px);
  height: calc(1.5rem - 4px);
  border-radius: 50%;
  background: #ffffff;
  transition: transform var(--transition-fast);
}

.switch:checked { background: var(--color-primary); }
.switch:checked::after { transform: translateX(1.25rem); }
.switch:disabled { opacity: 0.5; cursor: not-allowed; }
`);

add(G4, 'Accordion styling',
  'An animated accordion that needs no fixed heights, using grid rows from 0fr to 1fr.',
  'FAQs, filters, collapsible settings.',
  'Content stays in the DOM, so the closed panel uses visibility: hidden to remove its links from the tab order. Toggle .is-open on the item and set aria-expanded on the button.',
  css`
.accordion__item {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.accordion__item + .accordion__item { margin-top: var(--space-2); }

.accordion__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  width: 100%;
  padding: var(--space-4);
  border: 0;
  background: var(--color-surface);
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}

.accordion__icon { transition: transform var(--transition-base); }
.accordion__item.is-open .accordion__icon { transform: rotate(180deg); }

.accordion__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--transition-base);
}

.accordion__item.is-open .accordion__panel { grid-template-rows: 1fr; }

.accordion__inner {
  min-height: 0;
  overflow: hidden;
  visibility: hidden;
  transition: visibility var(--transition-base);
}

.accordion__item.is-open .accordion__inner { visibility: visible; }
.accordion__content { padding: var(--space-4); }
`);

add(G4, 'Modal and overlay',
  'Styles for a native <dialog> modal, with a div-based overlay as a fallback.',
  'Confirmations, forms in dialogs, image previews.',
  'Native dialog gives focus trapping and Escape for free. Lock page scroll with the no-scroll class while it is open.',
  css`
.modal {
  width: min(560px, calc(100% - 2rem));
  max-height: calc(100dvh - 2rem);
  padding: 0;
  overflow: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  color: var(--color-text);
  box-shadow: var(--shadow-lg);
}

.modal::backdrop { background: rgb(15 23 36 / 0.6); }

.modal__header,
.modal__body,
.modal__footer { padding: var(--space-4) var(--space-6); }

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border);
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  border-top: 1px solid var(--color-border);
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  display: grid;
  place-items: center;
  padding: var(--space-4);
  background: rgb(15 23 36 / 0.6);
}
`);

add(G4, 'Loading spinner',
  'A CSS-only spinner plus a centered loader wrapper.',
  'Buttons, sections and pages that wait for data.',
  'Pair it with role="status" and visually hidden text such as "Loading". The spin keyframes are reused by the loading button.',
  css`
.spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loader {
  display: grid;
  place-items: center;
  gap: var(--space-3);
  padding: var(--space-8);
}

.loader--fullscreen {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  background: var(--color-bg);
}
`);

add(G4, 'Skeleton loading',
  'Gray placeholder shapes with a moving highlight that mimic the content that is loading.',
  'Lists, cards and profiles while data loads.',
  'Match the skeleton size to the final content to avoid layout shift. Mark the container aria-busy="true" while loading.',
  css`
.skeleton {
  border-radius: var(--radius-sm);
  background: linear-gradient(90deg, var(--color-surface) 25%, var(--color-border) 37%, var(--color-surface) 63%);
  background-size: 400% 100%;
  color: transparent;
  animation: skeleton-shimmer 1.4s ease infinite;
}

.skeleton--text { height: 1em; margin-block: 0.5em; }
.skeleton--title { height: 1.6em; width: 60%; }
.skeleton--image { aspect-ratio: 16 / 9; }

@keyframes skeleton-shimmer {
  0% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
}
`);

add(G4, 'Text truncation',
  'Cuts text with an ellipsis on one line or after a set number of lines.',
  'Card titles, table cells, breadcrumbs.',
  'Single-line truncation needs a width limit (a flex child needs min-width: 0). Truncated text must still be available in full somewhere, such as a title attribute or a detail page.',
  css`
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.line-clamp-2,
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 { -webkit-line-clamp: 2; line-clamp: 2; }
.line-clamp-3 { -webkit-line-clamp: 3; line-clamp: 3; }
`);

add(G4, 'Scrollbar styling',
  'Thin, themed scrollbars for panels, code blocks and tables.',
  'Scrollable containers only, never the whole page.',
  'scrollbar-width and scrollbar-color are the standard way. The ::-webkit-scrollbar rules are a fallback for older WebKit and are ignored where the standard properties apply.',
  css`
.scroll-thin {
  scrollbar-width: thin;
  scrollbar-color: var(--color-muted) transparent;
}

.scroll-thin::-webkit-scrollbar { width: 8px; height: 8px; }
.scroll-thin::-webkit-scrollbar-track { background: transparent; }

.scroll-thin::-webkit-scrollbar-thumb {
  background: var(--color-muted);
  border-radius: var(--radius-pill);
}
`);

add(G4, 'Badges and tags',
  'Small labels for status, counts and categories.',
  'Status columns, filters, notification counts.',
  'Status must not depend on color alone. Include text such as "Paid" or "Failed".',
  css`
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 0.125rem var(--space-2);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.5;
}

.badge--primary { background: var(--color-primary); border-color: var(--color-primary); color: var(--color-on-primary); }
.badge--success { color: var(--color-success); border-color: var(--color-success); }
.badge--danger { color: var(--color-danger); border-color: var(--color-danger); }
`);

/* ============================== BUTTONS ============================== */
const G5 = 'Button designs';

add(G5, 'Reusable button styles (base and solid variants)',
  'The base .btn plus solid primary, secondary and danger buttons, with hover, pressed and disabled states.',
  'Start here: every other button entry adds a modifier class to .btn.',
  'Hover is wrapped in (hover: hover) so touch screens do not get stuck hover states. A button with a link needs the same class on the <a>. Minimum height is 44px for touch.',
  css`
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 2.75rem;
  padding: 0.5rem 1.25rem;
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
  cursor: pointer;
  transition: background-color var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast), box-shadow var(--transition-fast), transform var(--transition-fast);
}

.btn:active { transform: translateY(1px); }

.btn:disabled,
.btn[aria-disabled='true'] {
  opacity: 0.55;
  cursor: not-allowed;
  pointer-events: none;
}

.btn--primary { background: var(--color-primary); color: var(--color-on-primary); }
.btn--secondary { background: var(--color-secondary); color: var(--color-on-primary); }
.btn--danger { background: var(--color-danger); color: #ffffff; }

@media (hover: hover) {
  .btn--primary:hover { background: var(--color-primary-hover); color: var(--color-on-primary); }
  .btn--secondary:hover { filter: brightness(0.9); }
  .btn--danger:hover { filter: brightness(0.9); }
}
`);

add(G5, 'Button styles: outline, ghost, soft and link',
  'Lower-emphasis variants: outlined, transparent, tinted and text-only buttons.',
  'Secondary actions next to a primary button, toolbars, cards, "Cancel" buttons.',
  'Use one solid primary button per view and lower-emphasis variants for the rest. The soft variant uses color-mix(), supported in current browsers.',
  css`
.btn--outline {
  background: transparent;
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn--ghost {
  background: transparent;
  color: var(--color-primary);
}

.btn--soft {
  background: color-mix(in srgb, var(--color-primary) 12%, transparent);
  color: var(--color-primary);
}

.btn--link {
  min-height: auto;
  padding: 0;
  border: 0;
  background: none;
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (hover: hover) {
  .btn--outline:hover { background: var(--color-primary); color: var(--color-on-primary); }
  .btn--ghost:hover { background: color-mix(in srgb, var(--color-primary) 12%, transparent); }
  .btn--soft:hover { background: color-mix(in srgb, var(--color-primary) 22%, transparent); }
  .btn--link:hover { color: var(--color-primary-hover); }
}
`);

add(G5, 'Button sizes and full-width',
  'Small, large and block (full width) modifiers.',
  'Dense toolbars (small), hero calls to action (large), mobile forms (block).',
  'Keep small buttons at least 36px high and give them extra spacing so touch targets do not overlap.',
  css`
.btn--sm {
  min-height: 2.25rem;
  padding: 0.25rem 0.875rem;
  font-size: 0.875rem;
}

.btn--lg {
  min-height: 3.25rem;
  padding: 0.75rem 1.75rem;
  font-size: 1.125rem;
}

.btn--block {
  display: flex;
  width: 100%;
}
`);

add(G5, 'Button shapes: pill, square and rounded',
  'Changes only the corner radius.',
  'When the design uses a different button shape on some buttons.',
  'Pick one shape for the whole product unless Figma shows otherwise.',
  css`
.btn--pill { border-radius: var(--radius-pill); }
.btn--rounded { border-radius: var(--radius-lg); }
.btn--square { border-radius: 0; }
`);

add(G5, 'Icon buttons and icon with text',
  'Square icon-only buttons and a layout for icon plus label.',
  'Close buttons, toolbars, menu toggles, social buttons.',
  'Icon-only buttons need an accessible name (aria-label). Keep the icon decorative with aria-hidden="true".',
  css`
.btn--icon {
  width: 2.75rem;
  min-width: 2.75rem;
  padding: 0;
  border-radius: 50%;
}

.btn__icon {
  flex: none;
  width: 1.125em;
  height: 1.125em;
}
`);

add(G5, 'Loading button',
  'Hides the label and shows a spinner inside the button while an action runs.',
  'Submit buttons and any button that triggers an async request.',
  'The button keeps its width because the label stays in the layout (color: transparent). Set disabled and aria-busy="true" in React so it cannot be clicked twice. Uses the spin keyframes from the spinner entry.',
  css`
.btn--loading {
  position: relative;
  color: transparent;
  cursor: progress;
}

.btn--loading:disabled { opacity: 1; }

.btn--loading::after {
  content: '';
  position: absolute;
  width: 1.1em;
  height: 1.1em;
  border: 2px solid var(--btn-spinner, var(--color-on-primary));
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.btn--outline.btn--loading,
.btn--ghost.btn--loading,
.btn--soft.btn--loading { --btn-spinner: var(--color-primary); }
`);

add(G5, '3D press button',
  'A button with a solid lower edge that sinks when pressed.',
  'Playful products, games, kids and education sites.',
  'Set --btn-3d-shadow to a darker shade of the button color. Use together with a solid variant.',
  css`
.btn--3d {
  box-shadow: 0 4px 0 var(--btn-3d-shadow, #16358a);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.btn--3d:active {
  transform: translateY(3px);
  box-shadow: 0 1px 0 var(--btn-3d-shadow, #16358a);
}
`);

add(G5, 'Gradient button',
  'A button with a two-color gradient background.',
  'Only when the approved design includes a gradient.',
  'Never invent gradients that are not in the design system. Check text contrast against both gradient colors.',
  css`
.btn--gradient {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  border-color: transparent;
  color: var(--color-on-primary);
}

@media (hover: hover) {
  .btn--gradient:hover { filter: brightness(1.08); }
}
`);

add(G5, 'Glow button',
  'A soft halo ring that appears around the button on hover and focus.',
  'Main call to action on dark or image backgrounds.',
  'The halo is a box-shadow, so it does not change layout.',
  css`
.btn--glow:focus-visible {
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary) 30%, transparent);
}

@media (hover: hover) {
  .btn--glow:hover {
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary) 30%, transparent);
  }
}
`);

add(G5, 'Shine sweep button',
  'A light streak that sweeps across the button on hover.',
  'A single hero call to action. Do not use on many buttons at once.',
  'Needs overflow: hidden so the streak is clipped. The effect runs only for people with a mouse.',
  css`
.btn--shine {
  position: relative;
  overflow: hidden;
}

.btn--shine::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -75%;
  width: 50%;
  background: linear-gradient(120deg, transparent, rgb(255 255 255 / 0.45), transparent);
  transform: skewX(-20deg);
  pointer-events: none;
}

@media (hover: hover) {
  .btn--shine:hover::before { animation: btn-shine 0.7s ease; }
}

@keyframes btn-shine {
  to { left: 130%; }
}
`);

add(G5, 'Fill-slide button',
  'An outlined button whose background slides in from the left on hover.',
  'Secondary calls to action with a bit of motion.',
  'The fill is a pseudo-element behind the text (z-index: -1 inside an isolated stacking context), so the label stays readable.',
  css`
.btn--fill {
  position: relative;
  z-index: 0;
  overflow: hidden;
  background: transparent;
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn--fill::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--color-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-base);
}

@media (hover: hover) {
  .btn--fill:hover { color: var(--color-on-primary); }
  .btn--fill:hover::before { transform: scaleX(1); }
}
`);

add(G5, 'Arrow-slide button',
  'An arrow that nudges forward on hover.',
  '"Learn more" and "Get started" calls to action.',
  'Put the arrow in <span class="btn__arrow" aria-hidden="true">. It moves with transform, so nothing reflows.',
  css`
.btn__arrow {
  display: inline-block;
  transition: transform var(--transition-fast);
}

@media (hover: hover) {
  .btn:hover .btn__arrow { transform: translateX(4px); }
}
`);

add(G5, 'Button group (segmented)',
  'Joins buttons into one connected control.',
  'View switchers, filters, pagination, alignment tools.',
  'Mark the selected button with aria-pressed="true". Use role="group" and a label on the wrapper.',
  css`
.btn-group {
  display: inline-flex;
}

.btn-group > .btn {
  border-radius: 0;
  border-color: var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
}

.btn-group > .btn + .btn { margin-left: -2px; }
.btn-group > .btn:first-child { border-radius: var(--radius-md) 0 0 var(--radius-md); }
.btn-group > .btn:last-child { border-radius: 0 var(--radius-md) var(--radius-md) 0; }

.btn-group > .btn[aria-pressed='true'] {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-on-primary);
}
`);

add(G5, 'Floating action button',
  'A round button fixed to the corner of the screen.',
  'One primary action on mobile, such as "Chat" or "Add".',
  'Keep it clear of the bottom safe area and cookie bars. It needs an aria-label.',
  css`
.fab {
  position: fixed;
  right: var(--space-4);
  bottom: calc(var(--space-4) + env(safe-area-inset-bottom, 0px));
  z-index: var(--z-sticky);
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border: 0;
  border-radius: 50%;
  background: var(--color-primary);
  color: var(--color-on-primary);
  box-shadow: var(--shadow-lg);
  cursor: pointer;
}
`);

/* ============================ HOVER EFFECTS ============================ */
const G6 = 'Hover effects';

add(G6, 'Touch-safe hover pattern',
  'The rule behind every hover entry: apply hover styles only on devices that can hover, and mirror them for keyboard focus.',
  'For every hover effect you write.',
  'On touch screens a tap "sticks" the hover state. (hover: hover) avoids that. Always give :focus-visible the same treatment as :hover.',
  css`
.hover-target {
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.hover-target:focus-visible {
  background: var(--color-surface);
}

@media (hover: hover) {
  .hover-target:hover { background: var(--color-surface); }
}
`);

add(G6, 'Card lift on hover',
  'Raises the card slightly and deepens its shadow.',
  'Clickable cards.',
  'Only transform and box-shadow change, so surrounding layout never moves. Apply it to cards that are actually links.',
  css`
.hover-lift {
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.hover-lift:focus-within {
  box-shadow: var(--shadow-md);
}

@media (hover: hover) {
  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
}
`);

add(G6, 'Card border highlight on hover',
  'Colors the border and adds a soft ring on hover without shifting layout.',
  'Pricing cards, selectable options.',
  'The border is always 1px, only its color changes. The ring is a box-shadow, which takes no space.',
  css`
.hover-border {
  border: 1px solid var(--color-border);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.hover-border:focus-within { border-color: var(--color-primary); }

@media (hover: hover) {
  .hover-border:hover {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 18%, transparent);
  }
}
`);

add(G6, 'Image zoom on hover',
  'Slowly zooms the image inside a clipped frame.',
  'Galleries, product images, blog thumbnails.',
  'The frame needs overflow: hidden and a fixed ratio, so the zoom never changes the card size.',
  css`
.zoom {
  overflow: hidden;
}

.zoom > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

@media (hover: hover) {
  .zoom:hover > img { transform: scale(1.06); }
}
`);

add(G6, 'Image overlay caption reveal',
  'A caption bar that slides up over an image on hover or focus.',
  'Portfolio tiles, team photos, product cards.',
  'On touch devices the caption is always visible, because there is no hover. The overlay uses a gradient only to keep white text readable.',
  css`
.reveal {
  position: relative;
  overflow: hidden;
}

.reveal__caption {
  position: absolute;
  inset: auto 0 0 0;
  padding: var(--space-4);
  background: linear-gradient(transparent, rgb(0 0 0 / 0.75));
  color: #ffffff;
  transform: translateY(100%);
  transition: transform var(--transition-base);
}

.reveal:focus-within .reveal__caption { transform: none; }

@media (hover: hover) {
  .reveal:hover .reveal__caption { transform: none; }
}

@media (hover: none) {
  .reveal__caption { transform: none; }
}
`);

add(G6, 'Grayscale to color on hover',
  'Shows an image in black and white and restores color on hover.',
  'Client logos, team photos.',
  'On touch devices images stay in color. Do not use it where color carries meaning.',
  css`
@media (hover: hover) {
  .gray-hover {
    filter: grayscale(1);
    transition: filter var(--transition-base);
  }

  .gray-hover:hover { filter: none; }
}
`);

add(G6, 'Link underline slide',
  'An underline that grows from left to right.',
  'Inline links, footer links, article links.',
  'The underline is a background image, so the link does not change height. It also appears on keyboard focus.',
  css`
.link-underline {
  background: linear-gradient(currentcolor, currentcolor) 0 100% / 0 2px no-repeat;
  text-decoration: none;
  transition: background-size var(--transition-base);
}

.link-underline:focus-visible { background-size: 100% 2px; }

@media (hover: hover) {
  .link-underline:hover { background-size: 100% 2px; }
}
`);

add(G6, 'Link underline from center',
  'An underline that expands outward from the middle.',
  'Navigation and footer links.',
  'Use either this or the slide version consistently, not both.',
  css`
.link-underline-center {
  background: linear-gradient(currentcolor, currentcolor) 50% 100% / 0 2px no-repeat;
  text-decoration: none;
  transition: background-size var(--transition-base);
}

.link-underline-center:focus-visible { background-size: 100% 2px; }

@media (hover: hover) {
  .link-underline-center:hover { background-size: 100% 2px; }
}
`);

add(G6, 'Nav link indicator bar',
  'A bar under nav links that animates in on hover and stays visible on the active page.',
  'Main navigation.',
  'The bar is a pseudo-element drawn with transform, so link size never changes between states.',
  css`
.nav-hover {
  position: relative;
  text-decoration: none;
}

.nav-hover::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 2px;
  background: var(--color-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-base);
}

.nav-hover:focus-visible::after,
.nav-hover[aria-current='page']::after { transform: scaleX(1); }

@media (hover: hover) {
  .nav-hover:hover::after { transform: scaleX(1); }
}
`);

add(G6, 'Icon hover effects',
  'Rotate, nudge or scale an icon when its button or link is hovered.',
  'Social icons, expand arrows, settings icons.',
  'Icons are inline-block so transforms work. Pick one motion per icon.',
  css`
.icon-hover {
  display: inline-block;
  transition: transform var(--transition-fast);
}

@media (hover: hover) {
  .icon-hover--rotate:hover { transform: rotate(90deg); }
  .icon-hover--scale:hover { transform: scale(1.15); }
  .icon-hover--nudge:hover { transform: translateX(4px); }
  .icon-hover--lift:hover { transform: translateY(-3px); }
}
`);

add(G6, 'Table row and list item hover',
  'Highlights the row under the pointer.',
  'Data tables, menus, option lists.',
  'Keep the contrast of text on the hover background above 4.5:1.',
  css`
.hover-row {
  transition: background-color var(--transition-fast);
}

.hover-row:focus-within { background: var(--color-surface); }

@media (hover: hover) {
  .hover-row:hover { background: var(--color-surface); }
}
`);

add(G6, '3D tilt on hover',
  'Tilts a card in perspective when hovered.',
  'Feature highlights and portfolio items. Use rarely.',
  'It is purely decorative. Keep content readable in the tilted state and disable it for reduced motion (see that entry).',
  css`
.tilt {
  transition: transform var(--transition-base);
}

@media (hover: hover) {
  .tilt:hover {
    transform: perspective(800px) rotateX(4deg) rotateY(-6deg) scale(1.02);
  }
}
`);

add(G6, 'Dropdown reveal (hover, focus and click)',
  'A dropdown menu that opens on hover for mouse users and on focus or an .is-open class for everyone else.',
  'Navbar and account menus.',
  'Hidden menus use visibility: hidden so links are skipped by keyboards. Toggle .is-open from the button for click and touch support.',
  css`
.dropdown {
  position: relative;
}

.dropdown__menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: var(--z-dropdown);
  min-width: 12rem;
  padding: var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  box-shadow: var(--shadow-md);
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: opacity var(--transition-fast), transform var(--transition-fast), visibility var(--transition-fast);
}

.dropdown:focus-within .dropdown__menu,
.dropdown.is-open .dropdown__menu {
  opacity: 1;
  visibility: visible;
  transform: none;
}

@media (hover: hover) {
  .dropdown:hover .dropdown__menu {
    opacity: 1;
    visibility: visible;
    transform: none;
  }
}
`);

add(G6, 'Cursor and pressed states',
  'Shows a pointer only on clickable things and gives instant press feedback.',
  'Clickable cards, custom controls.',
  'Do not set cursor: pointer on things that are not interactive. Native buttons and links already behave correctly.',
  css`
.is-clickable { cursor: pointer; }

.is-clickable:active {
  transform: scale(0.98);
}

[disabled],
[aria-disabled='true'] { cursor: not-allowed; }
`);

/* ========================= EFFECTS AND ANIMATION ========================= */
const G7 = 'Effects and animation';

add(G7, 'CSS transitions',
  'A utility for smooth changes of specific properties instead of transition: all.',
  'Any element whose color, shadow or position changes on interaction.',
  'List the properties you animate. Prefer transform and opacity because they do not trigger layout. Keep durations between 150ms and 300ms.',
  css`
.transition {
  transition: color var(--transition-base), background-color var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base), transform var(--transition-base), opacity var(--transition-base);
}

.transition-fast {
  transition: color var(--transition-fast), background-color var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast), transform var(--transition-fast), opacity var(--transition-fast);
}
`);

add(G7, 'Fade-in and slide-up on load',
  'Fades content in while it moves up slightly.',
  'One orchestrated entrance such as a hero. Avoid animating every section.',
  'animation-fill-mode: both starts hidden and keeps the end state. Content stays visible without JavaScript because this is pure CSS.',
  css`
.fade-in {
  animation: fade-in 0.5s ease both;
}

.fade-in-delay-1 { animation-delay: 0.1s; }
.fade-in-delay-2 { animation-delay: 0.2s; }
.fade-in-delay-3 { animation-delay: 0.3s; }

@keyframes fade-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}
`);

add(G7, 'Scroll-reveal with scroll-driven animation',
  'Reveals elements as they scroll into view using CSS only, with no JavaScript library.',
  'Replacing AOS-style libraries on modern browsers.',
  'It sits inside @supports, so unsupported browsers simply show the content normally. This is the visibility fallback.',
  css`
@keyframes reveal-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
}

@supports (animation-timeline: view()) {
  .scroll-reveal {
    animation: reveal-up linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
  }
}
`);

add(G7, 'Pulse attention ring',
  'A repeating ring that draws the eye to one element.',
  'A new feature badge or a live indicator. Use sparingly.',
  'Never pulse more than one element on screen, and stop it after interaction.',
  css`
.pulse {
  animation: pulse 2s ease-out infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-primary) 45%, transparent); }
  70% { box-shadow: 0 0 0 12px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}
`);

add(G7, 'Shake for form errors',
  'A short horizontal shake that signals an invalid input.',
  'A failed submit or a wrong password.',
  'Add the class when the error appears and remove it when the animation ends so it can retrigger. Also show an error message in text.',
  css`
.shake {
  animation: shake 0.4s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}
`);

add(G7, 'Float and bounce',
  'A gentle up-and-down motion for decorative elements.',
  'Illustrations and scroll-down arrows.',
  'Decorative only. The reduced motion entry turns it off.',
  css`
.float {
  animation: float 3s ease-in-out infinite;
}

.bounce {
  animation: bounce 1.2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
`);

add(G7, 'Marquee ticker',
  'A horizontally scrolling strip that pauses on hover and focus.',
  'Logo walls and announcements.',
  'Duplicate the items once inside the track so the loop is seamless. Provide a way to pause it for accessibility (the hover and focus pause helps, a button is better).',
  css`
.marquee {
  overflow: hidden;
}

.marquee__track {
  display: flex;
  gap: var(--space-8);
  width: max-content;
  animation: marquee 25s linear infinite;
}

.marquee:hover .marquee__track,
.marquee:focus-within .marquee__track {
  animation-play-state: paused;
}

@keyframes marquee {
  to { transform: translateX(-50%); }
}
`);

add(G7, 'Typing text with blinking caret',
  'Types out a line of text one character at a time.',
  'A single hero tagline.',
  'Set the width in ch to the number of characters and use the same number in steps(). Screen readers read the full text normally.',
  css`
.typing {
  display: inline-block;
  max-width: 100%;
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid currentcolor;
  animation: typing 2.5s steps(24, end) forwards, caret 0.8s step-end infinite;
}

@keyframes typing {
  to { width: 24ch; }
}

@keyframes caret {
  50% { border-color: transparent; }
}
`);

add(G7, 'Glassmorphism panel',
  'A translucent, blurred panel over an image or colored background.',
  'Floating cards and navbars over hero images.',
  'Needs something behind it to blur. Text contrast must still pass. The @supports block gives older browsers a solid background.',
  css`
.glass {
  background: rgb(255 255 255 / 0.6);
  border: 1px solid rgb(255 255 255 / 0.4);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  backdrop-filter: blur(12px) saturate(140%);
}

@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass { background: var(--color-bg); }
}
`);

add(G7, 'Gradient text',
  'Fills heading text with a gradient.',
  'Only when the design shows gradient text.',
  'Check the contrast at both ends of the gradient. Not for body text.',
  css`
.text-gradient {
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
`);

add(G7, 'Gradient border',
  'A gradient outline on a rounded box without extra markup.',
  'Highlighted pricing cards or featured items, if the design has them.',
  'The background trick paints a solid fill inside the padding box and the gradient only in the border box.',
  css`
.gradient-border {
  border: 2px solid transparent;
  border-radius: var(--radius-lg);
  background:
    linear-gradient(var(--color-bg), var(--color-bg)) padding-box,
    linear-gradient(135deg, var(--color-primary), var(--color-secondary)) border-box;
}
`);

add(G7, 'CSS-only tooltip',
  'A small label that appears above an element on hover and keyboard focus.',
  'Short hints on icons and abbreviations.',
  'Pseudo-element text is not reliably read by screen readers, so also add aria-label or aria-describedby. The element must be focusable (button or link).',
  css`
[data-tooltip] {
  position: relative;
}

[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  z-index: var(--z-dropdown);
  padding: 0.35rem 0.6rem;
  border-radius: var(--radius-sm);
  background: var(--color-text);
  color: var(--color-bg);
  font-size: 0.8125rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translateX(-50%);
  transition: opacity var(--transition-fast);
}

[data-tooltip]:focus-visible::after { opacity: 1; }

@media (hover: hover) {
  [data-tooltip]:hover::after { opacity: 1; }
}
`);

/* ====================== ACCESSIBILITY AND PRINT ====================== */
const G8 = 'Accessibility, motion and print';

add(G8, 'Accessibility focus styles',
  'A clear focus ring for keyboard users, a skip link and a visually hidden helper class.',
  'Every project, in the first stylesheet pass.',
  'Never remove outlines without a replacement. :focus-visible shows the ring for keyboard focus and not for mouse clicks. Make sure overflow: hidden does not clip the ring.',
  css`
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

.skip-link {
  position: absolute;
  top: -100px;
  left: var(--space-4);
  z-index: var(--z-toast);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: var(--color-on-primary);
}

.skip-link:focus { top: var(--space-2); }

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
`);

add(G8, 'Reduced motion media query',
  'Shortens or removes animations and transitions for people who ask their device for less motion.',
  'Always include it, once, at the end of index.css.',
  'This is the one place where !important is accepted, because it must beat every component animation. Essential feedback (focus, state changes) still happens because durations are near zero, not disabled.',
  css`
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`);

add(G8, 'Print styles',
  'Hides navigation and controls, uses black on white and prints link addresses.',
  'Documents, invoices, articles, receipts.',
  'Test with the browser print preview. Avoid page breaks inside cards and images.',
  css`
@media print {
  .navbar,
  .footer,
  .mobile-menu,
  .fab,
  .no-print { display: none; }

  body {
    background: #ffffff;
    color: #000000;
  }

  a[href^='http']::after {
    content: ' (' attr(href) ')';
    font-size: 0.8em;
  }

  img,
  .card { break-inside: avoid; }
}
`);

export const cssCheatsheet = entries;

/** One stylesheet from the cheatsheet. Entries marked inBundle: false (Bootstrap layers) are left out. */
export function buildCssBundle(list = entries) {
  return (
    '/* index.css — generated from the React Dev Toolkit cheatsheet. Replace the token values with your design tokens. */\n\n' +
    list
      .filter((entry) => entry.inBundle !== false)
      .map((entry) => '/* ' + entry.title + ' */\n' + entry.code)
      .join('\n\n') +
    '\n'
  );
}
