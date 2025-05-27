import Image from 'next/image';

export default function GridTile({ post }) {
  return (
    <div className="relative aspect-square cursor-pointer overflow-hidden rounded bg-gray-100">
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
