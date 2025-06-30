import ListPreview from '@/app/_components/ui/ListPreview';
import { getUser } from '@/app/_services/actions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_lib/authOptions';
import { getFollowing } from '@/app/_services/actions';

export const metadata = {
  title: 'Following List',
  description: 'Next Social Media Platform',
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    console.log('User not found!');
    return null;
  }

  const curUser = await getUser(session.user.email);

  const following = await getFollowing(curUser?.id);

  return (
    <ListPreview
      curUser={curUser}
      listData={following}
      label="Accounts you Follow"
    />
  );
}
