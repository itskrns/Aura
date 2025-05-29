'use client';

import { usePosts } from '@/app/_hooks/usePosts';
import PostCard from '@/app/_components/post-features/PostCard';
import { sortPosts } from '@/app/_utils/helper';

export default function HomeFeed({ curUser }) {
  const { followedPosts, userPosts } = usePosts(curUser.id);

  if (!followedPosts && !userPosts) {
    return <p>No Posts yet!</p>;
  }

  const posts = sortPosts(followedPosts, userPosts);

  return (
    <div>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} curUser={curUser} />
      ))}
    </div>
  );
}
