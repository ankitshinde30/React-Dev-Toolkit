import Modal from './Modal.jsx';

export default function ConfirmDialog({
  open = false,
  title = '',
  body = '',
  label = 'Confirm',
  danger = false,
  secondary = null,
  onConfirm = () => {},
  onCancel = () => {},
}) {
  return (
    <Modal open={open} title={title} onClose={onCancel}>
      <p className="modal__text">{body}</p>
      <div className="modal__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          Cancel
        </button>
        {secondary && (
          <button type="button" className="btn btn--outline" onClick={secondary.onClick}>
            {secondary.label}
          </button>
        )}
        <button type="button" className={'btn ' + (danger ? 'btn--danger' : 'btn--primary')} onClick={onConfirm}>
          {label}
        </button>
      </div>
    </Modal>
  );
}
