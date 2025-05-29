'use client';

import Image from 'next/image';
import { useNavigation } from '@/app/_hooks/useNavigation';

export default function GridTile({ post }) {
  const { goToPostPreview } = useNavigation(post?.id);

  return (
    <div
      className="relative aspect-square cursor-pointer overflow-hidden rounded bg-gray-100"
      onClick={() => goToPostPreview(post.id)}
    >
      <Image
        src={post.image_url}
        alt={post.caption || 'Post'}
        fill
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
  );
}
