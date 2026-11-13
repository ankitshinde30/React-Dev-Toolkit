import { FileCode } from 'lucide-react';
import CodeLibrary from '../../components/CodeLibrary/CodeLibrary.jsx';
import PreviewFrame from '../../components/PreviewFrame/PreviewFrame.jsx';
import { reactSnippets, buildSnippetBundle } from '../../data/reactSnippets.js';
import { buildCssBundle } from '../../data/cssCheatsheet.js';
import { reactDemos } from '../../previews/reactDemos.jsx';

/* The demos are styled with the full cheatsheet stylesheet, so they also prove the CSS works together. */
const demoCss = buildCssBundle();

function renderPreview(entry) {
  const demo = reactDemos[entry.title];
  if (!demo) return null;
  if (demo.note) return <p className="pv-note-empty">{demo.note}</p>;
  const { Demo } = demo;
  return (
    <PreviewFrame css={demoCss} height={demo.height} responsive={demo.responsive} hint={demo.defaultNote} replay>
      <Demo />
    </PreviewFrame>
  );
}

export default function Snippets({ notify }) {
  return (
    <CodeLibrary
      id="react"
      title="REACT REUSABLE CODE SNIPPETS"
      icon={<FileCode size={18} aria-hidden="true" />}
      intro="Open a snippet to run the real component in a live preview, then copy the code. Written for React 18, Vite and react-router-dom 6. Class names match the CSS cheatsheet."
      entries={reactSnippets}
      labels={{ what: 'Explanation', when: 'Where to use it' }}
      language="jsx"
      copyAllLabel="Copy all snippets"
      buildCopyAll={buildSnippetBundle}
      renderPreview={renderPreview}
      notify={notify}
    />
  );
}
