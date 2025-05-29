'use client';

import ProfileInfo from './ProfileInfo';
import Grid from '../ui/Grid';
import { usePosts } from '@/app/_hooks/usePosts';

export default function ProfileLayout({ searchedUser, sessionUser }) {
  let curUser = !searchedUser ? sessionUser : searchedUser;
  const { userPosts } = usePosts(curUser?.id);

  return (
    <div className="grid h-full grid-rows-[auto_1fr] overflow-hidden rounded bg-[var(--color-light)] text-[var(--color-dark)]">
      <span className="static row-start-1">
        <ProfileInfo curUser={curUser} userId={sessionUser.id} />
      </span>

      <span className="scrollbar-hide row-start-2 mb-[4rem] mt-[3rem] overflow-y-auto scroll-smooth lg:mb-1">
        <Grid posts={userPosts} />
      </span>
    </div>
  );
}
