export default function ProgressBar({ value, label, size = 'md' }) {
  return (
    <span
      className={'progress progress--' + size}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <span className="progress__fill" style={{ width: value + '%' }} />
    </span>
  );
}
