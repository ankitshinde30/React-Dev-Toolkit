import { useLayoutEffect, useRef, useState } from 'react';
import { Link, MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../live/components/Navbar.jsx';
import Footer from '../live/components/Footer.jsx';
import Button from '../live/components/Button.jsx';
import Card from '../live/components/Card.jsx';
import Modal from '../live/components/Modal.jsx';
import Accordion from '../live/components/Accordion.jsx';
import Loader from '../live/components/Loader.jsx';
import FormField from '../live/components/FormField.jsx';
import ContactForm from '../live/components/ContactForm.jsx';
import UserList from '../live/components/UserList.jsx';
import ProtectedRoute from '../live/components/ProtectedRoute.jsx';
import ErrorBoundary from '../live/components/ErrorBoundary.jsx';
import NotFound from '../live/pages/NotFound.jsx';
import Home from '../live/pages/Home.jsx';
import About from '../live/pages/About.jsx';
import Contact from '../live/pages/Contact.jsx';
import LiveApp from '../live/App.jsx';
import LazyApp from '../live/LazyApp.jsx';

/*
 * Demos for the React snippets tab. Each one renders the REAL snippet files from src/live inside the preview iframe.
 * Only the wrappers below (routers, fake server, demo buttons) are specific to this toolkit.
 */

const IMG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 360'><rect width='640' height='360' fill='%23dbe6ff'/><circle cx='500' cy='90' r='42' fill='%23ffd166'/><path d='M0 360V250l120-80 110 70 130-110 150 120 130-60v170z' fill='%232457d6'/></svg>";

/** Stops route-change scrolling from moving the toolkit page that hosts the preview. */
function useStubbedScroll() {
  useLayoutEffect(() => {
    const original = window.scrollTo;
    window.scrollTo = () => {};
    return () => {
      window.scrollTo = original;
    };
  }, []);
}

/** Replaces window.fetch with a fake server while a demo is on screen. */
function useFakeServer(handler) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;
  useLayoutEffect(() => {
    const original = window.fetch;
    window.fetch = (url) =>
      new Promise((resolve) => {
        setTimeout(() => resolve(handlerRef.current(String(url))), 800);
      });
    return () => {
      window.fetch = original;
    };
  }, []);
}

