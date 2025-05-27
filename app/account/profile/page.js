import { getSession } from '@/app/_lib/getSession';
import { getUser } from '@/app/_services/actions';
import { getPostsByUserId } from '@/app/_services/actions';
import ProfilePage from '@/app/_components/profile-features/ProfilePage';

export default async function Page() {
  const session = await getSession();

  if (!session?.user?.email) {
    return <div>User not Found!!</div>;
  }

  const curUser = await getUser(session.user.email);

  const posts = await getPostsByUserId(curUser.id);

  return <ProfilePage curUser={curUser} posts={posts} />;
}
