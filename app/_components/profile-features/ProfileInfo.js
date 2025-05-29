'use client';

import { Bars3Icon } from '@heroicons/react/24/solid';
import ProfilePhoto from './ProfilePhoto';
import ProfileStats from './ProfileStats';
import photo from '@/public/globe.svg';
import Link from 'next/link';

export default function ProfileInfo({ curUser, userId }) {
  return (
    <>
      {/* Username Header */}
      <div className="flex justify-between gap-4 border-b-[1px] border-[var(--color-border)] px-4 py-2 lg:justify-center">
        <h6 className="text-sm">{curUser.username}</h6>
        <Link className="lg:hidden" href="/account/settings">
          <Bars3Icon className="size-6" />
        </Link>
      </div>

      {/* Profile Details */}
      <div className="mb-4 grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
        {/* Profile Photo */}
        <span className="col-start-1 row-span-3 row-start-1 grid place-items-center px-4">
          <ProfilePhoto src={curUser.profilePhoto || photo} size={100} />
        </span>

        {/* Full Name */}
        <div className="col-start-2 row-start-1">
          <h2 className="pt-2 text-lg font-semibold text-secondary-600">
            {curUser.fullName}
          </h2>
        </div>

        {/* Bio Section */}
        <span className="col-start-2 row-start-2 text-sm italic">
          {curUser.bio}
        </span>

        <ProfileStats curUser={curUser} userId={userId} />
      </div>
    </>
  );
}
