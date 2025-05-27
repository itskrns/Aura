'use client';

import GridTile from './GridTile';

export default function Grid({ posts }) {
  if (!posts || posts.length === 0) {
    return <div className="text-center text-gray-500">No posts yet.</div>;
  }

  return (
    <div className="grid w-full grid-cols-3 gap-2">
      {posts.map((post) => (
        <GridTile key={post.id} post={post} />
      ))}
    </div>
  );
}
