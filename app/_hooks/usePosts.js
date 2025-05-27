import { useState, useEffect } from 'react';
import supabase from '@/app/_lib/supabase';

export function usePosts(userId) {
  const [posts, setPosts] = useState({
    userPosts: [],
    followedPosts: [],
    unfollowedPosts: [],
  });

  useEffect(
    function () {
      async function fetchPosts() {
        if (!userId) return;

        // Fetch all posts with user details, likes, and comments
        let { data: posts, error } = await supabase
          .from('posts')
          .select(
            `
          *,
          users(profilePhoto, username), 
          likes(count), 
          comments(id, content, user_id)
        `,
          )
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching posts:', error);
          return;
        }

        // Fetch followed users list
        let { data: followingData } = await supabase
          .from('follows')
          .select('following_id')
          .eq('follower_id', userId);

        let followedUserIds =
          followingData?.map(function (item) {
            return item.following_id;
          }) || [];

        let userPosts = posts.filter(function (post) {
          return post.user_id === userId;
        });

        let followedPosts = posts.filter(function (post) {
          return followedUserIds.includes(post.user_id);
        });

        let unfollowedPosts = posts.filter(function (post) {
          return (
            !followedUserIds.includes(post.user_id) && post.user_id !== userId
          );
        });

        setPosts({
          userPosts: userPosts,
          followedPosts: followedPosts,
          unfollowedPosts: unfollowedPosts,
        });
      }

      fetchPosts();
    },
    [userId],
  );

  return posts;
}
