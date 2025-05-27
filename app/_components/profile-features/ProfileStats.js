'use client';

import { useProfileStats } from '@/app/_hooks/useProfileStats';
import { useFollowAction } from '@/app/_hooks/useFollowAction';
import { useNavigation } from '@/app/_hooks/useNavigation';
import FollowButton from '../ui/FollowButton';

export default function ProfileStats({ curUser }) {
  const { followers, followings, postCount } = useProfileStats(curUser.id);

  const { following, handleFollow, handleUnfollow, isOwnProfile } =
    useFollowAction(curUser.id);

  const { goToFollowers, goToFollowings } = useNavigation();

  return (
    <div className="col-start-2 row-start-3 mt-4">
      {/* Posts, Followers, Following */}
      <span className="flex gap-4 py-2">
        <button className="hover:text-[var(--color-hover)]">
          <span className="text-sm">{postCount}</span>
          <br />
          <span className="text-xs capitalize">Posts</span>
        </button>

        <button
          className="hover:text-[var(--color-hover)]"
          onClick={goToFollowers}
        >
          <span className="text-sm">{followers}</span>
          <br />
          <span className="text-xs capitalize">Followers</span>
        </button>

        <button
          className="hover:text-[var(--color-hover)]"
          onClick={goToFollowings}
        >
          <span className="text-sm">{followings}</span>
          <br />
          <span className="text-xs capitalize">Following</span>
        </button>
      </span>

      {/* Follow/Unfollow Button */}
      <div className="mt-2 flex justify-start">
        {following ? (
          <FollowButton onClick={handleUnfollow} isFollowing={following} />
        ) : (
          <FollowButton onClick={handleFollow} isFollowing={following} />
        )}
      </div>
    </div>
  );
}
