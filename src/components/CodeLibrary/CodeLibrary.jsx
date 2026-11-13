import { useMemo, useState } from 'react';
import { ChevronsDownUp, ChevronsUpDown, Copy } from 'lucide-react';
import Accordion from '../Accordion/Accordion.jsx';
import CodeBlock from '../CodeBlock/CodeBlock.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { copyText } from '../../utils/clipboard.js';

/**
 * Top-level accordion that holds a searchable list of nested accordions,
 * each with a code example and a Copy code button.
 */
export default function CodeLibrary({ id, title, icon, intro, entries, labels, language, copyAllLabel, buildCopyAll, renderPreview, notify }) {
  const [open, setOpen] = useState(true);
  const [openIds, setOpenIds] = useState(() => new Set());
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const visible = useMemo(
    () =>
      entries.filter(
        (e) => !q || [e.title, e.group, e.what, e.when, e.fileName].filter(Boolean).join(' ').toLowerCase().includes(q)
      ),
    [entries, q]
  );

  const groups = useMemo(() => {
    const map = new Map();
    visible.forEach((e) => {
      if (!map.has(e.group)) map.set(e.group, []);
      map.get(e.group).push(e);
    });
    return Array.from(map.entries());
  }, [visible]);

  const autoOpen = q !== '' && visible.length <= 5;

  function toggle(entryId) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(entryId)) next.delete(entryId);
      else next.add(entryId);
      return next;
    });
  }

  async function copyAll() {
    const ok = await copyText(buildCopyAll(entries));
    notify(ok ? copyAllLabel + ': copied ' + entries.length + ' items' : 'Copy failed. Your browser blocked clipboard access.');
  }

  return (
    <Accordion id={id} title={title} icon={icon} isOpen={open} onToggle={() => setOpen((o) => !o)}
      meta={<span className="acc__count">{entries.length} items</span>}>
      <p className="muted lib__intro">{intro}</p>
      <div className="toolbar toolbar--lib">
        <SearchBar value={query} onChange={setQuery} label={'Search ' + title} placeholder="Search by name or topic" />
        <div className="toolbar__row">
          <button type="button" className="btn btn--sm btn--outline" onClick={() => setOpenIds(new Set(visible.map((e) => e.id)))}>
            <ChevronsUpDown size={14} aria-hidden="true" /> Expand all
          </button>
          <button type="button" className="btn btn--sm btn--outline" onClick={() => setOpenIds(new Set())}>
            <ChevronsDownUp size={14} aria-hidden="true" /> Collapse all
          </button>
          <button type="button" className="btn btn--sm btn--primary" onClick={copyAll}>
            <Copy size={14} aria-hidden="true" /> {copyAllLabel}
          </button>
        </div>
      </div>
      {visible.length === 0 && <p className="empty">Nothing matches "{query}".</p>}
      {groups.map(([group, list]) => (
        <div key={group} className="lib__group">
          <h3 className="lib__group-title">{group}</h3>
          {list.map((entry) => (
            <Accordion
              key={entry.id}
              id={id + '-' + entry.id}
              level={2}
              title={entry.title}
              meta={entry.fileName ? <span className="chip chip--mono">{entry.fileName}</span> : null}
              isOpen={autoOpen || openIds.has(entry.id)}
              onToggle={() => toggle(entry.id)}
            >
              {/* Previews mount only while the entry is open, so closed entries cost nothing. */}
              <dl className="lib__meta">
                <dt>{labels.what}</dt>
                <dd>{entry.what}</dd>
                <dt>{labels.when}</dt>
                <dd>{entry.when}</dd>
                {entry.requires && (
                  <>
                    <dt>Requires</dt>
                    <dd>{entry.requires}</dd>
                  </>
                )}
              </dl>
              {(autoOpen || openIds.has(entry.id)) && renderPreview && renderPreview(entry)}
              <CodeBlock code={entry.code} language={language} fileName={entry.fileName} onNotify={notify} />
              {entry.notes && (
                <p className="note">
                  <strong>Notes: </strong>
                  {entry.notes}
                </p>
              )}
            </Accordion>
          ))}
        </div>
      ))}
    </Accordion>
  );
}
