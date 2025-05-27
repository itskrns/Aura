import { useState } from 'react';

export function usePostUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle file selection & preview generation
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (preview) URL.revokeObjectURL(preview); // Cleanup previous preview
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Generate new preview
  };

  // Remove selected image & reset inputs
  const handleRemoveImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setImage(null);
    setPreview(null);
  };

  return { image, preview, handleFileChange, handleRemoveImage };
}
