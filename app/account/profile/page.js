import { getUser } from '@/app/_services/actions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_lib/authOptions';
import ProfileLayout from '@/app/_components/profile-features/ProfileLayout';

export const metadata = {
  title: 'Profile',
  description: 'Next Social Media Platform',
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    console.log('User not found!');
    return null;
  }

  const curUser = await getUser(session.user.email);

  return <ProfileLayout sessionUser={curUser} />;
}
