import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

/** Native <dialog> modal: focus is trapped, Escape closes, focus returns to the opener. */
export default function Modal({ open, title, onClose, children }) {
  const ref = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return undefined;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.body.classList.toggle('no-scroll', open);
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onMouseDown={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      {open && (
        <div className="modal__panel">
          <div className="modal__head">
            <h2 id={titleId}>{title}</h2>
            <button type="button" className="icon-btn" aria-label="Close dialog" onClick={onClose}>
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}
