import { cssCheatsheet } from './cssCheatsheet.js';

/**
 * Live preview definitions for cheatsheet entries, keyed by entry title.
 * Each preview runs in its own iframe with: base tokens + the entry's CSS (+ any `needs`) + this markup.
 */
const BASE = [
  'CSS custom properties (root variables)',
  'CSS reset and universal box sizing',
  'Body and HTML defaults',
  'Font family and typography setup',
  'Image responsiveness',
  'Accessibility focus styles',
];

const codeByTitle = new Map(cssCheatsheet.map((e) => [e.title, e.code]));

const IMG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 360'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23a5c4ff'/><stop offset='1' stop-color='%23e6f0ff'/></linearGradient></defs><rect width='640' height='360' fill='url(%23g)'/><circle cx='500' cy='90' r='42' fill='%23ffd166'/><path d='M0 360V250l120-80 110 70 130-110 150 120 130-60v170z' fill='%232457d6'/><path d='M0 360V300l160-60 170 50 160-40 150 50v60z' fill='%230f766e'/></svg>";
const CHEVRON =
  '<svg class="accordion__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
const STAR =
  '<svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>';
const GEAR =
  '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/></svg>';
const LOREM = 'Responsive layouts adapt to the space they are given, so long text should wrap or be clipped on purpose rather than overflow its container.';

const BTN = 'Reusable button styles (base and solid variants)';
const SPIN = 'Loading spinner';
const FORM = 'Form input styling';
const NAV = 'Navbar and sticky navbar';
const GRID = 'CSS Grid utilities';
const HOVER = 'Hover or focus the elements with a mouse or keyboard.';

const previews = {};
const p = (title, spec) => {
  previews[title] = spec;
};
const sw = (name, label) => '<div class="pv-sw" style="background:var(--color-' + name + ')">' + (label || name) + '</div>';

/* ---------------- Foundation ---------------- */
p('CSS custom properties (root variables)', {
  height: 230,
  html:
    '<p class="pv-note">Color tokens</p><div class="pv-row">' + sw('primary') + sw('secondary') + sw('danger') + sw('success') + sw('text') + sw('muted') + '</div>' +
    '<p class="pv-note" style="margin-top:14px">Shadow and radius tokens</p><div class="pv-row">' +
    '<div class="pv-box" style="box-shadow:var(--shadow-sm)">shadow-sm</div><div class="pv-box" style="box-shadow:var(--shadow-md)">shadow-md</div>' +
    '<div class="pv-box" style="box-shadow:var(--shadow-lg);border-radius:var(--radius-lg)">shadow-lg + radius-lg</div>' +
    '<div class="pv-box" style="border-radius:var(--radius-pill)">radius-pill</div></div>',
});
p('Font family and typography setup', {
  height: 300,
  html: '<h1>Heading one</h1><h2>Heading two</h2><h3>Heading three</h3><p>Body text uses the system font stack at 1rem. Links look <a href="#">like this</a>, and inline code looks like <code>.this-class</code>.</p><p><strong>Bold text</strong> and <kbd>Ctrl</kbd> + <kbd>C</kbd> keys.</p>',
});
p('Primary and secondary colors', {
  height: 190,
  html: '<div class="pv-col"><div class="bg-primary pv-box">.bg-primary</div><div class="bg-secondary pv-box">.bg-secondary</div><div class="bg-surface pv-box">.bg-surface</div><p><span class="text-primary">.text-primary</span> · <span class="text-secondary">.text-secondary</span> · <span class="text-muted">.text-muted</span> · <span class="text-danger">.text-danger</span> · <a href="#">default link</a></p></div>',
});
p('Global container classes', {
  height: 230,
  responsive: true,
  html: '<div class="container" style="background:var(--color-surface);outline:1px dashed var(--color-primary)"><p>.container: centered, max-width, side padding</p></div><br><div class="container container--narrow" style="background:var(--color-surface);outline:1px dashed var(--color-secondary)"><p>.container--narrow: 720px max</p></div><div class="section" style="padding-block:0"><p class="pv-note">.section adds vertical rhythm</p></div>',
});
p('Responsive typography with clamp()', {
  height: 260,
  responsive: true,
  hint: 'Switch the width to see the headings scale.',
  html: '<h1>Heading 1 scales</h1><h2>Heading 2 scales</h2><h3>Heading 3 scales</h3><p class="lead">The lead paragraph also scales smoothly without media queries.</p>',
});
p('Dark mode variables', {
  height: 190,
  htmlAttrs: "data-theme='dark'",
  html: '<div class="pv-box" style="box-shadow:var(--shadow-md)"><h3>Dark theme card</h3><p class="text-muted">Only the tokens changed. No component CSS was touched.</p><a href="#">A link</a></div>',
});
p('Z-index management', {
  height: 170,
  html: '<div style="position:relative;height:120px"><div class="pv-box z-dropdown" style="position:absolute;left:10px;top:10px;width:170px">.z-dropdown (100)</div><div class="pv-box z-modal" style="position:absolute;left:90px;top:44px;width:170px;background:var(--color-surface)">.z-modal (500) on top</div></div>',
});
p('Box shadow presets', {
  height: 150,
  html: '<div class="pv-row" style="gap:20px"><div class="pv-box shadow-none">none</div><div class="pv-box shadow-sm">sm</div><div class="pv-box shadow-md">md</div><div class="pv-box shadow-lg">lg</div><div class="pv-box shadow-inset">inset</div></div>',
});
p('Border-radius presets', {
  height: 150,
  html: '<div class="pv-row" style="gap:16px">' + ['none', 'sm', 'md', 'lg', 'pill', 'circle'].map((r) => '<div class="rounded-' + r + '" style="width:72px;height:72px;display:grid;place-items:center;background:var(--color-primary);color:#fff;font-size:12px">' + r + '</div>').join('') + '</div>',
});

