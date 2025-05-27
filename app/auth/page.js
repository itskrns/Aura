import SignInButton from '@/app/_components/auth-features/SignInButton';

export const metadata = {
  title: 'Sign-In to Aura',
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <h2 className="mb-6 text-3xl font-semibold">
        Get Started with{' '}
        <span className="text-[var(--color-secondary)]">Aura</span>
      </h2>

      <SignInButton />
    </div>
  );
}
