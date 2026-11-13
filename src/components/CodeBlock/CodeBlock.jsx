import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { copyText } from '../../utils/clipboard.js';

export default function CodeBlock({ code, language = 'css', fileName, onNotify }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function handleCopy() {
    const ok = await copyText(code);
    setCopied(ok);
    onNotify?.(ok ? 'Code copied to clipboard' : 'Copy failed. Select the code and copy it manually.');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }

  const name = fileName || language;

  return (
    <figure className="code">
      <figcaption className="code__bar">
        <span className="code__name">{name}</span>
        <button type="button" className="btn btn--sm btn--outline" onClick={handleCopy}>
          {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy code'}
        </button>
      </figcaption>
      <pre tabIndex={0} role="region" aria-label={name + ' code'}>
        <code>{code}</code>
      </pre>
    </figure>
  );
}
