import { useState, useEffect } from 'react';
import { followUser, unfollowUser, isFollowing } from '@/app/_services/actions';
import { useParams } from 'next/navigation';

export function useFollowAction(userId) {
  const params = useParams();
  const [following, setFollowing] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    async function checkFollowStatus() {
      if (params?.userId === userId) {
        setIsOwnProfile(true);
        return;
      }

      setIsOwnProfile(false);

      const followed = await isFollowing({
        followerId: params.userId,
        followingId: userId,
      });
      setFollowing(followed);
    }

    checkFollowStatus();
  }, [params?.userId, userId]);

  async function handleFollow() {
    const alreadyFollowing = await isFollowing({
      followerId: params.userId,
      followingId: userId,
    });

    if (!alreadyFollowing) {
      await followUser({ followerId: params.userId, followingId: userId });
      setFollowing(true);
    }
  }

  async function handleUnfollow() {
    await unfollowUser({ followerId: params.userId, followingId: userId });
    setFollowing(false);
  }

  return {
    following,
    handleFollow,
    handleUnfollow,
    isOwnProfile,
  };
}
