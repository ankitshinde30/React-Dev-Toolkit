import { useState } from 'react';
import { Code, FileCode, ListChecks } from 'lucide-react';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Cheatsheet from './pages/Cheatsheet/Cheatsheet.jsx';
import Snippets from './pages/Snippets/Snippets.jsx';
import { useProjects } from './hooks/useProjects.js';
import { useToast } from './hooks/useToast.js';

const TABS = [
  { id: 'checklist', label: 'Checklist', Icon: ListChecks },
  { id: 'css', label: 'CSS cheatsheet', Icon: Code },
  { id: 'react', label: 'React snippets', Icon: FileCode },
];

export default function App() {
  const [tab, setTab] = useState('checklist');
  const api = useProjects();
  const { message, notify } = useToast();

  return (
    <>
      <header className="topbar">
        <div className="container topbar__inner">
          <span className="brand">React Dev Toolkit</span>
          <nav aria-label="Toolkit sections" className="tabs">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                className="tabs__btn"
                aria-current={tab === id ? 'page' : undefined}
                onClick={() => setTab(id)}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main id="main" className="container main">
        {tab === 'checklist' && <Dashboard api={api} notify={notify} />}
        {tab === 'css' && <Cheatsheet notify={notify} />}
        {tab === 'react' && <Snippets notify={notify} />}
      </main>

      <footer className="footer">
        <div className="container muted small">
          Progress and projects are stored only in this browser (localStorage). Export JSON to back them up.
        </div>
      </footer>

      <div className="toast-region" role="status" aria-live="polite">
        {message && <p className="toast">{message}</p>}
      </div>
    </>
  );
}
