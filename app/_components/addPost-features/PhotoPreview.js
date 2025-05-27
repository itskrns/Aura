import Image from 'next/image';

export default function PhotoPreview({ preview }) {
  if (!preview) return null;

  return (
    <Image
      src={preview}
      alt="Preview"
      width={192}
      height={192}
      className="mb-4 rounded-lg object-cover"
    />
  );
}
