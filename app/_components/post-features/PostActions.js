'use client';

import { usePostActions } from '@/app/_hooks/usePostActions';
import {
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import {
  HandThumbUpIcon as ActiveLike,
  ChatBubbleOvalLeftEllipsisIcon as ActiveComment,
  TrashIcon,
} from '@heroicons/react/24/solid';

export default function PostActions({ post, curUser }) {
  const {
    liked,
    comment,
    likesCount,
    allComments,
    setComment,
    showComments,
    handleLikeClick,
    handleAddComment,
    handleShowComments,
    handleDeleteComment,
  } = usePostActions(post?.id, curUser?.id);

  return (
    <>
      <div className="flex justify-between border-t p-4">
        <div className="flex items-center space-x-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLikeClick();
            }}
          >
            <button aria-label="Like post" type="submit">
              {liked ? (
                <ActiveLike className="size-5 text-secondary-600 lg:size-6" />
              ) : (
                <HandThumbUpIcon className="size-5 hover:text-secondary-600 lg:size-6" />
              )}
            </button>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleShowComments();
            }}
          >
            <button aria-label="Toggle comments" type="submit">
              {showComments ? (
                <ActiveComment className="size-5 text-secondary-600 lg:size-6" />
              ) : (
                <ChatBubbleOvalLeftEllipsisIcon className="size-5 hover:text-secondary-600 lg:size-6" />
              )}
            </button>
          </form>
        </div>

        <form
          className="flex items-center gap-1"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddComment();
          }}
        >
          <input
            placeholder={`Add a comment as ${curUser.username}`}
            value={comment}
            name="newComment"
            onChange={(e) => setComment(e.target.value)}
            className="w-full border-b border-[var(--color-secondary)] bg-transparent text-xs outline-none focus:bg-transparent"
          />
        </form>
      </div>
      <div className="flex flex-col px-4 py-1">
        <p className="text-sm font-semibold">{likesCount} likes</p>
        <p className="mt-1 text-sm">
          <span className="font-semibold">{post.users.username}</span>{' '}
          {post.caption}
        </p>
        {allComments?.length > 0 && (
          <div className="mt-1 text-xs">
            {allComments.map((comment, index) => (
              <p
                key={index}
                className="flex w-full items-center justify-between"
              >
                <span>
                  <span className="font-semibold">
                    {comment.users.username}
                  </span>
                  : {comment.content}
                </span>

                {(curUser?.id === comment.user_id ||
                  curUser?.id === post.user_id) && (
                  <button onClick={() => handleDeleteComment(index)}>
                    <TrashIcon className="size-3 text-[var(--color-secondary)]" />
                  </button>
                )}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