/* ---------------- Layout ---------------- */
p('Flexbox utilities', {
  height: 190,
  html: '<div class="pv-col"><div class="flex items-center justify-between gap-4"><div class="pv-box">between</div><div class="pv-box">items</div><div class="pv-box">center</div></div><div class="flex flex-wrap gap-2"><span class="pv-box">wrap</span><span class="pv-box">wrap</span><span class="pv-box">wrap</span><span class="pv-box">wrap</span></div><div class="center pv-box" style="height:70px">.center</div></div>',
});
p('CSS Grid utilities', {
  height: 260,
  responsive: true,
  html: '<p class="pv-note">.grid .grid-auto</p><div class="grid grid-auto">' + [1, 2, 3, 4, 5, 6].map((n) => '<div class="pv-box">Item ' + n + '</div>').join('') + '</div><p class="pv-note" style="margin-top:14px">.grid .grid-3</p><div class="grid grid-3">' + [1, 2, 3].map((n) => '<div class="pv-box">Col ' + n + '</div>').join('') + '</div>',
});
p('Responsive breakpoints', {
  height: 150,
  responsive: true,
  hint: 'Tablet and Desktop widths show the other message.',
  html: '<p class="hide-on-mobile pv-box">Visible from 768px up (.hide-on-mobile)</p><p class="hide-on-tablet-up pv-box">Visible below 768px (.hide-on-tablet-up)</p>',
});
p('Mobile-first media queries', {
  height: 220,
  responsive: true,
  html: '<div class="layout">' + [1, 2, 3, 4, 5, 6].map((n) => '<div class="pv-box">Box ' + n + '</div>').join('') + '</div>',
});
p('Tablet-specific styles', {
  height: 160,
  responsive: true,
  hint: 'Choose Tablet to see the centered header.',
  html: '<div class="page-header pv-box"><h2>Page header</h2><p>Centered with extra padding only between 768px and 991px.</p></div>',
});
p('Image responsiveness', {
  height: 280,
  responsive: true,
  html: '<img src="' + IMG + '" width="640" height="360" alt="Placeholder landscape">',
});
p('Aspect ratio', {
  height: 220,
  html: '<div class="pv-row" style="align-items:flex-start">' + [['1x1', 110], ['4x3', 130], ['16x9', 170], ['21x9', 210]].map(([r, w]) => '<div><div class="ratio ratio-' + r + '" style="width:' + w + 'px"><img src="' + IMG + '" alt=""></div><p class="pv-note">' + r + '</p></div>').join('') + '</div>',
});
p('Object-fit and object-position', {
  height: 220,
  html: '<div class="pv-row" style="align-items:flex-start">' + [['img-cover', 'cover'], ['img-contain', 'contain'], ['img-cover img-top', 'cover + top']].map(([c, l]) => '<div><div style="width:140px;height:140px;border:1px solid var(--color-border);background:var(--color-surface)"><img class="' + c + '" src="' + IMG + '" alt=""></div><p class="pv-note">' + l + '</p></div>').join('') + '</div>',
});
p('Overflow prevention', {
  height: 200,
  html: '<p class="pv-note">Wide table scrolls inside .table-wrap instead of stretching the page</p><div class="table-wrap" style="max-width:260px;border:1px solid var(--color-border)"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>City</th></tr></thead><tbody><tr><td>Asha</td><td>asha@example.com</td><td>Admin</td><td>Mumbai</td></tr></tbody></table></div><p class="break-words pv-box" style="max-width:260px;margin-top:12px">https://example.com/a/very/long/url/that/would/normally/overflow/its/box</p>',
});
p('Position sticky and fixed', {
  height: 190,
  hint: 'Scroll inside the box.',
  html: '<div style="height:150px;overflow:auto;border:1px solid var(--color-border)"><div class="sticky-top" style="background:var(--color-primary);color:#fff;padding:8px 12px">Sticky header</div>' + [1, 2, 3, 4, 5, 6, 7, 8].map((n) => '<p style="padding:6px 12px">Scrolling content line ' + n + '</p>').join('') + '</div>',
});
p('Scroll-snap carousel', {
  height: 170,
  hint: 'Swipe, drag or scroll sideways.',
  html: '<div class="snap-x scroll-thin" tabindex="0" aria-label="Example carousel">' + [1, 2, 3, 4, 5].map((n) => '<div class="pv-box" style="min-height:90px">Slide ' + n + '</div>').join('') + '</div>',
});

