'use client';

import { usePathname } from 'next/navigation';
import ProfileCardMini from './ProfileCardMini';
import SuggestionsCardMini from './SuggestionsCardMini';

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <div className="mt-2 flex h-screen flex-col gap-1 px-4">
      <span
        className={`static ${pathname === '/account' ? 'hidden' : ''} my-4`}
      >
        <ProfileCardMini />
      </span>

      <h3 className="text-sm text-[var(--color-secondary)]">
        Suggested Profiles
      </h3>
      <span className="scrollbar-hide flex-1 overflow-y-auto scroll-smooth">
        <SuggestionsCardMini />
      </span>
    </div>
  );
}
