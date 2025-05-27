'use client';

import CloseButton from './CloseButton';
import PostCard from '../post-features/PostCard';
import { useState } from 'react';
import { usePostPreview } from '@/app/_hooks/usePostPreview';

export default function PostPreview({ curUser }) {
  const [closePreview, setClosePreview] = useState(false);
  const post = usePostPreview();

  function handlePreview() {
    setClosePreview(true);
  }

  return (
    <>
      {!closePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg">
          <div className="relative flex h-[80vh] w-[70vw] flex-col overflow-hidden rounded-lg bg-white shadow-lg">
            <CloseButton closeModal={handlePreview} />
            <div className="flex-grow overflow-y-auto p-5">
              <PostCard curUser={curUser} post={post} />;
            </div>
          </div>
        </div>
      )}
    </>
  );
}
