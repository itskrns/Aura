import { useFollowAction } from '@/app/_hooks/useFollowAction';

export default function FollowButton({ userId }) {
  const { following, handleFollow, handleUnfollow, isOwnProfile } =
    useFollowAction(userId);

  return (
    <button
      onClick={following ? handleUnfollow : handleFollow}
      className="flex items-center gap-1 rounded bg-[var(--color-secondary)] px-2 py-1 text-sm hover:bg-[var(--color-dark)] hover:text-[var(--color-secondary)]"
    >
      {following ? 'Unfollow' : 'Follow'}
    </button>
  );
}
