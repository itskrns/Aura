'use client';

import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/24/outline';
import { usePostDelete } from '@/app/_hooks/usePostDelete';

export default function PostDeleteMenu({ postId }) {
  const { showMenu, setShowMenu, handleDeletePost } = usePostDelete(postId);

  return (
    <div className="relative">
      <button onClick={() => setShowMenu((prev) => !prev)}>
        <EllipsisVerticalIcon className="size-6 text-gray-500 hover:text-gray-800" />
      </button>

      {showMenu && (
        <div className="absolute right-0 z-10 mt-2 w-36 rounded bg-white p-2 shadow-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleDeletePost();
            }}
          >
            <button
              className="flex w-full items-center gap-2 p-2 text-red-600 hover:text-red-800"
              type="submit"
            >
              Delete Post
              <TrashIcon className="size-5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
