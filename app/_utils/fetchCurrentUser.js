import { getSession } from 'next-auth/react';
import { getUser } from '@/app/_services/actions';

export async function fetchCurrentUser() {
  const session = await getSession();

  if (!session?.user?.email) {
    console.log('User not found!');
    return null;
  }

  const curUser = await getUser(session.user.email);

  return curUser;
}
