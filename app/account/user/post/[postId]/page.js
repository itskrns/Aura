import PostPreview from '@/app/_components/post-features/PostPreview';
import { getUser } from '@/app/_services/actions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_lib/authOptions';

export const metadata = {
  title: 'See Posts',
  description: 'Next Social Media Platform',
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    console.log('User not found!');
    return null;
  }

  const curUser = await getUser(session.user.email);

  return <PostPreview curUser={curUser} />;
}
