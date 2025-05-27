import { useState, useEffect } from 'react';
import { followUser, unfollowUser, isFollowing } from '@/app/_services/actions';
import { useSession } from 'next-auth/react';

export function useFollowAction(profileId) {
  const { data: session } = useSession();
  const [following, setFollowing] = useState(false);
  const isOwnProfile = session?.user?.userId === profileId;

  useEffect(() => {
    if (!isOwnProfile && session?.user?.userId && profileId) {
      isFollowing({ followerId: session.user.userId, followingId: profileId })
        .then(setFollowing)
        .catch(() => setFollowing(false));
    }
  }, [session?.user?.userId, profileId, isOwnProfile]);

  const handleFollow = async () => {
    await followUser({
      followerId: session.user.userId,
      followingId: profileId,
    });
    setFollowing(true);
  };

  const handleUnfollow = async () => {
    await unfollowUser({
      followerId: session.user.userId,
      followingId: profileId,
    });
    setFollowing(false);
  };

  return { following, handleFollow, handleUnfollow, isOwnProfile };
}
