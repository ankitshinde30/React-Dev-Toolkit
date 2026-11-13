import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage.js';

export const STORAGE_KEY = 'react-dev-toolkit:v1';

function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'p-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function makeProject({ name, description = '', type = 'standard', checked = {} }) {
  return {
    id: newId(),
    name: (name || '').trim() || 'Untitled project',
    description: description.trim(),
    type,
    createdAt: new Date().toISOString(),
    checked,
  };
}

function initialState() {
  const first = makeProject({
    name: 'My React Project',
    description: 'Checklist for a new React build.',
  });
  return { projects: [first], activeId: first.id };
}

/** Repairs or rejects whatever was found in localStorage. */
function normalize(parsed) {
  if (!parsed || !Array.isArray(parsed.projects) || parsed.projects.length === 0) return null;
  const projects = parsed.projects
    .filter((p) => p && typeof p.id === 'string' && typeof p.name === 'string')
    .map((p) => ({
      id: p.id,
      name: p.name,
      description: typeof p.description === 'string' ? p.description : '',
      type: typeof p.type === 'string' ? p.type : 'standard',
      createdAt: p.createdAt || new Date().toISOString(),
      checked: p.checked && typeof p.checked === 'object' && !Array.isArray(p.checked) ? p.checked : {},
    }));
  if (projects.length === 0) return null;
  const activeId = projects.some((p) => p.id === parsed.activeId) ? parsed.activeId : projects[0].id;
  return { projects, activeId };
}

export function useProjects() {
  const [state, setState, flush] = useLocalStorage(STORAGE_KEY, initialState, normalize);
  const project = state.projects.find((p) => p.id === state.activeId) ?? state.projects[0];

  const updateActive = useCallback(
    (fn) =>
      setState((s) => ({
        ...s,
        projects: s.projects.map((p) => (p.id === s.activeId ? fn(p) : p)),
      })),
    [setState]
  );

  const toggleItem = useCallback(
    (itemId) =>
      updateActive((p) => {
        const checked = { ...p.checked };
        if (checked[itemId]) delete checked[itemId];
        else checked[itemId] = true;
        return { ...p, checked };
      }),
    [updateActive]
  );

  const setItems = useCallback(
    (itemIds, value) =>
      updateActive((p) => {
        const checked = { ...p.checked };
        itemIds.forEach((id) => {
          if (value) checked[id] = true;
          else delete checked[id];
        });
        return { ...p, checked };
      }),
    [updateActive]
  );

  const replaceProgress = useCallback(
    (checked, type) => updateActive((p) => ({ ...p, checked, type })),
    [updateActive]
  );

  const createProject = useCallback(
    (data) => {
      const created = makeProject(data);
      setState((s) => ({ projects: [...s.projects, created], activeId: created.id }));
      return created;
    },
    [setState]
  );

  const importProject = useCallback(
    (data) => {
      let name = data.name;
      if (state.projects.some((p) => p.name === name)) name = name + ' (imported)';
      return createProject({ ...data, name });
    },
    [state.projects, createProject]
  );

  const selectProject = useCallback(
    (id) => setState((s) => (s.projects.some((p) => p.id === id) ? { ...s, activeId: id } : s)),
    [setState]
  );

  const deleteProject = useCallback(
    (id) =>
      setState((s) => {
        if (s.projects.length <= 1) return s;
        const projects = s.projects.filter((p) => p.id !== id);
        return { projects, activeId: s.activeId === id ? projects[0].id : s.activeId };
      }),
    [setState]
  );

  return {
    projects: state.projects,
    project,
    toggleItem,
    setItems,
    replaceProgress,
    createProject,
    importProject,
    selectProject,
    deleteProject,
    save: flush,
  };
}
