'use client';

import useAuth from '@/app/_hooks/useAuth.js';
import Button from './Button.js';

export default function SignInForm() {
  const { handleSubmit, register, errors, message, isSubmitting, signIn } =
    useAuth();

  return (
    <div className="w-full max-w-md rounded-lg border-[1px] border-[var(--color-border)] bg-[var(--color-light)] p-12 text-[var(--color-primary)] shadow-2xl">
      <h2 className="mb-2 text-lg text-[var(--color-primary)]">
        Sign In / Log In
      </h2>
      <form onSubmit={handleSubmit(signIn)}>
        <input
          {...register('email', { required: 'Email address is required' })}
          placeholder="Email Address"
          className="w-full border-b border-[var(--color-border)] bg-transparent pt-3 outline-none focus:border-[var(--color-primary)]"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}

        <Button
          type="submit"
          label="submit"
          styles="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending Link' : 'Send Verification Link'}
        </Button>
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </form>
    </div>
  );
}