/* ---------------- Navigation ---------------- */
const links = '<li><a class="navbar__link active" href="#">Home</a></li><li><a class="navbar__link" href="#">About</a></li><li><a class="navbar__link" href="#">Pricing</a></li><li><a class="navbar__link" href="#">Contact</a></li>';
p(NAV, {
  height: 200,
  responsive: true,
  hint: 'Links appear at 992px and wider (choose Desktop).',
  html: '<header class="navbar"><div class="container navbar__inner"><a class="navbar__logo" href="#" style="line-height:32px">Brand</a><ul class="navbar__links" role="list">' + links + '</ul></div></header><div class="container section"><p>Page content under a sticky navbar. The active link never changes the navbar height.</p></div>',
});
p('Mobile menu', {
  height: 360,
  responsive: true,
  hint: 'Use the hamburger button. Mobile width is best.',
  needs: [NAV, BTN],
  html: '<header class="navbar"><div class="container navbar__inner"><a class="navbar__logo" href="#" style="line-height:32px">Brand</a><button type="button" class="navbar__toggle" aria-label="Menu" aria-expanded="false" data-toggle="query:.mobile-menu"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button></div><nav class="mobile-menu" aria-label="Mobile"><ul class="mobile-menu__list" role="list"><li><a class="mobile-menu__link" href="#">Home</a></li><li><a class="mobile-menu__link" href="#">About</a></li><li><a class="mobile-menu__link" href="#">Contact</a></li></ul></nav></header><div class="container section"><p>Page content</p></div>',
});

