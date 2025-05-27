import { useEffect, useState } from 'react';

export function useUserProfile(userId) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchUserAndPosts() {
      if (!userId) return;

      try {
        const res = await fetch(`/api/get-user?id=${userId}`);
        const data = await res.json();
        setUser(data);

        const postsRes = await fetch(`/api/get-user-posts?userId=${userId}`);
        const postsData = await postsRes.json();
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }

    fetchUserAndPosts();
  }, [userId]);

  return { user, posts };
}
