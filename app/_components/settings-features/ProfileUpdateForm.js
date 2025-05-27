'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { updateUser } from '@/app/_services/actions';

export default function ProfileUpdateForm({ curUser }) {
  const router = useRouter();
  const { update } = useSession();

  return (
    <form
      action={async (formData) => {
        await updateUser(formData);
        await update();
        router.push('/account/profile');
      }}
      className="mb-6"
    >
      {/* Username */}
      <label className="mb-1 block font-semibold" htmlFor="username">
        Update Username
      </label>
      <input
        id="username"
        name="username"
        type="text"
        defaultValue={curUser?.username || ''}
        placeholder="Enter new username"
        className="w-full rounded border-none bg-[var(--color-light)] px-4 py-2"
        required
      />

      {/* Email */}
      <label className="mb-1 mt-4 block font-semibold" htmlFor="email">
        Update Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        defaultValue={curUser?.email || ''}
        placeholder="Enter new email"
        className="w-full rounded border-none bg-[var(--color-light)] px-4 py-2"
      />

      {/* Full Name */}
      <label className="mb-1 mt-4 block font-semibold" htmlFor="fullName">
        Full Name
      </label>
      <input
        id="fullName"
        name="fullName"
        type="text"
        defaultValue={curUser?.fullName || ''}
        placeholder="Enter full name"
        className="w-full rounded border-none bg-[var(--color-light)] px-4 py-2"
      />

      {/* Bio */}
      <label className="mb-1 mt-4 block font-semibold" htmlFor="bio">
        Bio
      </label>
      <textarea
        id="bio"
        name="bio"
        defaultValue={curUser?.bio || ''}
        placeholder="Write something about yourself..."
        className="w-full rounded border-none bg-[var(--color-light)] px-4 py-2"
        rows={4}
        maxLength={250}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-8 w-full rounded bg-[var(--color-secondary)] px-6 py-2 text-white"
      >
        Save Changes
      </button>
    </form>
  );
}