/* ---------------- Components ---------------- */
const card = (t) => '<article class="card" style="width:230px"><img class="card__media" src="' + IMG + '" alt="" width="640" height="360"><div class="card__body"><h3 class="card__title">' + t + '</h3><p>Short supporting text for the card.</p></div><div class="card__footer"><a class="btn btn--primary btn--sm" href="#">Read more</a></div></article>';
p('Card components', {
  height: 360,
  needs: [BTN],
  html: '<div class="pv-row" style="align-items:stretch">' + card('Card one') + card('A longer card title that wraps') + '</div>',
});
p(FORM, {
  height: 300,
  html: '<div class="pv-col" style="max-width:360px"><div class="field"><label class="field__label" for="a">Name</label><input id="a" class="input" placeholder="Your name"></div><div class="field"><label class="field__label" for="b">Topic</label><select id="b" class="select"><option>General</option><option>Support</option></select></div><div class="field"><label class="field__label" for="c">Message</label><textarea id="c" class="textarea" placeholder="Write here"></textarea></div><div class="field"><label class="field__label" for="d">Disabled</label><input id="d" class="input" value="Cannot edit" disabled></div></div>',
});
p('Input validation states', {
  height: 280,
  needs: [FORM],
  html: '<div class="pv-col" style="max-width:360px"><div class="field"><label class="field__label" for="e">Email (invalid)</label><input id="e" class="input" value="name@" aria-invalid="true" aria-describedby="e-err"><p id="e-err" class="field__error">Enter a valid email, like name@example.com.</p></div><div class="field"><label class="field__label" for="f">Username (valid)</label><input id="f" class="input is-valid" value="ada_lovelace"></div><div class="field"><label class="field__label" for="g">Password</label><input id="g" class="input" type="password" aria-describedby="g-hint"><p id="g-hint" class="field__hint">At least 8 characters.</p></div></div>',
});
p('Custom checkbox styling', {
  height: 140,
  html: '<div class="pv-col"><label class="pv-row"><input type="checkbox" class="checkbox"> Unchecked (click me)</label><label class="pv-row"><input type="checkbox" class="checkbox" checked> Checked</label><label class="pv-row"><input type="checkbox" class="checkbox" disabled> Disabled</label></div>',
});
p('Toggle switch', {
  height: 140,
  html: '<div class="pv-col"><label class="pv-row"><input type="checkbox" class="switch" role="switch"> Off (click me)</label><label class="pv-row"><input type="checkbox" class="switch" role="switch" checked> On</label><label class="pv-row"><input type="checkbox" class="switch" role="switch" disabled> Disabled</label></div>',
});
const acc = (t, open) => '<div class="accordion__item' + (open ? ' is-open' : '') + '"><h3><button type="button" class="accordion__trigger" aria-expanded="' + (open ? 'true' : 'false') + '" data-toggle="closest:.accordion__item">' + t + CHEVRON + '</button></h3><div class="accordion__panel"><div class="accordion__inner"><div class="accordion__content">Panel content opens and closes smoothly without a fixed height.</div></div></div></div>';
p('Accordion styling', {
  height: 260,
  html: acc('What is included?', true) + acc('How do I install it?', false) + acc('Can I customise it?', false),
});
p('Modal and overlay', {
  height: 320,
  needs: [BTN],
  html: '<button type="button" class="btn btn--primary" data-open-dialog="#dlg">Open modal</button><dialog class="modal" id="dlg" aria-labelledby="dlg-t"><div class="modal__header"><h2 id="dlg-t">Delete item?</h2><button type="button" class="btn btn--ghost btn--icon" aria-label="Close" data-close-dialog>×</button></div><div class="modal__body"><p>This action cannot be undone.</p></div><div class="modal__footer"><button type="button" class="btn btn--outline" data-close-dialog>Cancel</button><button type="button" class="btn btn--danger" data-close-dialog>Delete</button></div></dialog>',
});
p(SPIN, {
  height: 190,
  html: '<div class="pv-row" style="gap:32px"><div class="spinner" role="status" aria-label="Loading"></div><div class="loader" role="status"><div class="spinner"></div><span>Loading data</span></div></div>',
});
p('Skeleton loading', {
  height: 220,
  html: '<div style="max-width:300px" aria-busy="true"><div class="skeleton skeleton--image"></div><div class="skeleton skeleton--title" style="margin-top:12px"></div><div class="skeleton skeleton--text"></div><div class="skeleton skeleton--text" style="width:80%"></div></div>',
});
p('Text truncation', {
  height: 260,
  html: '<div class="pv-col" style="max-width:260px"><p class="pv-note">.truncate</p><p class="truncate pv-box">' + LOREM + '</p><p class="pv-note">.line-clamp-2</p><p class="line-clamp-2 pv-box">' + LOREM + '</p><p class="pv-note">.line-clamp-3</p><p class="line-clamp-3 pv-box">' + LOREM + ' ' + LOREM + '</p></div>',
});
p('Scrollbar styling', {
  height: 170,
  html: '<div class="scroll-thin pv-box" style="height:110px;overflow:auto" tabindex="0" aria-label="Scrollable text">' + [1, 2, 3, 4, 5, 6, 7, 8].map((n) => '<p>Scrollable line ' + n + '</p>').join('') + '</div>',
});
p('Badges and tags', {
  height: 110,
  html: '<div class="pv-row"><span class="badge">Default</span><span class="badge badge--primary">New</span><span class="badge badge--success">Paid</span><span class="badge badge--danger">Failed</span></div>',
});

