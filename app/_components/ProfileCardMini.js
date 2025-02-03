import ProfilePhoto from './ProfilePhoto';
import photo from '../../public/globe.svg';

export default function ProfileCardMini() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 rounded-md bg-[var(--color-primary)] p-4 text-[var(--color-light)] shadow-md">
      <ProfilePhoto src={photo} size={100} />

      <span className="text-center">
        <h2 className="text-lg font-semibold text-secondary-600">Full Name</h2>
        <h6 className="text-sm">@username</h6>
      </span>

      <span className="flex gap-4 text-center">
        <button className="text-sm hover:text-[var(--color-hover)]">
          Followers
          <br />0
        </button>
        <span className="border-[1px] border-secondary-600"></span>
        <button className="text-sm hover:text-[var(--color-hover)]">
          Followings
          <br />0
        </button>
      </span>
    </div>
  );
}
