import { PlusIcon } from '@heroicons/react/24/solid';

export default function FollowButton({ followsMe, onClick, isFollowing }) {
  return (
    <button
      onClick={onFollow}
      className="flex items-center gap-1 rounded bg-[var(--color-secondary)] px-2 py-1 text-sm hover:bg-[var(--color-dark)] hover:text-[var(--color-secondary)]"
    >
      {followsMe ? 'Follow Back' : 'Follow'} <PlusIcon className="size-4" />
    </button>
  );
}
