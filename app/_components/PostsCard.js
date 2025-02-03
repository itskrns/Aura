'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import {
  ChatBubbleOvalLeftEllipsisIcon as ActiveComment,
  HandThumbUpIcon as ActiveLike,
} from '@heroicons/react/24/solid';
import ProfilePhoto from './ProfilePhoto';

const comments = [];

export default function PostsCard({
  profilePic,
  username,
  postImage,
  likes,
  caption,
  timeAgo,
}) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [formData, setFormData] = useState({
    username: 'username',
    comment: '',
  });

  function handleLikeClick() {
    setLiked((like) => !like);

    liked
      ? setLikesCount((count) => count - 1)
      : setLikesCount((count) => count + 1);
  }

  function handleAddComment(e) {
    e.preventDefault();
    comments.push(formData);
    setFormData({ username: 'mr.krns', comment: '' });
    setShowComments(true);
  }

  return (
    <div className="mb-4 grid grid-rows-[auto_1fr_auto] border-b border-[var(--color-border)] bg-[var(--color-light)] lg:mx-auto lg:w-[70%] lg:rounded-lg lg:border lg:shadow-sm">
      <div className="flex items-center gap-2 p-2">
        <ProfilePhoto size={30} src={profilePic} />
        <p className="text-sm font-semibold">{username}</p>
      </div>

      <div className="relative aspect-square w-full">
        <Image
          src={postImage}
          alt="Post"
          fill
          className="rounded-b-md object-cover"
        />
      </div>

      <div className="mt-1 border-t-[1px] border-[var(--color-border)] p-4">
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={handleLikeClick}>
              {liked ? (
                <ActiveLike className="size-5 text-secondary-600 lg:size-6" />
              ) : (
                <HandThumbUpIcon className="size-5 hover:text-secondary-600 lg:size-6" />
              )}
            </button>
            <button onClick={() => setShowComments((show) => !show)}>
              {showComments ? (
                <ActiveComment className="size-5 text-secondary-600 lg:size-6" />
              ) : (
                <ChatBubbleOvalLeftEllipsisIcon className="size-5 hover:text-secondary-600 lg:size-6" />
              )}
            </button>
          </div>

          <div>
            <form
              className="flex items-center gap-1"
              onSubmit={(e) => handleAddComment(e)}
            >
              <input
                placeholder={`Add a comment as ${formData.username}`}
                value={formData.comment}
                name="newComment"
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                className="w-full border-b border-[var(--color-secondary)] bg-transparent text-xs outline-none focus:bg-transparent"
              />
            </form>
          </div>
        </div>

        <div>
          <p className="mt-2 text-sm font-semibold">{likesCount} likes</p>
          <p className="mt-1 text-sm">
            <span className="font-semibold">{username}</span> {caption}
          </p>
        </div>

        <div className={`mt-1 text-xs ${!showComments ? 'hidden' : ''}`}>
          {comments.map((user, index) => (
            <p key={index}>
              {user.username}: {user.comment}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
