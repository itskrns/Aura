import Image from 'next/image';

export default function Post({ src, alt = 'post' }) {
  return (
    <div className="cursor-pointer border-[1px] border-[var(--color-border)] shadow-sm hover:border-[var(--color-hover)]">
      <Image
        src={src}
        alt={alt}
        className="aspect-square w-full object-cover"
      />
    </div>
  );
}
