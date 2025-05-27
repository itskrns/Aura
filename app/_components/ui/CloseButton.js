'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';

export default function CloseButton() {
  return (
    <button
      className="absolute right-4 top-4 z-10 cursor-pointer rounded-full bg-white p-1 hover:bg-gray-300"
      onClick={() => window.history.back()}
      aria-label="Close"
      type="button"
    >
      <XMarkIcon className="size-6 text-[var(--color-primary)]" />
    </button>
  );
}
