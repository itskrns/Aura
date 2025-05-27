'use client';

import List from '../ui/List';
import { useSuggestions } from '@/app/_hooks/useSuggestions';

export default function SuggestionsList({ curUser }) {
  const { suggestions } = useSuggestions(curUser.id);

  if (suggestions.length === 0) return;

  return (
    <>
      <h3 className="text-sm text-[var(--color-secondary)]">
        Suggested Profiles
      </h3>

      <span className="scrollbar-hide flex-1 cursor-pointer overflow-y-auto scroll-smooth rounded-md pb-[4rem] pt-2">
        {suggestions.map((profile) => {
          profile.username && <List profile={profile} key={profile.id} />;
        })}
      </span>
    </>
  );
}
