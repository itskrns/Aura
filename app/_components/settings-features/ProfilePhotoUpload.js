'use client';

import Image from 'next/image';
import { useImgCompress } from '@/app/_hooks/useImgCompress';
import { useProfilePhotoUpload } from '@/app/_hooks/useProfilePhotoUpload';

export default function ProfilePhotoUpload({ curUser }) {
  const { image, preview, compressImage } = useImgCompress();
  const { uploadImage } = useProfilePhotoUpload(curUser);

  return (
    <div className="mb-4 flex items-center gap-4">
      {preview && (
        <Image
          src={preview}
          alt="Profile Preview"
          width={96}
          height={96}
          className="rounded-full object-cover"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => compressImage(e.target.files[0])}
      />
      <button
        className="rounded bg-[var(--color-secondary)] px-4 py-2 text-white"
        onClick={() => uploadImage(image)}
      >
        Upload Photo
      </button>
    </div>
  );
}
