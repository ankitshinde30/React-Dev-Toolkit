import { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { RotateCcw } from 'lucide-react';

const WIDTHS = [
  { id: 'fit', label: 'Fit', px: null },
  { id: 'mobile', label: 'Mobile', px: 360 },
  { id: 'tablet', label: 'Tablet', px: 768 },
  { id: 'desktop', label: 'Desktop', px: 1100 },
];

/* Helper styles used only inside previews. They are not part of any copyable code. */
const FRAME_CSS = `
.pv-body{padding:16px}
.pv-row{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.pv-col{display:flex;flex-direction:column;gap:12px}
.pv-box{padding:12px 16px;border:1px solid var(--color-border);border-radius:8px;background:var(--color-bg);font-size:14px}
.pv-note{margin:0 0 6px;font-size:12px;color:var(--color-muted)}
.pv-sw{display:grid;place-items:center;width:84px;height:52px;border:1px solid var(--color-border);border-radius:8px;color:#fff;font-size:12px;text-shadow:0 1px 2px rgb(0 0 0 / .45)}
.pv-hoverable:hover{background:var(--color-primary);color:var(--color-on-primary)}
`;

/* Tiny behaviors for previews written as plain HTML (accordion, dialog, menus, button groups). */
const BEHAVIOR = `
document.addEventListener('click', function (e) {
  var t = e.target;
  if (!t.closest) return;
  var link = t.closest('a[href="#"]');
  if (link) e.preventDefault();
  var tg = t.closest('[data-toggle]');
  if (tg) {
    var spec = tg.getAttribute('data-toggle');
    var el = spec.indexOf('closest:') === 0 ? tg.closest(spec.slice(8)) : document.querySelector(spec.slice(6));
    if (el) { var on = el.classList.toggle('is-open'); tg.setAttribute('aria-expanded', on ? 'true' : 'false'); }
  }
  var open = t.closest('[data-open-dialog]');
  if (open) { var d = document.querySelector(open.getAttribute('data-open-dialog')); if (d && d.showModal) d.showModal(); }
  var close = t.closest('[data-close-dialog]');
  if (close) { var dd = close.closest('dialog'); if (dd) dd.close(); }
  var sel = t.closest('[data-select]');
  if (sel) {
    var sibs = sel.parentNode.querySelectorAll('[data-select]');
    for (var i = 0; i < sibs.length; i++) sibs[i].setAttribute('aria-pressed', sibs[i] === sel ? 'true' : 'false');
  }
});
`;

function buildDoc({ css, html, htmlAttrs }) {
  return (
    '<!doctype html><html lang="en" ' + htmlAttrs + '><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<style>' + css + FRAME_CSS + '</style></head><body>' +
    '<div id="pv-root" class="pv-body">' + html + '</div>' +
    '<script>' + BEHAVIOR + '<\/script></body></html>'
  );
}

/**
 * Renders a live preview inside an iframe, so the example gets its own CSS, its own media queries and cannot
 * affect this app. Pass `html` for plain markup, or `children` to render real React components inside the frame.
 */
export default function PreviewFrame({ css, html = '', htmlAttrs = '', height = 180, hint, responsive = false, replay = false, children }) {
  const [widthId, setWidthId] = useState('fit');
  const [runKey, setRunKey] = useState(0);
  const [mount, setMount] = useState(null);
  const srcDoc = useMemo(() => buildDoc({ css, html, htmlAttrs }), [css, html, htmlAttrs]);
  const px = WIDTHS.find((w) => w.id === widthId).px;

  const handleLoad = useCallback((event) => {
    const doc = event.currentTarget.contentDocument;
    setMount(doc ? doc.getElementById('pv-root') : null);
  }, []);

  return (
    <div className="pv">
      <div className="pv__bar">
        <span className="pv__label">Live preview</span>
        {hint && <span className="pv__hint">{hint}</span>}
        <span className="pv__tools">
          {responsive && (
            <span className="segmented segmented--sm" role="group" aria-label="Preview width">
              {WIDTHS.map((w) => (
                <button key={w.id} type="button" className="segmented__btn" aria-pressed={widthId === w.id} onClick={() => setWidthId(w.id)}>
                  {w.label}
                </button>
              ))}
            </span>
          )}
          {replay && (
            <button
              type="button"
              className="btn btn--sm btn--outline"
              onClick={() => {
                setMount(null);
                setRunKey((k) => k + 1);
              }}
            >
              <RotateCcw size={14} aria-hidden="true" /> Replay
            </button>
          )}
        </span>
      </div>
      <div className="pv__stage">
        <iframe
          key={runKey}
          title="Live preview"
          className="pv__frame"
          srcDoc={srcDoc}
          style={{ height, width: px ? px + 'px' : '100%' }}
          onLoad={handleLoad}
        />
        {children && mount && createPortal(children, mount)}
      </div>
    </div>
  );
}
