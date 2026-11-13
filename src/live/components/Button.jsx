import { forwardRef } from 'react';

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size,
    loading = false,
    block = false,
    leftIcon = null,
    rightIcon = null,
    className = '',
    type = 'button',
    disabled = false,
    children,
    ...rest
  },
  ref
) {
  const classes = [
    'btn',
    'btn--' + variant,
    size ? 'btn--' + size : '',
    block ? 'btn--block' : '',
    loading ? 'btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
});

export default Button;

// Usage: <Button variant="outline" size="sm" loading={saving} onClick={save}>Save</Button>
