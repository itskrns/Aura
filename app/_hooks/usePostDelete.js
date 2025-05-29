import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deletePost } from '@/app/_services/actions';

export function usePostDelete(postId) {
  const [showMenu, setShowMenu] = useState(false);

  const router = useRouter();

  async function handleDeletePost() {
    await deletePost(postId);
    router.push('/account');
  }

  return {
    showMenu,
    setShowMenu,
    handleDeletePost,
  };
}
