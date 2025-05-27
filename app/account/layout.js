import AppLayout from '@/app/_components/layout-features/AppLayout';
import { getUser } from '@/app/_services/actions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const metadata = {
  title: 'Aura',
  description: 'Next Social Media Platform',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    console.log('User not found!');
    return null;
  }

  const curUser = await getUser(session.user.email);

  return (
    <html lang="en">
      <body>
        <AppLayout curUser={curUser}>{children}</AppLayout>
      </body>
    </html>
  );
}
