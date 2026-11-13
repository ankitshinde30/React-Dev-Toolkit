import { overallStats, sectionStats } from './progressUtils.js';

export const EXPORT_APP = 'react-dev-toolkit';
export const EXPORT_VERSION = 1;

/** mode: 'all' | 'checked' | 'pending' */
export function buildChecklistText({ project, sections, mode = 'all' }) {
  const { checked } = project;
  const overall = overallStats(sections, checked);
  const lines = ['# ' + project.name];
  if (project.description) lines.push(project.description);
  lines.push('Progress: ' + overall.done + '/' + overall.total + ' (' + overall.percent + '%)');

  sections.forEach((section) => {
    const items = section.items.filter((item) => {
      if (mode === 'checked') return checked[item.id];
      if (mode === 'pending') return !checked[item.id];
      return true;
    });
    if (items.length === 0) return;
    const stats = sectionStats(section, checked);
    lines.push('', '## ' + section.title + ' (' + stats.done + '/' + stats.total + ')');
    items.forEach((item) => lines.push('- [' + (checked[item.id] ? 'x' : ' ') + '] ' + item.text));
  });
  return lines.join('\n');
}

export function downloadProjectJson(project) {
  const payload = {
    app: EXPORT_APP,
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    project: {
      name: project.name,
      description: project.description,
      type: project.type,
      checked: project.checked,
    },
  };
  const slug = project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'project';
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = slug + '-checklist.json';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

/** Validates an exported file. Throws an Error with a readable message when invalid. */
export function parseImport(text, knownTypes) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('That file is not valid JSON.');
  }
  if (!data || data.app !== EXPORT_APP || typeof data.project !== 'object' || data.project === null) {
    throw new Error('This file was not exported from React Dev Toolkit.');
  }
  if (data.version !== EXPORT_VERSION) {
    throw new Error('This export uses version ' + data.version + ', which this app cannot read.');
  }
  const p = data.project;
  if (typeof p.name !== 'string' || !p.checked || typeof p.checked !== 'object' || Array.isArray(p.checked)) {
    throw new Error('The project data in this file is incomplete.');
  }
  const checked = {};
  Object.keys(p.checked).forEach((key) => {
    if (p.checked[key] === true) checked[key] = true;
  });
  return {
    name: p.name.slice(0, 80),
    description: typeof p.description === 'string' ? p.description.slice(0, 300) : '',
    type: knownTypes.includes(p.type) ? p.type : 'standard',
    checked,
  };
}
