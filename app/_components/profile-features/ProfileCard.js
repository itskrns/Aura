'use client';

import ProfilePhoto from './ProfilePhoto';
import { useProfileStats } from '@/app/_hooks/useProfileStats';

export default function ProfileCard({ curUser }) {
  const { followers, followings } = useProfileStats(curUser.id);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 rounded-md bg-[var(--color-primary)] p-4 text-[var(--color-light)] shadow-md">
      <ProfilePhoto src={curUser?.profilePhoto} size={100} />

      <span className="text-center">
        <h2 className="text-lg font-semibold text-secondary-600">
          {curUser?.fullName}
        </h2>
        <h6 className="text-sm">@{curUser?.username}</h6>
      </span>

      <span className="flex gap-4 text-center">
        <button className="text-sm hover:text-[var(--color-hover)]">
          Followers
          <br />
          {followers}
        </button>
        <span className="border-[1px] border-secondary-600"></span>
        <button className="text-sm hover:text-[var(--color-hover)]">
          Followings
          <br />
          {followings}
        </button>
      </span>
    </div>
  );
}
