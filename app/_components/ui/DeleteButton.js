import { XMarkIcon } from '@heroicons/react/24/solid';

export default function DeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 rounded-full bg-none p-1 text-sm text-[var(--color-secondary)] hover:text-red-700"
    >
      <XMarkIcon className="size-5" />
    </button>
  );
}
