'use client';

import CloseButton from './CloseButton';
import { useState } from 'react';
import List from '@/app/_components/ui/List';

export default function ListPreview({ curUser, listData, type }) {
  const [closePreview, setClosePreview] = useState(false);
  const [results, setResults] = useState(listData);

  if (listData.length === 0) {
    <div>No data yet!</div>;
  }

  function handlePreview() {
    setClosePreview(true);
    window.history.back();
  }

  const handleRemove = (id) => {
    setResults(results.filter((profile) => profile.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll bg-black/10 backdrop-blur-sm">
      <CloseButton closeModal={handlePreview} />
      <div className="scrollbar-hide relative flex max-h-[80vh] flex-col overflow-y-auto scroll-smooth rounded-lg bg-white shadow-lg">
        <div className="flex-grow p-5 text-black">
          {listData.length !== 0 &&
            listData.map((profile) => {
              <List
                profile={profile}
                curUser={curUser?.id}
                onBtnClick={handleRemove}
              />;
            })}
        </div>
      </div>
    </div>
  );
}
