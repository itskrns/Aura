'use client';

import { useState } from 'react';
import SearchBox from './SearchBox';
import List from '../ui/List';
import Grid from '../ui/Grid';
import { usePosts } from '@/app/_hooks/usePosts';

export default function SearchPageLayout({ curUser, posts }) {
  const [results, setResults] = useState([]);

  const { unfollowedPosts } = usePosts(curUser.id);

  const handleRemove = (id) => {
    setResults(results.filter((profile) => profile.id !== id));
  };

  return (
    <div>
      <span className="mb-[1px] flex justify-center border-b-[1px] border-[var(--color-border)] bg-[var(--color-light)] py-2 text-center">
        <SearchBox onResults={setResults} />
      </span>

      <span className="scrollbar-hide row-start-2 mb-[6rem] mt-[3rem] overflow-y-auto scroll-smooth lg:mb-0">
        {results.length > 0 ? (
          <ul>
            {results.map(
              (profile) =>
                profile.username && (
                  <List
                    profile={profile}
                    key={profile.id}
                    isSearch={true}
                    onBtnClick={handleRemove}
                  />
                ),
            )}
          </ul>
        ) : (
          <Grid posts={unfollowedPosts} />
        )}
      </span>
    </div>
  );
}
