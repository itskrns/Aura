import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function SearchBox() {
  return (
    <form className="flex items-center gap-1">
      <input
        type="text"
        placeholder="Search"
        className="rounded-md border-none bg-[var(--color-border)] px-3 py-1 text-sm outline-none placeholder:text-xs focus:bg-[var(--color-focus)]"
      />
      <button>
        <MagnifyingGlassIcon className="size-6 font-bold hover:text-[var(--color-hover)]" />
      </button>
    </form>
  );
}
