'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';

export default function CloseButton({ closeModal }) {
  return (
    <button
      className="absolute right-4 top-4 z-10 cursor-pointer rounded-full bg-red-500 p-1 hover:bg-red-800"
      onClick={closeModal}
      type="button"
    >
      <XMarkIcon className="size-6 text-[var(--color-primary)]" />
    </button>
  );
}
