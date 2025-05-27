'use client';

import { useState } from 'react';
import SearchBox from './SearchBox';
import List from '../ui/List';
import Grid from '../ui/Grid';

export default function SearchPage({ curUser }) {
  const [results, setResults] = useState([]);

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
          <Grid curUser={curUser} />
        )}
      </span>
    </div>
  );
}

/*
const router = useRouter();

  const handleUserClick = (user) => {
    router.push(`/account/search/userProfile?id=${user.id}`);
  };


  <span className="scrollbar-hide row-start-2 mb-[6rem] mt-[3rem] overflow-y-auto scroll-smooth lg:mb-0">
        {results.length > 0 ? (
          <ul>
            {results.map((user) => (
              <li key={user.id}>
                <button
                  className="flex items-center gap-2 rounded px-3 py-2 hover:bg-[var(--color-border)]"
                  onClick={() => handleUserClick(user)}
                >
                  <Image
                    src={user.profilePhoto || '/default-profile.png'}
                    alt={user.username}
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span className="font-medium">{user.username}</span>
                  {user.fullName && (
                    <span className="ml-2 text-xs text-gray-500">
                      {user.fullName}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <PostsGrid curUser={curUser} />
        )}
      </span>
*/
