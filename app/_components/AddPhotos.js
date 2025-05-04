'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddPhotos() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const router = useRouter();

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Ensure previous preview URL is revoked before setting a new one
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Remove selected image
  const handleRemoveImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview); // Revoke existing object URL to free memory
    }
    setImage(null);
    setPreview(null);
  };

  // Simulate image upload process
  const handleUpload = () => {
    if (!image) return;

    console.log('Uploading image...', image);

    setTimeout(() => {
      alert('Image uploaded successfully!');
      router.push('/');
    }, 1000);
  };

  // Open camera
  const openCamera = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-6">
      <h1 className="mb-4 text-xl font-semibold text-[var(--color-dark)]">
        Add a Post
      </h1>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mb-4 h-48 w-48 object-cover"
        />
      )}

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
          <button
            className="mt-4 rounded bg-[var(--color-border)] px-4 py-2 text-sm text-red-600"
            onClick={handleRemoveImage}
          >
            Remove Image
          </button>

          <button
            className="mt-4 rounded bg-[var(--color-light)] px-4 py-2 text-[var(--color-white)]"
            onClick={handleUpload}
          >
            Upload & Exit
          </button>
        </>
      )}
    </div>
  );
}
