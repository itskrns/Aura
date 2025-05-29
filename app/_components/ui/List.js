'use client';

import photo from '@/public/globe.svg';
import ProfilePhoto from '../profile-features/ProfilePhoto';
import DeleteButton from './DeleteButton';
import FollowButton from './FollowButton';
import { useNavigation } from '@/app/_hooks/useNavigation';

export default function List({
  profile,
  isSearch = false,
  onBtnClick,
  userId,
}) {
  const { goToUserProfile } = useNavigation();

  return (
    <div
      className="mb-2 flex w-full cursor-pointer items-center justify-between rounded-md bg-[var(--color-light)] px-3 py-1 text-[var(--color-light)] shadow-md transition-all duration-200 hover:translate-y-1"
      onClick={() => goToUserProfile(profile.id)}
    >
      <span className="flex items-center gap-1">
        <ProfilePhoto src={profile.profilePhoto || photo} size={40} />
        <h6 className="text-[var(--color-dark)]">{profile.username}</h6>
      </span>

      <span className="flex items-center gap-1">
        {!isSearch && (
          <FollowButton followerId={userId} followingId={profile.id} />
        )}

        <DeleteButton onClick={() => onBtnClick(profile.id)} />
      </span>
    </div>
  );
}
