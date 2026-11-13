import { useMemo, useRef, useState } from 'react';
import {
  CheckCheck, ChevronsDownUp, ChevronsUpDown, ClipboardCheck, ClipboardList, Copy, Download, RotateCcw, Save, Upload,
} from 'lucide-react';
import Accordion from '../../components/Accordion/Accordion.jsx';
import ChecklistItem from '../../components/ChecklistItem/ChecklistItem.jsx';
import ProgressBar from '../../components/ProgressBar/ProgressBar.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import SectionIcon from '../../components/SectionIcon/SectionIcon.jsx';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader.jsx';
import ConfirmDialog from '../../components/Modal/ConfirmDialog.jsx';
import NewProjectDialog from '../../components/Modal/NewProjectDialog.jsx';
import { useChecklistProgress } from '../../hooks/useChecklistProgress.js';
import { getProjectType, projectTypeIds } from '../../data/projectTemplates.js';
import { filterItems } from '../../utils/progressUtils.js';
import { buildChecklistText, downloadProjectJson, parseImport } from '../../utils/exportUtils.js';
import { copyText } from '../../utils/clipboard.js';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'completed', label: 'Completed' },
  { id: 'pending', label: 'Pending' },
];

export default function Dashboard({ api, notify }) {
  const { projects, project, toggleItem, setItems, replaceProgress, createProject, importProject, selectProject, deleteProject, save } = api;
  const { sections, bySection, overall } = useChecklistProgress(project);

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [openIds, setOpenIds] = useState(() => new Set());
  const [dialog, setDialog] = useState(null);
  const fileRef = useRef(null);

  const searching = query.trim() !== '';
  const allItemIds = useMemo(() => sections.flatMap((s) => s.items.map((i) => i.id)), [sections]);

  const visible = useMemo(
    () =>
      sections
        .map((section) => ({ section, items: filterItems(section.items, project.checked, query, filter) }))
        .filter(({ items }) => items.length > 0 || (!searching && filter === 'all')),
    [sections, project.checked, query, filter, searching]
  );

  function toggleOpen(id) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function copyChecklist(mode, doneMessage) {
    const text = buildChecklistText({ project, sections, mode });
    const ok = await copyText(text);
    notify(ok ? doneMessage : 'Copy failed. Your browser blocked clipboard access.');
  }

  function handleSave() {
    notify(save() ? 'Progress saved in this browser' : 'Could not save. Browser storage is unavailable.');
  }

  async function handleFile(event) {
    const file = event.target.files && event.target.files[0];
    event.target.value = '';
    if (!file) return;
    try {
      const data = parseImport(await file.text(), projectTypeIds);
      setDialog({ type: 'import', data });
    } catch (error) {
      notify(error.message);
    }
  }

  const close = () => setDialog(null);
  let confirm = null;

  if (dialog?.type === 'reset-all') {
    confirm = {
      title: 'Reset the entire checklist?',
      body: 'This unchecks all ' + overall.done + ' completed tasks in "' + project.name + '". Your other projects are not affected.',
      label: 'Reset checklist',
      danger: true,
      onConfirm: () => {
        setItems(allItemIds, false);
        notify('Checklist reset');
        close();
      },
    };
  } else if (dialog?.type === 'reset-section') {
    const target = sections.find((s) => s.id === dialog.id);
    confirm = {
      title: 'Reset this section?',
      body: 'This unchecks every task in "' + (target ? target.title : 'this section') + '".',
      label: 'Reset section',
      danger: true,
      onConfirm: () => {
        if (target) setItems(target.items.map((i) => i.id), false);
        notify('Section reset');
        close();
      },
    };
  } else if (dialog?.type === 'delete') {
    confirm = {
      title: 'Delete this project?',
      body: '"' + project.name + '" and its saved progress will be removed from this browser. This cannot be undone.',
      label: 'Delete project',
      danger: true,
      onConfirm: () => {
        deleteProject(project.id);
        notify('Project deleted');
        close();
      },
    };
  } else if (dialog?.type === 'import') {
    const { data } = dialog;
    const incoming = Object.keys(data.checked).length;
    confirm = {
      title: 'Import "' + data.name + '"?',
      body:
        'The file has ' + incoming + ' completed tasks. "Import as new project" keeps everything you have. ' +
        '"Replace current progress" overwrites the ' + overall.done + ' completed tasks in "' + project.name + '".',
      label: 'Import as new project',
      onConfirm: () => {
        importProject(data);
        notify('Imported as a new project');
        close();
      },
      secondary: {
        label: 'Replace current progress',
        onClick: () => {
          replaceProgress(data.checked, data.type);
          notify('Progress replaced from file');
          close();
        },
      },
    };
  }

  return (
    <>
      <DashboardHeader
        project={project}
        typeLabel={getProjectType(project.type).label}
        projects={projects}
        overall={overall}
        onSelect={selectProject}
        onNew={() => setDialog({ type: 'new' })}
        onDelete={() => setDialog({ type: 'delete' })}
      />

      <div className="toolbar" role="group" aria-label="Checklist controls">
        <SearchBar value={query} onChange={setQuery} label="Search checklist tasks" placeholder="Search tasks, e.g. focus, sitemap" />
        <div className="segmented" role="group" aria-label="Filter tasks">
          {FILTERS.map((f) => (
            <button key={f.id} type="button" aria-pressed={filter === f.id} className="segmented__btn" onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="toolbar toolbar--buttons">
        <button type="button" className="btn btn--sm btn--outline" onClick={() => setOpenIds(new Set(sections.map((s) => s.id)))}>
          <ChevronsUpDown size={14} aria-hidden="true" /> Expand all
        </button>
        <button type="button" className="btn btn--sm btn--outline" onClick={() => setOpenIds(new Set())}>
          <ChevronsDownUp size={14} aria-hidden="true" /> Collapse all
        </button>
        <button type="button" className="btn btn--sm btn--outline" onClick={() => { setItems(allItemIds, true); notify('All tasks checked'); }}>
          <CheckCheck size={14} aria-hidden="true" /> Check all
        </button>
        <button type="button" className="btn btn--sm btn--outline" onClick={() => setDialog({ type: 'reset-all' })}>
          <RotateCcw size={14} aria-hidden="true" /> Reset checklist
        </button>
        <span className="toolbar__gap" aria-hidden="true" />
        <button type="button" className="btn btn--sm btn--outline" onClick={() => copyChecklist('all', 'Checklist copied')}>
          <Copy size={14} aria-hidden="true" /> Copy checklist
        </button>
        <button type="button" className="btn btn--sm btn--outline" onClick={() => copyChecklist('checked', 'Checked items copied')}>
          <ClipboardCheck size={14} aria-hidden="true" /> Copy checked
        </button>
        <button type="button" className="btn btn--sm btn--outline" onClick={() => copyChecklist('pending', 'Pending items copied')}>
          <ClipboardList size={14} aria-hidden="true" /> Copy pending
        </button>
        <span className="toolbar__gap" aria-hidden="true" />
        <button type="button" className="btn btn--sm btn--primary" onClick={handleSave}>
          <Save size={14} aria-hidden="true" /> Save progress
        </button>
        <button type="button" className="btn btn--sm btn--outline" onClick={() => { downloadProjectJson(project); notify('Exported JSON file'); }}>
          <Download size={14} aria-hidden="true" /> Export JSON
        </button>
        <button type="button" className="btn btn--sm btn--outline" onClick={() => fileRef.current && fileRef.current.click()}>
          <Upload size={14} aria-hidden="true" /> Import JSON
        </button>
        <input ref={fileRef} type="file" accept="application/json,.json" className="visually-hidden" tabIndex={-1} aria-label="Import checklist JSON file" onChange={handleFile} />
      </div>

      <p className="muted small" aria-live="polite">
        {searching || filter !== 'all'
          ? visible.reduce((n, v) => n + v.items.length, 0) + ' matching tasks'
          : 'Progress saves automatically in this browser.'}
      </p>

      <div className="acc-list">
        {visible.length === 0 && (
          <p className="empty">No tasks match. Clear the search or switch the filter to All.</p>
        )}
        {visible.map(({ section, items }) => {
          const stats = bySection[section.id];
          return (
            <Accordion
              key={section.id}
              id={'sec-' + section.id}
              title={section.title}
              icon={<SectionIcon name={section.icon} />}
              isOpen={searching || openIds.has(section.id)}
              onToggle={() => toggleOpen(section.id)}
              meta={
                <span className="acc__meta">
                  <span className="acc__count" aria-label={stats.done + ' of ' + stats.total + ' completed, ' + stats.pending + ' pending'}>
                    {stats.done}/{stats.total}
                  </span>
                  <ProgressBar value={stats.percent} label={section.title + ' progress'} size="sm" />
                  <span className="acc__pct">{stats.percent}%</span>
                </span>
              }
            >
              <div className="acc__tools">
                <span className="muted small">{stats.done} done, {stats.pending} pending</span>
                <span className="acc__tool-buttons">
                  <button type="button" className="btn btn--sm btn--ghost" onClick={() => setItems(section.items.map((i) => i.id), true)}>
                    Check all
                  </button>
                  <button type="button" className="btn btn--sm btn--ghost" onClick={() => setDialog({ type: 'reset-section', id: section.id })}>
                    Reset section
                  </button>
                </span>
              </div>
              {section.note && <p className="note">{section.note}</p>}
              <ul className="checklist">
                {items.map((item) => (
                  <ChecklistItem key={item.id} id={item.id} text={item.text} checked={Boolean(project.checked[item.id])} onToggle={toggleItem} />
                ))}
              </ul>
            </Accordion>
          );
        })}
      </div>

      <NewProjectDialog
        open={dialog?.type === 'new'}
        onClose={close}
        onCreate={(data) => {
          createProject(data);
          setQuery('');
          setFilter('all');
          notify('New checklist started');
          close();
        }}
      />
      <ConfirmDialog open={Boolean(confirm)} onCancel={close} {...confirm} />
    </>
  );
}
