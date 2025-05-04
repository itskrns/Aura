import ProfilePhoto from './ProfilePhoto';
import photo from '../../public/globe.svg';
import { PlusIcon } from '@heroicons/react/24/solid';

const profiles = [
  { username: 'username1', photo },
  { username: 'username2', photo },
  { username: 'username3', photo },
  { username: 'username4', photo },
  { username: 'username5', photo },
  { username: 'username6', photo },
  { username: 'username7', photo },
  { username: 'username8', photo },
  { username: 'username9', photo },
  { username: 'username10', photo },
];

export default function SuggestionsCardMini() {
  return (
    <>
      <div className="cursor-pointer rounded-md pb-[4rem] pt-2">
        {profiles.map((profile) => {
          return (
            <div
              className="mb-2 flex w-full items-center justify-between rounded-md bg-[var(--color-light)] px-3 py-1 text-[var(--color-light)] shadow-md transition-all duration-200 hover:-translate-y-1"
              key={profile.username}
            >
              <span className="flex items-center gap-1">
                <ProfilePhoto src={profile.photo} size={40} />
                <h6 className="text-[var(--color-dark)]">{profile.username}</h6>
              </span>

              <button className="flex items-center gap-1 rounded bg-[var(--color-secondary)] px-2 py-1 text-sm hover:bg-[var(--color-dark)] hover:text-[var(--color-secondary)]">
                Connect <PlusIcon className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
