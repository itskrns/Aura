'use client';
import { useFollowAction } from '@/app/_hooks/useFollowAction';

export default function FollowButton({ followingId, followerId }) {
  const { following, followed, handleUnfollow, handleFollow } = useFollowAction(
    followerId,
    followingId,
  );

  if (!followingId && !followerId) return;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        following ? handleUnfollow() : handleFollow();
        window.location.reload();
      }}
    >
      <button
        className="flex items-center gap-1 rounded bg-[var(--color-secondary)] px-2 py-1 text-sm hover:bg-[var(--color-dark)] hover:text-[var(--color-secondary)]"
        type="submit"
      >
        {followed ? 'Disconnect' : 'Connect +'}
      </button>
    </form>
  );
}