function Choice({ label, options, value, onChange }) {
  return (
    <div className="pv-row" style={{ marginBottom: 12 }}>
      <span className="pv-note" style={{ margin: 0 }}>{label}</span>
      <div className="btn-group" role="group" aria-label={label}>
        {options.map((o) => (
          <button key={o.id} type="button" className="btn btn--sm" aria-pressed={value === o.id} onClick={() => onChange(o.id)}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function NavbarDemo() {
  return (
    <MemoryRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </MemoryRouter>
  );
}

function RouterDemo() {
  useStubbedScroll();
  return (
    <MemoryRouter>
      <LiveApp />
    </MemoryRouter>
  );
}

function NotFoundDemo() {
  return (
    <MemoryRouter initialEntries={['/does-not-exist']}>
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  );
}

function ButtonDemo() {
  const [saving, setSaving] = useState(false);
  function save() {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  }
  return (
    <div className="pv-col">
      <div className="pv-row">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="danger" disabled>Disabled</Button>
      </div>
      <div className="pv-row">
        <Button size="sm">Small</Button>
        <Button size="lg" variant="soft">Large soft</Button>
        <Button loading={saving} onClick={save}>
          {saving ? 'Saving' : 'Click to load'}
        </Button>
      </div>
      <Button block variant="outline">Block button</Button>
    </div>
  );
}

function CardDemo() {
  return (
    <div className="grid grid-auto">
      <Card title="Design" image={IMG} imageAlt="Placeholder landscape" footer={<a className="btn btn--outline btn--sm" href="#">Learn more</a>}>
        <p>Short description of the service.</p>
      </Card>
      <Card title="Development with a longer title" image={IMG} imageAlt="Placeholder landscape" footer={<a className="btn btn--outline btn--sm" href="#">Learn more</a>}>
        <p>Footers line up even when titles wrap.</p>
      </Card>
    </div>
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <p className="pv-note" style={{ marginTop: 8 }}>Try Tab (focus stays inside), Escape and clicking the backdrop.</p>
      <Modal
        open={open}
        title="Delete item?"
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
          </>
        }
      >
        <p>This action cannot be undone.</p>
      </Modal>
    </>
  );
}

function AccordionDemo() {
  const items = [
    { id: 'a', title: 'What is included?', content: <p>Everything you need to start a project.</p> },
    { id: 'b', title: 'Can several panels stay open?', content: <p>Yes, with the allowMultiple prop.</p> },
    { id: 'c', title: 'Is it keyboard accessible?', content: <p>Yes: Tab to a heading button, then Enter or Space.</p> },
  ];
  return (
    <div className="pv-col">
      <Accordion items={items} defaultOpenId="a" />
      <Accordion items={items.map((i) => ({ ...i, id: 'm' + i.id }))} allowMultiple />
    </div>
  );
}

function LoaderDemo() {
  const [full, setFull] = useState(false);
  function show() {
    setFull(true);
    setTimeout(() => setFull(false), 2000);
  }
  return (
    <>
      <Loader label="Loading data" />
      <Button variant="outline" onClick={show}>Show fullscreen loader for 2 seconds</Button>
      {full && <Loader fullscreen label="Loading page" />}
    </>
  );
}

function FooterDemo() {
  return (
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
}

function FormFieldDemo() {
  const [email, setEmail] = useState('name@');
  const [touched, setTouched] = useState(true);
  const error = touched && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? 'Enter a valid email, like name@example.com.' : undefined;
  return (
    <div className="pv-col" style={{ maxWidth: 380 }}>
      <FormField label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => setTouched(true)} error={error} hint="We never share your email." required />
      <FormField label="Message" name="message" as="textarea" rows={3} value="" onChange={() => {}} hint="Textarea variant" />
    </div>
  );
}

function ContactFormDemo() {
  const [server, setServer] = useState('ok');
  const serverRef = useRef(server);
  serverRef.current = server;
  useFakeServer(() => ({ ok: serverRef.current === 'ok', status: serverRef.current === 'ok' ? 200 : 500, json: async () => ({}) }));
  return (
    <>
      <Choice label="Fake server" value={server} onChange={setServer} options={[{ id: 'ok', label: 'Succeeds' }, { id: 'fail', label: 'Fails' }]} />
      <div style={{ maxWidth: 420 }}>
        <ContactForm />
      </div>
    </>
  );
}

function UserListDemo() {
  const [mode, setMode] = useState('users');
  const modeRef = useRef(mode);
  modeRef.current = mode;
  useFakeServer(() => {
    if (modeRef.current === 'error') return { ok: false, status: 500, json: async () => ({}) };
    const data = modeRef.current === 'empty' ? [] : [{ id: 1, name: 'Asha Patel' }, { id: 2, name: 'Rahul Shah' }, { id: 3, name: 'Meera Rao' }];
    return { ok: true, status: 200, json: async () => data };
  });
  return (
    <>
      <Choice label="Fake server" value={mode} onChange={setMode} options={[{ id: 'users', label: 'Users' }, { id: 'empty', label: 'Empty' }, { id: 'error', label: 'Error' }]} />
      <UserList key={mode} />
    </>
  );
}

function Login({ onLogin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname ?? '/';
  return (
    <div>
      <p>You must sign in to view {from}.</p>
      <Button
        onClick={() => {
          onLogin('Asha');
          navigate(from, { replace: true });
        }}
      >
        Sign in
      </Button>
    </div>
  );
}

function ProtectedRouteDemo() {
  const [user, setUser] = useState(null);
  return (
    <MemoryRouter initialEntries={['/']}>
      <div className="pv-row" style={{ marginBottom: 12 }}>
        <Link to="/">Public home</Link>
        <Link to="/dashboard">Private dashboard</Link>
        {user && <Button size="sm" variant="outline" onClick={() => setUser(null)}>Sign out</Button>}
        <span className="pv-note" style={{ margin: 0 }}>{user ? 'Signed in as ' + user : 'Signed out'}</span>
      </div>
      <Routes>
        <Route path="/" element={<p>Anyone can see this page.</p>} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route element={<ProtectedRoute isAuthenticated={Boolean(user)} />}>
          <Route path="/dashboard" element={<p>Private dashboard for {user}.</p>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

function Bomb() {
  const [broken, setBroken] = useState(false);
  if (broken) throw new Error('Demo error');
  return <Button variant="danger" onClick={() => setBroken(true)}>Break this widget</Button>;
}

function ErrorBoundaryDemo() {
  return (
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  );
}

function LazyDemo() {
  return (
    <MemoryRouter>
      <nav className="pv-row" style={{ marginBottom: 12 }} aria-label="Demo links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/nowhere">Unknown</Link>
      </nav>
      <LazyApp />
    </MemoryRouter>
  );
}

const NO_VISUAL = 'This snippet has no visual output of its own (it controls how the window scrolls), so there is nothing to preview here. Try it in your project.';

/** Keyed by snippet title. `note` entries show an explanation instead of a preview. */
export const reactDemos = {
  'Reusable Navbar component': { Demo: NavbarDemo, height: 380, responsive: true, defaultNote: 'Choose Mobile to use the hamburger menu, or Desktop for the inline links.' },
  'Responsive mobile menu hook (scroll lock and cleanup)': { Demo: NavbarDemo, height: 380, responsive: true, defaultNote: 'Open the menu, then try Escape, clicking a link, and resizing. This is the Navbar using the hook.' },
  'React Router setup': { Demo: RouterDemo, height: 400, responsive: true, defaultNote: 'Real routes inside a shared layout. Visit /privacy in the footer to see the 404 route.' },
  '404 page': { Demo: NotFoundDemo, height: 250 },
  'ScrollToTop component': { note: NO_VISUAL },
  'Scroll to section utility': { note: NO_VISUAL },
  'Reusable Button': { Demo: ButtonDemo, height: 260 },
  'Reusable Card': { Demo: CardDemo, height: 380, responsive: true },
  'Reusable Modal with focus handling': { Demo: ModalDemo, height: 300 },
  'Reusable Accordion': { Demo: AccordionDemo, height: 400 },
  'Reusable Loader': { Demo: LoaderDemo, height: 240 },
  'Reusable Footer': { Demo: FooterDemo, height: 190 },
  'Reusable FormField': { Demo: FormFieldDemo, height: 380 },
  'Form validation example (contact form)': { Demo: ContactFormDemo, height: 620, defaultNote: 'Submit empty to see validation, then submit valid data. A fake server answers, so nothing is sent.' },
  'API fetching with loading and error states': { Demo: UserListDemo, height: 260, defaultNote: 'A fake server answers after a short delay. Switch it to see loading, empty and error states.' },
  'Protected route example': { Demo: ProtectedRouteDemo, height: 240, defaultNote: 'Open the private dashboard while signed out. You are sent to login, then back.' },
  'Error boundary': { Demo: ErrorBoundaryDemo, height: 220, defaultNote: 'Break the widget. Only this part fails, and Try again recovers it.' },
  'Lazy-loaded route example': { Demo: LazyDemo, height: 250, defaultNote: 'Each page loads the first time you visit it. A loader shows while it downloads.' },
};
