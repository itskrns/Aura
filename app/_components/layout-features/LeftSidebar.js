'use client';

import { usePathname } from 'next/navigation';
import ProfileCard from '../profile-features/ProfileCard';
import SuggestionsList from '../suggestion-features/SuggestionsList';

export default function LeftSidebar({ curUser }) {
  const pathname = usePathname();

  return (
    <aside className="mt-2 flex h-screen flex-col gap-1 px-4">
      <span
        className={`static ${pathname === '/account/profile' ? 'hidden' : ''} my-4`}
      >
        <ProfileCard curUser={curUser} />
      </span>

      <SuggestionsList curUser={curUser} />
    </aside>
  );
}
