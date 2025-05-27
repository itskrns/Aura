import photo from '@/public/globe.svg';
import ProfilePhoto from '../profile-features/ProfilePhoto';
import DeleteButton from './DeleteButton';
import FollowButton from './FollowButton';

export default function List({ profile, isSearch = false, onBtnClick }) {
  return (
    <div
      className="mb-2 flex w-full items-center justify-between rounded-md bg-[var(--color-light)] px-3 py-1 text-[var(--color-light)] shadow-md transition-all duration-200 hover:translate-y-1"
      key={profile.id}
    >
      <span className="flex items-center gap-1">
        <ProfilePhoto src={profile.profilePhoto || photo} size={40} />
        <h6 className="text-[var(--color-dark)]">{profile.username}</h6>
      </span>

      {isSearch ? (
        <DeleteButton onClick={() => onBtnClick(profile.id)} />
      ) : (
        <FollowButton />
      )}
    </div>
  );
}
