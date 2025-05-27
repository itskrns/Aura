'use client';

import { useSession } from 'next-auth/react';
import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/24/outline';
import { usePostDelete } from '@/app/_hooks/usePostDelete';

export default function PostDeleteMenu({ postId, postOwnerId }) {
  const { data: session } = useSession();
  const loggedInUserId = session?.user?.userId;

  const { showMenu, setShowMenu, handleDeletePost, isOwner } = usePostDelete(
    postId,
    postOwnerId,
    loggedInUserId,
  );

  // If user is not the post owner, hide menu
  if (!isOwner) return null;

  return (
    <div className="relative">
      <button onClick={() => setShowMenu((prev) => !prev)}>
        <EllipsisVerticalIcon className="size-6 text-gray-500 hover:text-gray-800" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-36 rounded bg-white p-2 shadow-lg">
          <button
            className="flex w-full items-center gap-2 p-2 text-red-600 hover:text-red-800"
            onClick={handleDeletePost}
          >
            <TrashIcon className="size-5" />
            Delete Post
          </button>
        </div>
      )}
    </div>
  );
}
