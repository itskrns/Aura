'use client';

import { useProfileStats } from '@/app/_hooks/useProfileStats';
import { useNavigation } from '@/app/_hooks/useNavigation';
import FollowButton from '../ui/FollowButton';

export default function ProfileStats({ curUser, userId }) {
  const isOwnProfile = curUser?.id === userId;

  const { followers, followings, postCount } = useProfileStats(curUser.id);

  const { goToFollowers, goToFollowing } = useNavigation();

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
          onClick={goToFollowing}
        >
          <span className="text-sm">{followings}</span>
          <br />
          <span className="text-xs capitalize">Following</span>
        </button>
      </span>

      {/* Follow/Unfollow Button */}
      {!isOwnProfile && (
        <div className="mt-2 flex justify-start">
          <FollowButton followingId={curUser.id} followerId={userId} />
        </div>
      )}
    </div>
  );
}
