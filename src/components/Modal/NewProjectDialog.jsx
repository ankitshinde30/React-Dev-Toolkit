import { useState } from 'react';
import Modal from './Modal.jsx';
import { projectTypes } from '../../data/projectTemplates.js';

export default function NewProjectDialog({ open, onClose, onCreate }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('standard');
  const [error, setError] = useState('');
  const selected = projectTypes.find((t) => t.id === type);

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim()) {
      setError('Enter a project name.');
      return;
    }
    onCreate({ name, description, type });
    setName('');
    setDescription('');
    setType('standard');
    setError('');
  }

  function handleClose() {
    setError('');
    onClose();
  }

  return (
    <Modal open={open} title="Start a new checklist" onClose={handleClose}>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="np-name">Project name</label>
          <input
            id="np-name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? 'np-error' : undefined}
            autoComplete="off"
          />
          {error && (
            <p id="np-error" className="field__error" role="alert">
              {error}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="np-desc">Description (optional)</label>
          <textarea
            id="np-desc"
            className="input"
            rows={2}
            maxLength={300}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="np-type">Project type</label>
          <select id="np-type" className="input" value={type} onChange={(e) => setType(e.target.value)}>
            {projectTypes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
          <p className="field__hint">{selected.description}</p>
        </div>
        <div className="modal__actions">
          <button type="button" className="btn btn--ghost" onClick={handleClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            Create checklist
          </button>
        </div>
      </form>
    </Modal>
  );
}
