'use client';

import ProfileLayout from '@/app/_components/profile-features/ProfileLayout';
import { useParams } from 'next/navigation';
import useSearchProfile from '@/app/_hooks/useSearchProfile';
import { usePosts } from '@/app/_hooks/usePosts';

export default function UserProfile() {
  const params = useParams();
  const profileData = useSearchProfile(params.userId);
  const { userPosts } = usePosts(params.userId);

  if (!profileData) return <p>Loading profile...</p>;

  return <ProfileLayout curUser={profileData} posts={userPosts} />;
}
