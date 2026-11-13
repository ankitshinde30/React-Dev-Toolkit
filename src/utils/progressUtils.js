export function percentOf(done, total) {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

export function sectionStats(section, checked) {
  const total = section.items.length;
  const done = section.items.reduce((count, item) => count + (checked[item.id] ? 1 : 0), 0);
  return { total, done, pending: total - done, percent: percentOf(done, total) };
}

export function overallStats(sections, checked) {
  let total = 0;
  let done = 0;
  sections.forEach((section) => {
    const s = sectionStats(section, checked);
    total += s.total;
    done += s.done;
  });
  return { total, done, pending: total - done, percent: percentOf(done, total) };
}

export function filterItems(items, checked, query, filter) {
  const q = query.trim().toLowerCase();
  return items.filter((item) => {
    const isDone = Boolean(checked[item.id]);
    if (filter === 'completed' && !isDone) return false;
    if (filter === 'pending' && isDone) return false;
    return !q || item.text.toLowerCase().includes(q);
  });
}
