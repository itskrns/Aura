export default function Button({
  children,
  label,
  onClick,
  type = 'button',
  disabled,
  styles,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`mt-4 rounded-lg px-4 py-2 font-semibold text-[var(--color-light)] ${label === 'back' ? 'bg-primary-400 hover:bg-primary-500' : 'bg-[var(--color-dark)] hover:bg-[var(--color-secondary)]'} ${styles}`}
    >
      {children}
    </button>
  );
}
