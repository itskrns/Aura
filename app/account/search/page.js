import SearchPageLayout from '@/app/_components/search-features/SearchPageLayout';
import { getUser } from '@/app/_services/actions';
import { getServerSession } from 'next-auth';
import { getPostsByUserId } from '@/app/_services/actions';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const metadata = {
  title: 'Search Page',
  description: 'Next Social Media Platform',
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    console.log('User not found!');
    return null;
  }

  const curUser = await getUser(session.user.email);

  const posts = await getPostsByUserId(curUser.id);

  return <SearchPageLayout curUser={curUser} posts={posts} />;
}
