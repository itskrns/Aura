import { useState, useEffect } from 'react';
import {
  likePost,
  unlikePost,
  deleteComment,
  addComment,
  getPostLikes,
  getPostComments,
} from '@/app/_services/actions';

export function usePostActions(postId, curUserId) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);

  // Fetch initial post data
  useEffect(() => {
    async function fetchData() {
      if (postId && curUserId) {
        const { count, liked } = await getPostLikes(postId, curUserId);
        setLikesCount(count);
        setLiked(liked);
      }
      if (postId) {
        const comm = await getPostComments(postId);
        setAllComments(comm || []);
      }
    }
    fetchData();
  }, [postId, curUserId]);

  // Auto-show comments when new comment is added
  useEffect(() => {
    setShowComments(allComments.length > 0);
  }, [allComments]);

  function handleShowComments() {
    setShowComments((prev) => !prev);
  }

  async function handleDeleteComment(commentId) {
    await deleteComment(commentId);
    setAllComments((prevComments) =>
      prevComments.filter((_, index) => index !== commentId),
    );
  }

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

  async function handleAddComment() {
    if (!comment.trim() || !postId || !curUserId) return;
    try {
      await addComment(postId, curUserId, comment);
      setAllComments((prev) => [
        ...prev,
        { username: { username }, content: comment },
      ]);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }

  return {
    liked,
    likesCount,
    comment,
    setComment,
    allComments,
    showComments,
    handleDeleteComment,
    handleShowComments,
    handleAddComment,
    handleLikeClick,
  };
}
