import { useMemo } from 'react';
import { getSectionsForType } from '../data/projectTemplates.js';
import { overallStats, sectionStats } from '../utils/progressUtils.js';

/** Derives sections and live progress numbers from a project. Nothing here is stored. */
export function useChecklistProgress(project) {
  const { type, checked } = project;
  return useMemo(() => {
    const sections = getSectionsForType(type);
    const bySection = {};
    sections.forEach((section) => {
      bySection[section.id] = sectionStats(section, checked);
    });
    return { sections, bySection, overall: overallStats(sections, checked) };
  }, [type, checked]);
}
