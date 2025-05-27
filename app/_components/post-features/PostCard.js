'use client';

import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostActions from './PostActions';
import PostContent from './PostContent';

export default function PostCard({ curUser, post }) {
  return (
    <div className="mb-4 grid grid-rows-[auto_1fr_auto] border-b bg-[var(--color-light)] lg:mx-auto lg:w-[70%] lg:rounded-lg lg:shadow-sm">
      <PostHeader post={post} userId={curUser.id} />

      <PostImage src={post.image_url} size={300} />

      <PostActions post={post} curUser={curUser} />

      <PostContent post={post} curUser={curUser} />
    </div>
  );
}
