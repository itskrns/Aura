import { useState, useEffect } from 'react';
import supabase from '@/app/_lib/supabase';

export function useProfileStats(userId) {
  const [followers, setFollowers] = useState(0);
  const [followings, setFollowings] = useState(0);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const { count: followersCount } = await supabase
          .from('follows')
          .select('*', { count: 'exact', head: true })
          .eq('following_id', userId);

        const { count: followingsCount } = await supabase
          .from('follows')
          .select('*', { count: 'exact', head: true })
          .eq('follower_id', userId);

        const { count: postsCount } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId);

        setFollowers(followersCount || 0);
        setFollowings(followingsCount || 0);
        setPostCount(postsCount || 0);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    }

    if (userId) fetchCounts();
  }, [userId]);

  return { followers, followings, postCount };
}
