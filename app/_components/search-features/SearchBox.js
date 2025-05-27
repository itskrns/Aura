'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useSearchUsers } from '@/app/_hooks/useSearchUsers';

export default function SearchBox({ onResults }) {
  const { query, setQuery, searchUsers } = useSearchUsers();

  return (
    <form
      className="flex items-center gap-1"
      onSubmit={(e) => {
        e.preventDefault();
        searchUsers(onResults);
      }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="rounded-md border-none bg-[var(--color-border)] px-3 py-1 text-sm outline-none placeholder:text-xs focus:bg-[var(--color-focus)]"
      />
      <button>
        <MagnifyingGlassIcon className="size-6 font-bold hover:text-[var(--color-hover)]" />
      </button>
    </form>
  );
}
