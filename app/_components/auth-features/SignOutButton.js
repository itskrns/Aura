'use client';

import { PowerIcon } from '@heroicons/react/24/solid';
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/auth' })}
      title="Sign out"
      className="flex items-center"
    >
      <PowerIcon className="size-5 hover:text-[var(--color-hover)]" />
    </button>
  );
}
