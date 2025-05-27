import { useState, useEffect } from 'react';
import supabase from '@/app/_lib/supabase';

export function useSuggestions(userId) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!userId) {
      console.error('userId is undefined!');
      return;
    }

    const fetchFollowedUserIds = async () => {
      const { data: followedUsers, error } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', userId);

      if (error) {
        console.error('Supabase Fetch Error:', error);
        return [];
      }

      return followedUsers.map((user) => user.following_id) || [];
    };

    const fetchSuggestions = async () => {
      const followedUserIds = await fetchFollowedUserIds();

      if (!Array.isArray(followedUserIds)) {
        console.error('followedUserIds is not an array:', followedUserIds);
        return;
      }

      // Ensure `.not('id', 'in', ...)` receives valid data
      const validFollowedUserIds =
        followedUserIds.length > 0 ? followedUserIds : [-1];

      const { data: allUsers, error: usersError } = await supabase
        .from('users')
        .select('*')
        .not('id', 'in', `(${userId}, ${validFollowedUserIds})`);

      if (usersError) {
        console.error('Supabase Users Fetch Error:', usersError);
        return;
      }

      const enrichedSuggestions = await Promise.all(
        allUsers.map(async (user) => {
          const { data: isFollowingMe } = await supabase
            .from('follows')
            .select('*')
            .eq('follower_id', user.id)
            .eq('following_id', userId);

          return { ...user, followsMe: isFollowingMe.length > 0 };
        }),
      );

      setSuggestions(enrichedSuggestions);
    };

    fetchSuggestions();
  }, [userId]);

  return { suggestions };
}
