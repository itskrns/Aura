import ProfileUpdateForm from '@/app/_components/settings-features/ProfileUpdateForm';
import ProfilePhotoUpload from '@/app/_components/settings-features/ProfilePhotoUpload';
import SignOutButton from '@/app/_components/auth-features/SignOutButton';
import ToggleTheme from '@/app/_components/ui/toggleTheme';
import { getUser } from '@/app/_services/actions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_lib/authOptions';

export const metadata = {
  title: 'Settings',
  description: 'Next Social Media Platform',
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    console.log('User not found!');
    return null;
  }

  const curUser = await getUser(session.user.email);

  return (
    <div className="px-8 pt-4">
      <h1 className="mb-6 text-2xl font-bold text-[var(--color-secondary)]">
        Settings
      </h1>

      {/* Profile Photo Upload Section */}
      <ProfilePhotoUpload curUser={curUser} />

      {/* Profile Update Form Section */}
      <ProfileUpdateForm curUser={curUser} />

      {/* Mobile-only: Dark Mode Toggle & Logout */}
      <div className="md:block lg:hidden">
        <span className="mb-6 flex items-center justify-between">
          <span className="font-semibold">Dark Mode</span>
          <ToggleTheme />
        </span>

        {/* Logout Button */}
        <SignOutButton />
      </div>
    </div>
  );
}