/* ---------------- Buttons ---------------- */
const B = (cls, label, extra) => '<button type="button" class="btn ' + cls + '"' + (extra || '') + '>' + label + '</button>';
p(BTN, {
  height: 140,
  html: '<div class="pv-row">' + B('btn--primary', 'Primary') + B('btn--secondary', 'Secondary') + B('btn--danger', 'Danger') + B('btn--primary', 'Disabled', ' disabled') + '</div><p class="pv-note" style="margin-top:14px">' + HOVER + ' Press a button to see the pressed state.</p>',
});
p('Button styles: outline, ghost, soft and link', {
  height: 140,
  needs: [BTN],
  html: '<div class="pv-row">' + B('btn--outline', 'Outline') + B('btn--ghost', 'Ghost') + B('btn--soft', 'Soft') + B('btn--link', 'Link button') + '</div>',
  hint: HOVER,
});
p('Button sizes and full-width', {
  height: 210,
  needs: [BTN],
  html: '<div class="pv-row">' + B('btn--primary btn--sm', 'Small') + B('btn--primary', 'Default') + B('btn--primary btn--lg', 'Large') + '</div><div style="margin-top:14px">' + B('btn--primary btn--block', 'Full-width block button') + '</div>',
});
p('Button shapes: pill, square and rounded', {
  height: 120,
  needs: [BTN],
  html: '<div class="pv-row">' + B('btn--primary btn--pill', 'Pill') + B('btn--primary btn--rounded', 'Rounded') + B('btn--primary btn--square', 'Square') + B('btn--outline btn--pill', 'Outline pill') + '</div>',
});
p('Icon buttons and icon with text', {
  height: 120,
  needs: [BTN],
  html: '<div class="pv-row">' + B('btn--primary btn--icon', STAR, ' aria-label="Favourite"') + B('btn--outline btn--icon', GEAR, ' aria-label="Settings"') + B('btn--primary', STAR + ' With icon') + B('btn--outline', 'Next ' + STAR) + '</div>',
});
p('Loading button', {
  height: 130,
  needs: [BTN, SPIN],
  html: '<div class="pv-row">' + B('btn--primary btn--loading', 'Saving', ' disabled aria-busy="true"') + B('btn--outline btn--loading', 'Loading', ' disabled aria-busy="true"') + B('btn--soft btn--loading', 'Working', ' disabled aria-busy="true"') + '</div>',
});
p('3D press button', {
  height: 120,
  needs: [BTN],
  hint: 'Press and hold a button.',
  html: '<div class="pv-row">' + B('btn--primary btn--3d', 'Press me') + B('btn--secondary btn--3d', 'Secondary', ' style="--btn-3d-shadow:#0a4a45"') + '</div>',
});
p('Gradient button', { height: 120, needs: [BTN], hint: HOVER, html: '<div class="pv-row">' + B('btn--gradient', 'Gradient') + B('btn--gradient btn--pill btn--lg', 'Get started') + '</div>' });
p('Glow button', { height: 120, needs: [BTN], hint: HOVER, html: '<div class="pv-row">' + B('btn--primary btn--glow', 'Glow on hover') + B('btn--secondary btn--glow', 'Glow secondary') + '</div>' });
p('Shine sweep button', { height: 120, needs: [BTN], hint: HOVER, replay: false, html: '<div class="pv-row">' + B('btn--primary btn--shine', 'Hover for shine') + B('btn--primary btn--lg btn--shine btn--pill', 'Shiny pill') + '</div>' });
p('Fill-slide button', { height: 120, needs: [BTN], hint: HOVER, html: '<div class="pv-row">' + B('btn--fill', 'Fill slide') + B('btn--fill btn--pill', 'Fill pill') + '</div>' });
p('Arrow-slide button', { height: 120, needs: [BTN], hint: HOVER, html: '<div class="pv-row">' + B('btn--primary', 'Learn more <span class="btn__arrow" aria-hidden="true">→</span>') + B('btn--outline', 'Get started <span class="btn__arrow" aria-hidden="true">→</span>') + '</div>' });
p('Button group (segmented)', {
  height: 120,
  needs: [BTN],
  hint: 'Click a segment to select it.',
  html: '<div class="btn-group" role="group" aria-label="View">' + B('', 'Day', ' data-select aria-pressed="true"') + B('', 'Week', ' data-select aria-pressed="false"') + B('', 'Month', ' data-select aria-pressed="false"') + '</div>',
});
p('Floating action button', { height: 170, html: '<p>The button is fixed to the bottom-right corner of the screen.</p><button type="button" class="fab" aria-label="Chat">' + STAR + '</button>', needs: [BTN] });

