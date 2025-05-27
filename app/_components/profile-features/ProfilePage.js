'use client';

import ProfileInfo from './ProfileInfo';
import Grid from '../ui/Grid';

export default function ProfilePage({ curUser, posts }) {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] overflow-hidden rounded bg-[var(--color-light)] text-[var(--color-dark)]">
      <span className="static row-start-1">
        <ProfileInfo cur={curUser} />
      </span>

      <span className="scrollbar-hide row-start-2 mb-[4rem] mt-[3rem] overflow-y-auto scroll-smooth lg:mb-1">
        <Grid posts={posts} />
      </span>
    </div>
  );
}
