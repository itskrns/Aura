import Image from 'next/image';

export default function PostImage({ src, size }) {
  return (
    <div className={`relative aspect-square w-full h-[${size}]`}>
      <Image
        src={src}
        alt="Post"
        fill
        className={`rounded-b-md object-cover`}
      />
    </div>
  );
}
