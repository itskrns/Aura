'use client';

import { usePostData } from '@/app/_hooks/usePostData';
import { usePostActions } from '@/app/_hooks/usePostActions';

export default function PostContent({ post, curUser }) {
  const { likesCount, comments } = usePostData(post.id, curUser.id);
  const { showComments } = usePostActions(post.id, curUser.id);

  return (
    <div className="flex flex-col px-4 py-1">
      <p className="text-sm font-semibold">{likesCount} likes</p>
      <p className="mt-1 text-sm">
        <span className="font-semibold">{post.users.username}</span>{' '}
        {post.caption}
      </p>
      {showComments && comments?.length > 0 && (
        <div className="mt-1 text-xs">
          {comments.map(({ username, text }, index) => (
            <p key={index}>
              <span className="font-semibold">{username}</span>: {text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
