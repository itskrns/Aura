import Image from 'next/image';

export default function ProfilePhoto({ size, src, alt = 'image' }) {
  return (
    <div
      style={{ height: size, width: size }}
      className={`relative overflow-hidden rounded-full border-[2px] border-[var(--color-border)]`}
    >
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
