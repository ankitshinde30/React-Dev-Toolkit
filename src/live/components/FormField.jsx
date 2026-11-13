import { useId } from 'react';

export default function FormField({
  label,
  name,
  as = 'input',
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  hint,
  required = false,
  ...rest
}) {
  const id = useId();
  const hintId = id + '-hint';
  const errorId = id + '-error';
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;
  const Control = as;

  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <Control
        id={id}
        name={name}
        type={as === 'input' ? type : undefined}
        className={as === 'input' ? 'input' : as}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        {...rest}
      />
      {hint && (
        <p id={hintId} className="field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
