import { useState, useEffect } from 'react';
import { getPostLikes, getPostComments } from '@/app/_services/actions';

export function usePostData(postId, curUserId) {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (postId && curUserId) {
        const { count, liked } = await getPostLikes(postId, curUserId);
        setLikesCount(count);
        setLiked(liked);
      }
      if (postId) {
        const comm = await getPostComments(postId);
        setComments(comm || []);
      }
    }
    fetchData();
  }, [postId, curUserId]);

  return { likesCount, liked, comments, setComments };
}
