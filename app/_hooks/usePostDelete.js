import { useState } from 'react';
import { deletePost } from '@/app/_services/actions';

export function usePostDelete(postId, postOwnerId, loggedInUserId) {
  const [showMenu, setShowMenu] = useState(false);

  // Function to delete the post
  const handleDeletePost = async () => {
    await deletePost(postId);
    window.history.back(); // Refresh page after deletion
  };

  return {
    showMenu,
    setShowMenu,
    handleDeletePost,
    isOwner: loggedInUserId === postOwnerId, // Determines if user can see the menu
  };
}
