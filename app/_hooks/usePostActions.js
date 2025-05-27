import { useState, useEffect } from 'react';
import {
  likePost,
  unlikePost,
  addComment,
  getPostComments,
} from '@/app/_services/actions';

export function usePostActions(postId, curUserId) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Fetch initial post data
  useEffect(() => {
    async function fetchPostData() {
      if (!postId || !curUserId) return;
      const postComments = await getPostComments(postId);
      setComments(postComments || []);
    }
    fetchPostData();
  }, [postId, curUserId]);

  async function handleLikeClick() {
    if (!postId || !curUserId) return;
    try {
      if (liked) {
        await unlikePost(postId, curUserId);
        setLikesCount((count) => Math.max(0, count - 1));
      } else {
        await likePost(postId, curUserId);
        setLikesCount((count) => count + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  }

  async function handleAddComment(e) {
    e.preventDefault();
    if (!comment.trim() || !postId || !curUserId) return;
    try {
      await addComment(postId, curUserId, comment);
      setComment('');
      setShowComments(true);
      const updatedComments = await getPostComments(postId);
      setComments(updatedComments || []);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }

  return {
    liked,
    likesCount,
    showComments,
    comment,
    comments,
    setComment,
    handleLikeClick,
    handleAddComment,
    setShowComments,
  };
}