/* ---------------- Hover effects ---------------- */
p('Touch-safe hover pattern', { height: 130, hint: HOVER, html: '<div class="pv-row"><button type="button" class="hover-target pv-box" style="cursor:pointer">Hover or focus me</button></div>' });
p('Card lift on hover', { height: 170, hint: HOVER, html: '<div class="pv-row"><div class="pv-box hover-lift" tabindex="0" style="width:200px">Lift card<br><span class="text-muted">Focus works too</span></div><div class="pv-box hover-lift" tabindex="0" style="width:200px">Another card</div></div>' });
p('Card border highlight on hover', { height: 150, hint: HOVER, html: '<div class="pv-row"><div class="pv-box hover-border" tabindex="0" style="width:200px">Border highlight</div><div class="pv-box hover-border" tabindex="0" style="width:200px">Another card</div></div>' });
p('Image zoom on hover', { height: 230, hint: HOVER, html: '<div class="zoom" style="width:280px;height:158px;border-radius:8px"><img src="' + IMG + '" alt="Placeholder landscape"></div>' });
p('Image overlay caption reveal', { height: 230, hint: HOVER + ' On touch screens the caption stays visible.', html: '<div class="reveal" tabindex="0" style="width:280px;height:158px;border-radius:8px"><img src="' + IMG + '" alt="" style="width:100%;height:100%;object-fit:cover"><div class="reveal__caption"><strong>Mountain trail</strong><br>Caption slides up on hover or focus</div></div>' });
p('Grayscale to color on hover', { height: 230, hint: HOVER, html: '<div class="pv-row"><img class="gray-hover" src="' + IMG + '" alt="Placeholder" style="width:200px;border-radius:8px"><img class="gray-hover" src="' + IMG + '" alt="Placeholder" style="width:200px;border-radius:8px"></div>' });
p('Link underline slide', { height: 110, hint: HOVER, html: '<p style="font-size:1.25rem"><a class="link-underline" href="#">Underline slides in</a> &nbsp; <a class="link-underline" href="#">Another link</a></p>' });
p('Link underline from center', { height: 110, hint: HOVER, html: '<p style="font-size:1.25rem"><a class="link-underline-center" href="#">Underline from center</a> &nbsp; <a class="link-underline-center" href="#">Another link</a></p>' });
p('Nav link indicator bar', { height: 110, hint: HOVER, html: '<nav class="pv-row" style="gap:24px;font-weight:600"><a class="nav-hover" href="#">Home</a><a class="nav-hover" href="#" aria-current="page">About (active)</a><a class="nav-hover" href="#">Pricing</a><a class="nav-hover" href="#">Contact</a></nav>' });
p('Icon hover effects', { height: 120, hint: HOVER, html: '<div class="pv-row" style="gap:28px;color:var(--color-primary)">' + ['rotate', 'scale', 'nudge', 'lift'].map((m) => '<span class="icon-hover icon-hover--' + m + '" tabindex="0" title="' + m + '">' + GEAR + '</span>').join('') + '</div><p class="pv-note">rotate · scale · nudge · lift</p>' });
p('Table row and list item hover', { height: 190, hint: HOVER, html: '<table style="width:100%;border-collapse:collapse"><thead><tr><th align="left">Name</th><th align="left">Status</th></tr></thead><tbody>' + [['Asha', 'Active'], ['Rahul', 'Pending'], ['Meera', 'Active']].map(([n, s]) => '<tr class="hover-row" tabindex="0"><td style="padding:8px">' + n + '</td><td style="padding:8px">' + s + '</td></tr>').join('') + '</tbody></table>' });
p('3D tilt on hover', { height: 170, hint: HOVER, html: '<div class="pv-row" style="padding:12px"><div class="tilt pv-box" style="width:220px;height:90px">Tilt card</div></div>' });
p('Dropdown reveal (hover, focus and click)', {
  height: 230,
  needs: [BTN],
  hint: HOVER + ' Click also toggles it.',
  html: '<div class="dropdown"><button type="button" class="btn btn--outline" aria-expanded="false" data-toggle="closest:.dropdown">Account ▾</button><div class="dropdown__menu"><a href="#" style="display:block;padding:8px">Profile</a><a href="#" style="display:block;padding:8px">Settings</a><a href="#" style="display:block;padding:8px">Sign out</a></div></div>',
});
p('Cursor and pressed states', { height: 130, hint: 'Hover for the pointer cursor, press and hold to see the pressed state.', html: '<div class="pv-row"><div class="is-clickable pv-box" tabindex="0">.is-clickable</div><div class="pv-box" aria-disabled="true">aria-disabled (not-allowed)</div></div>' });

