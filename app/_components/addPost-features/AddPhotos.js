'use client';

import { usePostUpload } from '@/app/_hooks/usePostUpload';
import { usePostCreation } from '@/app/_hooks/usePostCreation';
import PhotoPreview from './PhotoPreview';
import CaptionInput from './CaptionInput';
import PhotoAction from './PhotoAction';
import { useState } from 'react';

export default function AddPhotos() {
  const { image, preview, handleFileChange, handleRemoveImage } =
    usePostUpload();
  const { handleUpload } = usePostCreation();
  const [caption, setCaption] = useState('');

  // Open camera for direct image capture
  const openCamera = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-6">
      <h1 className="mb-4 text-xl font-semibold text-[var(--color-dark)]">
        Add a Post
      </h1>

      {/* Image Preview */}
      <PhotoPreview preview={preview} />

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      {!preview && (
        <>
          <button
            className="mb-2 rounded bg-[var(--color-border)] px-4 py-2"
            onClick={openCamera}
          >
            Open Camera
          </button>

          <label
            htmlFor="fileInput"
            className="cursor-pointer rounded bg-[var(--color-secondary)] px-4 py-2 text-[var(--color-white)]"
          >
            Choose from Gallery
          </label>
        </>
      )}

      {preview && (
        <>
          {/* Caption Input */}
          <CaptionInput caption={caption} setCaption={setCaption} />

          {/* Image Actions (Remove & Upload) */}
          <PhotoAction
            preview={preview}
            handleRemoveImage={handleRemoveImage}
            handleUpload={() => handleUpload(image, caption)}
          />
        </>
      )}
    </div>
  );
}
