import ProfilePhoto from './ProfilePhoto';
import photo from '../../public/globe.svg';
import { Bars3Icon } from '@heroicons/react/24/solid';

const buttons = [
  { label: 'posts', value: 0 },
  { label: 'followers', value: 0 },
  { label: 'following', value: 0 },
];

export default function ProfileCard() {
  return (
    <>
      <div className="flex justify-between border-b-[1px] border-[var(--color-border)] px-4 py-2 lg:justify-center">
        <h6 className="text-sm">username</h6>

        <button className="lg:hidden">
          <Bars3Icon className="size-6" />
        </button>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
        <span className="col-start-1 row-span-3 row-start-1 grid place-items-center px-4">
          <ProfilePhoto src={photo} size={100} />
        </span>

        <div className="col-start-2 row-start-1">
          <h2 className="pt-2 text-lg font-semibold text-secondary-600">
            Full Name
          </h2>
        </div>

        <span className="col-start-2 row-start-2 text-sm italic">
          Coming very soon....
        </span>

        <div className="col-start-2 row-start-3">
          <span className="flex gap-4 py-2">
            {buttons.map((button) => (
              <button
                className="hover:text-[var(--color-hover)]"
                key={button.label}
              >
                <span className="text-sm">{button.value}</span>
                <br />
                <span className="text-xs capitalize">{button.label}</span>
              </button>
            ))}
          </span>
        </div>
      </div>
    </>
  );
}
