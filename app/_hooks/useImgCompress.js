import { useState } from 'react';
import imageCompression from 'browser-image-compression';

export function useImgCompress() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const compressImage = async (file) => {
    if (!file) return;

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.95, // Target (950KB)
        maxWidthOrHeight: 512,
        useWebWorker: true,
        fileType: 'image/jpeg', // Force JPEG for better compression
        initialQuality: 0.7,
      });

      // Ensure final size is < 1MB
      if (compressedFile.size > 1024 * 1024) {
        alert('Image compression failed. Please select a smaller image.');
        return;
      }

      setImage(compressedFile);
      setPreview(URL.createObjectURL(compressedFile));
      alert(`Image Selected Successfully.`);
    } catch (err) {
      alert('Image compression failed: ' + err.message);
      setImage(null);
      setPreview(null);
    }
  };

  return { image, preview, compressImage };
}
