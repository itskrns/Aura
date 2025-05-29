import { useState, useEffect } from 'react';
import supabase from '@/app/_lib/supabase';

export function usePostPreview(postId) {
  const [post, setPost] = useState(null);

  useEffect(
    function () {
      async function fetchPostDetails() {
        if (!postId) return;

        try {
          let { data, error } = await supabase
            .from('posts')
            .select(
              `
            *,
            users(username, profilePhoto),
            likes(count),
            comments(*)
          `,
            )
            .eq('id', postId)
            .single();

          if (error) {
            console.error('Error fetching post details:', error);
            return;
          }

          setPost(data);
        } catch (err) {
          console.error('Unexpected error:', err);
        }
      }

      fetchPostDetails();
    },
    [postId],
  );

  return post;
}
