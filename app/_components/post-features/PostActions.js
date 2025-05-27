'use client';

import { usePostActions } from '@/app/_hooks/usePostActions';
import { usePostData } from '@/app/_hooks/usePostData';
import {
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import {
  HandThumbUpIcon as ActiveLike,
  ChatBubbleOvalLeftEllipsisIcon as ActiveComment,
} from '@heroicons/react/24/solid';

export default function PostActions({ post, curUser }) {
  const { liked } = usePostData(post.id, curUser.id);
  const {
    showComments,
    comment,
    setComment,
    handleLikeClick,
    handleAddComment,
    setShowComments,
  } = usePostActions(post.id, curUser.id);

  return (
    <div className="flex justify-between border-t p-4">
      <div className="flex items-center space-x-4">
        <button onClick={handleLikeClick} aria-label="Like post">
          {liked ? (
            <ActiveLike className="size-5 text-secondary-600 lg:size-6" />
          ) : (
            <HandThumbUpIcon className="size-5 hover:text-secondary-600 lg:size-6" />
          )}
        </button>
        <button
          onClick={() => setShowComments((prev) => !prev)}
          aria-label="Toggle comments"
        >
          {showComments ? (
            <ActiveComment className="size-5 text-secondary-600 lg:size-6" />
          ) : (
            <ChatBubbleOvalLeftEllipsisIcon className="size-5 hover:text-secondary-600 lg:size-6" />
          )}
        </button>
      </div>
      <form className="flex items-center gap-1" onSubmit={handleAddComment}>
        <input
          placeholder={`Add a comment as ${curUser.username}`}
          value={comment}
          name="newComment"
          onChange={(e) => setComment(e.target.value)}
          className="w-full border-b border-[var(--color-secondary)] bg-transparent text-xs outline-none focus:bg-transparent"
        />
      </form>
    </div>
  );
}
