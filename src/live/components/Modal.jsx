import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

export default function Modal({ open, title, onClose, children, footer }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();

    const body = dialog.ownerDocument.body;
    body.classList.toggle('no-scroll', open);
    return () => body.classList.remove('no-scroll');
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onMouseDown={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      {open && (
        <>
          <div className="modal__header">
            <h2 id={titleId}>{title}</h2>
            <button type="button" className="btn btn--ghost btn--icon" aria-label="Close dialog" onClick={onClose}>
              <X aria-hidden="true" />
            </button>
          </div>
          <div className="modal__body">{children}</div>
          {footer && <div className="modal__footer">{footer}</div>}
        </>
      )}
    </dialog>
  );
}

// Usage:
// const [open, setOpen] = useState(false);
// <button type="button" onClick={() => setOpen(true)}>Open</button>
// <Modal open={open} title="Delete item?" onClose={() => setOpen(false)}>...</Modal>