/* ---------------- Effects and animation ---------------- */
p('CSS transitions', { height: 150, hint: HOVER, html: '<div class="pv-row"><div class="pv-box transition pv-hoverable" style="width:210px">.transition: smooth</div><div class="pv-box pv-hoverable" style="width:210px">no transition: abrupt</div></div>' });
p('Fade-in and slide-up on load', { height: 190, replay: true, html: '<h2 class="fade-in">Headline fades in</h2><p class="fade-in fade-in-delay-1">Supporting text follows.</p><p class="fade-in fade-in-delay-2">Then the next line.</p><p class="fade-in fade-in-delay-3">And the last one.</p>' });
p('Scroll-reveal with scroll-driven animation', {
  height: 230,
  hint: 'Scroll inside the preview. Needs a recent Chrome or Edge; other browsers just show the content.',
  html: '<div style="padding-top:140px;padding-bottom:60px">' + [1, 2, 3, 4].map((n) => '<div class="pv-box scroll-reveal" style="margin-bottom:90px">Revealed block ' + n + '</div>').join('') + '</div>',
});
p('Pulse attention ring', { height: 120, needs: [BTN], html: '<div class="pv-row"><button type="button" class="btn btn--primary pulse">New feature</button></div>' });
p('Shake for form errors', { height: 130, replay: true, html: '<div class="pv-row"><div class="pv-box shake" style="border-color:var(--color-danger);color:var(--color-danger)">Invalid email address</div></div>' });
p('Float and bounce', { height: 150, html: '<div class="pv-row" style="gap:28px;padding-top:12px"><div class="pv-box float">float</div><div class="pv-box bounce">bounce</div></div>' });
p('Marquee ticker', { height: 120, hint: 'Pauses on hover or focus.', html: '<div class="marquee" tabindex="0" aria-label="Scrolling logos"><div class="marquee__track">' + [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((n) => '<span class="pv-box" style="white-space:nowrap">Logo ' + n + '</span>').join('') + '</div></div>' });
p('Typing text with blinking caret', { height: 120, replay: true, html: '<h2 class="typing">Welcome to my portfolio!</h2>' });
p('Glassmorphism panel', { height: 200, html: '<div style="background:linear-gradient(135deg,#2457d6 0%,#0f766e 60%,#ffd166 100%);padding:32px;border-radius:12px"><div class="glass" style="padding:16px;border-radius:12px;max-width:260px"><h3>Glass panel</h3><p>Blurred background behind translucent card.</p></div></div>' });
p('Gradient text', { height: 120, html: '<h1 class="text-gradient">Gradient heading</h1>' });
p('Gradient border', { height: 150, html: '<div class="gradient-border pv-box" style="max-width:260px;padding:20px"><strong>Featured plan</strong><br>Gradient outline without extra markup.</div>' });
p('CSS-only tooltip', { height: 140, hint: HOVER, html: '<div class="pv-row" style="padding-top:36px;gap:24px"><button type="button" class="pv-box" data-tooltip="Saves your work" style="cursor:pointer">Save</button><button type="button" class="pv-box" data-tooltip="Deletes permanently" style="cursor:pointer">Delete</button></div>' });

/* ---------------- Accessibility ---------------- */
p('Accessibility focus styles', {
  height: 190,
  hint: 'Click in the preview, then press Tab. The skip link appears first.',
  html: '<a class="skip-link" href="#">Skip to content</a><div class="pv-col" style="margin-top:36px"><div class="pv-row"><button type="button" class="pv-box">Button</button><a href="#">A link</a><input class="pv-box" placeholder="An input" aria-label="Example input"></div><span class="visually-hidden">Visually hidden text for screen readers</span></div>',
});

/**
 * Returns what PreviewFrame needs for an entry, or null when the entry has no visual preview.
 */
export function getCssPreview(entry) {
  const spec = previews[entry.title];
  if (!spec) return null;
  const order = [...BASE, ...(spec.needs || []), entry.title];
  const seen = new Set();
  const css = order
    .filter((title) => (seen.has(title) ? false : (seen.add(title), true)))
    .map((title) => codeByTitle.get(title) || '')
    .join('\n');
  return { css, html: spec.html, htmlAttrs: spec.htmlAttrs || '', height: spec.height, hint: spec.hint, responsive: spec.responsive, replay: spec.replay };
}

export const previewTitles = Object.keys(previews);
