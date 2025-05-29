import { useState, useEffect } from 'react';
import { followUser, unfollowUser, isFollowing } from '@/app/_services/actions';
import supabase from '@/app/_lib/supabase';

export function useFollowAction(followerId, followingId) {
  const [following, setFollowing] = useState(false);
  const [followed, setIsFollowed] = useState(false);

  useEffect(() => {
    if (!followerId || !followingId) return;

    async function checkStatus() {
      try {
        const status = await isFollowing(followerId, followingId);
        setFollowing(status);
        setIsFollowed(status);
      } catch (error) {
        console.error('Error checking status:', error);
      }
    }

    checkStatus();

    const subscription = supabase
      .channel('follows-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'follows' },
        (payload) => {
          console.log('Follow event received:', payload);
          if (
            payload.new.follower_id === followerId &&
            payload.new.following_id === followingId
          ) {
            setFollowing(true);
            setIsFollowed(true);
          }
        },
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'follows' },
        (payload) => {
          console.log('Unfollow event received:', payload);
          if (
            payload.old.follower_id === followerId &&
            payload.old.following_id === followingId
          ) {
            setFollowing(false);
            setIsFollowed(false);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [followerId, followingId]);

  async function handleFollow() {
    try {
      await followUser(followerId, followingId);
    } catch (error) {
      console.error('Follow Error:', error);
    }
  }

  async function handleUnfollow() {
    try {
      await unfollowUser(followerId, followingId);
    } catch (error) {
      console.error('Unfollow Error:', error);
    }
  }

  return {
    following,
    followed,
    handleFollow,
    handleUnfollow,
  };
}
