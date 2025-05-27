'use client';

import { useState, useEffect } from 'react';
import supabase from '@/app/_lib/supabase';
import photo from '@/public/globe.svg';
import ProfilePhoto from '../profile-features/ProfilePhoto';
import FollowButton from './FollowButton';
import { useNavigation } from '@/app/_hooks/useNavigation';

export default function FollowersList({ userId }) {
  const { goToUserProfile } = useNavigation();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    async function fetchFollowers() {
      const { data, error } = await supabase
        .from('follows')
        .select('follower_id, users:username, users:profilePhoto')
        .eq('following_id', userId)
        .order('users.username', { ascending: true });

      if (!error) {
        setFollowers(data);
      }
    }

    fetchFollowers();
  }, [userId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-[--color-secondary]">
        Followers
      </h2>
      <div className="mt-4 space-y-3">
        {followers.length === 0 ? (
          <p>No followers found.</p>
        ) : (
          followers.map((profile) => (
            <div
              key={profile.follower_id}
              className="mb-2 flex w-full cursor-pointer items-center justify-between rounded-md bg-[var(--color-light)] px-3 py-1 text-[var(--color-light)] shadow-md transition-all duration-200 hover:translate-y-1"
              onClick={() => goToUserProfile(profile.follower_id)}
            >
              <span className="flex items-center gap-1">
                <ProfilePhoto src={profile.profilePhoto || photo} size={40} />
                <h6 className="text-[var(--color-dark)]">{profile.username}</h6>
              </span>
              <FollowButton userId={profile.follower_id} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
