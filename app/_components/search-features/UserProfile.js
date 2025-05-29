'use client';

import ProfileLayout from '@/app/_components/profile-features/ProfileLayout';
import { useParams } from 'next/navigation';
import useSearchProfile from '@/app/_hooks/useSearchProfile';

export default function UserProfile({ curUser }) {
  const params = useParams();
  const searchedUser = useSearchProfile(params.userId);

  if (!searchedUser) return <p>Loading profile...</p>;

  return <ProfileLayout searchedUser={searchedUser} sessionUser={curUser} />;
}
