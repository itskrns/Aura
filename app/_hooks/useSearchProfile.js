import { useState, useEffect } from 'react';

export default function useSearchProfile(userId) {
  const [profileData, setProfileData] = useState(null);

  useEffect(
    function () {
      async function fetchProfile() {
        try {
          if (!userId) return;

          let res = await fetch(`/api/search-user-data/${userId}`);
          let data = await res.json();

          setProfileData(data);
        } catch (error) {
          console.error('Error fetching profile', error);
        }
      }

      fetchProfile();
    },
    [userId],
  );

  return profileData;
}
