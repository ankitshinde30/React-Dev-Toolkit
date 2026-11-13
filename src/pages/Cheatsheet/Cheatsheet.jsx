import { Code } from 'lucide-react';
import CodeLibrary from '../../components/CodeLibrary/CodeLibrary.jsx';
import PreviewFrame from '../../components/PreviewFrame/PreviewFrame.jsx';
import { cssCheatsheet, buildCssBundle } from '../../data/cssCheatsheet.js';
import { getCssPreview } from '../../data/cssPreviews.js';

function renderPreview(entry) {
  const preview = getCssPreview(entry);
  if (!preview) {
    return (
      <p className="pv-note-empty">
        No visual preview: this entry sets page-level behavior (such as global defaults, scrolling, print or bundling) that has nothing to show on its own.
      </p>
    );
  }
  return <PreviewFrame {...preview} />;
}

export default function Cheatsheet({ notify }) {
  return (
    <CodeLibrary
      id="css"
      title="INDEX.CSS — MASTER CSS CHEATSHEET"
      icon={<Code size={18} aria-hidden="true" />}
      intro="Open an entry to see a live preview, the explanation and the code. Use Copy all CSS for one file (variables come first). Values are starting points: replace colors, sizes and breakpoints with your approved design tokens."
      entries={cssCheatsheet}
      labels={{ what: 'What it does', when: 'When to use it' }}
      language="css"
      copyAllLabel="Copy all CSS"
      buildCopyAll={buildCssBundle}
      renderPreview={renderPreview}
      notify={notify}
    />
  );
}
