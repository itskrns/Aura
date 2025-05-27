'use client';

import { usePosts } from '@/app/_hooks/usePosts';
import PostCard from '@/app/_components/post-features/PostCard';

export default function HomeFeed({ curUser }) {
  const { followedPosts } = usePosts(curUser.id);

  return (
    <div>
      {followedPosts.map((post) => (
        <PostCard post={post} key={post.id} curUser={curUser} />
      ))}
    </div>
  );
}
