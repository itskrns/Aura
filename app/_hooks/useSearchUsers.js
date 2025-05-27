import { useState } from 'react';

export function useSearchUsers() {
  const [query, setQuery] = useState('');

  const searchUsers = async (onResults) => {
    if (!query.trim()) return;
    try {
      const res = await fetch(
        `/api/search-users?q=%${encodeURIComponent(query)}%`,
      );
      const users = await res.json();
      if (onResults) onResults(users);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return { query, setQuery, searchUsers };
}
