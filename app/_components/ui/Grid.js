'use client';

import GridTile from './GridTile';
import { useState } from 'react';

export default function Grid({ curUser }) {
  const [posts, setPosts] = useState(0);

  if (!posts || posts.length === 0) {
    return <div className="text-center text-gray-500">No posts yet.</div>;
  }

  return (
    <div className="grid w-full grid-cols-3 gap-2">
      <GridTile />
      <GridTile />
      <GridTile />
      <GridTile />
      <GridTile />
      <GridTile />
      <GridTile />
      <GridTile />
    </div>
  );
}

/*
export default function PostsGrid({ posts }) {
  const { navigateToPost } = usePostNavigation();

  if (!posts || posts.length === 0) {
    return <div className="text-center text-gray-500">No posts yet.</div>;
  }

  return (
    <div className="grid w-full grid-cols-3 gap-2">
      {posts.map((post) => (
        <div
          key={post.id}
          className="relative aspect-square cursor-pointer overflow-hidden rounded bg-gray-100"
          onClick={() => navigateToPost(post.id)}
        >
          <Image
            src={post.image_url}
            alt={post.caption || 'Post'}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}
*/
