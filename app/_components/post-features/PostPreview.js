'use client';

import CloseButton from '../ui/CloseButton';
import PostCard from './PostCard';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { usePostPreview } from '@/app/_hooks/usePostPreview';

export default function PostPreview({ curUser }) {
  const [closePreview, setClosePreview] = useState(false);
  const params = useParams();
  const postId = params?.postId;

  const post = usePostPreview(postId);

  if (!post) return;

  function handlePreview() {
    setClosePreview(true);
    window.history.back();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll bg-black/10 backdrop-blur-sm">
      <CloseButton closeModal={handlePreview} />
      <div className="scrollbar-hide relative flex h-[80vh] min-w-[40vw] flex-col overflow-y-auto scroll-smooth rounded-lg bg-[var(--color-dark)] shadow-lg">
        <div className="flex-grow py-3">
          <PostCard curUser={curUser} post={post} />
        </div>
      </div>
    </div>
  );
}

/*


  if (!curUser?.id) {
    return null;
  }

  

  return (
    <>
      {!closePreview && (
        
      )}
    </>
*/
