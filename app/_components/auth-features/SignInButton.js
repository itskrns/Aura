'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function SignInButton() {
  return (
    <div className="flex items-center justify-center rounded-xl bg-[var(--color-primary)] p-8 shadow-md">
      <button
        className="flex items-center gap-6 rounded border border-none bg-[var(--color-secondary)] px-10 py-4 text-lg font-medium hover:bg-[var(--color-bg)]"
        onClick={() => signIn('google', { callbackUrl: '/account' })}
      >
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </div>
  );
}
