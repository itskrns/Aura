import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_lib/authOptions';

export async function getSession() {
  return getServerSession(authOptions);
}
