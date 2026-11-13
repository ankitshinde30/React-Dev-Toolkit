import { FolderPlus, Trash2 } from 'lucide-react';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';

export default function DashboardHeader({ project, typeLabel, projects, overall, onSelect, onNew, onDelete }) {
  return (
    <section className="dash-head" aria-labelledby="project-title">
      <div className="dash-head__top">
        <div className="dash-head__text">
          <p className="chip">{typeLabel}</p>
          <h1 id="project-title">{project.name}</h1>
          {project.description && <p className="muted">{project.description}</p>}
        </div>
        <div className="dash-head__actions">
          <label className="visually-hidden" htmlFor="project-select">
            Switch project
          </label>
          <select id="project-select" className="input" value={project.id} onChange={(e) => onSelect(e.target.value)}>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <button type="button" className="btn btn--primary" onClick={onNew}>
            <FolderPlus size={16} aria-hidden="true" />
            New project
          </button>
          <button
            type="button"
            className="btn btn--outline"
            onClick={onDelete}
            disabled={projects.length <= 1}
            title={projects.length <= 1 ? 'You need at least one project' : 'Delete this project'}
          >
            <Trash2 size={16} aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>

      <div className="stats">
        <div className="stat stat--wide">
          <div className="stat__row">
            <span className="stat__label">Overall completion</span>
            <strong className="stat__value">{overall.percent}%</strong>
          </div>
          <ProgressBar value={overall.percent} label="Overall completion" size="lg" />
        </div>
        <div className="stat">
          <span className="stat__label">Completed</span>
          <strong className="stat__value">{overall.done}</strong>
        </div>
        <div className="stat">
          <span className="stat__label">Pending</span>
          <strong className="stat__value">{overall.pending}</strong>
        </div>
        <div className="stat">
          <span className="stat__label">Total tasks</span>
          <strong className="stat__value">{overall.total}</strong>
        </div>
      </div>
    </section>
  );
}
