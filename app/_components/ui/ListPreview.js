'use client';

import CloseButton from './CloseButton';
import { useState } from 'react';
import photo from '@/public/globe.svg';
import ProfilePhoto from '../profile-features/ProfilePhoto';
import FollowButton from './FollowButton';
import { useNavigation } from '@/app/_hooks/useNavigation';

export default function ListPreview({ curUser, listData, label }) {
  const [closePreview, setClosePreview] = useState(false);
  const { goToUserProfile } = useNavigation();

  if (!listData && !curUser) return;

  function handlePreview() {
    setClosePreview(true);
    window.history.back();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll bg-black/10 backdrop-blur-sm">
      <CloseButton closeModal={handlePreview} />
      <div className="scrollbar-hide relative flex max-h-[80vh] w-[30vw] flex-col overflow-y-auto scroll-smooth rounded-lg bg-white shadow-lg">
        <div className="p-3">
          <h2 className="mb-2 text-xl font-semibold text-[--color-secondary]">
            {label}
          </h2>
          {listData &&
            listData.map((profile) => (
              <>
                <div
                  className="mb-2 flex w-full cursor-pointer items-center justify-between rounded-md bg-[var(--color-light)] px-3 py-1 text-[var(--color-light)] shadow-md transition-all duration-200 hover:translate-y-1"
                  onClick={() => goToUserProfile(profile?.id)}
                  key={profile.id}
                >
                  <span className="flex items-center gap-1">
                    <ProfilePhoto
                      src={profile?.users?.profilePhoto || photo}
                      size={40}
                    />
                    <h6 className="text-[var(--color-dark)]">
                      {profile?.users?.username}
                    </h6>
                  </span>

                  <FollowButton
                    followerId={curUser?.id}
                    followingId={profile?.id}
                  />
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}
