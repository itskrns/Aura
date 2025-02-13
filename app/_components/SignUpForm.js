'use client';

import useAuth from '@/app/_hooks/useAuth.js';
import { useSearchParams } from 'next/navigation';
import Button from './Button';

export const fields = [
  {
    name: 'username',
    placeholder: 'Username',
    validation: {
      required: 'Username is required',
      minLength: {
        value: 3,
        message: 'Username must be at least 3 characters',
      },
    },
  },
  {
    name: 'fullName',
    placeholder: 'Full Name',
  },
  {
    name: 'bio',
    placeholder: 'Bio',
    validation: {
      maxLength: { value: 150, message: 'Bio must be under 150 characters' },
    },
  },
  {
    name: 'phone',
    placeholder: 'Phone',
    validation: {
      pattern: { value: /^[0-9]+$/, message: 'Invalid Phone number' },
    },
  },
];

export default function SignUpForm() {
  const { register, errors, handleSubmit, signUp, message, isSubmitting } =
    useAuth();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <>
      <div className="w-full max-w-md rounded-lg border-[1px] border-[var(--color-border)] bg-[var(--color-light)] p-12 text-[var(--color-primary)] shadow-2xl">
        <form className="space-y-6" onSubmit={handleSubmit(signUp)}>
          <div>
            <input
              {...register('email')}
              value={email}
              disabled={true}
              className="w-full border-b border-[var(--color-border)] bg-transparent pt-3 outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          {fields.map((field) => (
            <div key={field.name}>
              <input
                {...register(field.name, field.validation)}
                placeholder={field.placeholder}
                className="w-full border-b border-[var(--color-border)] bg-transparent pt-3 outline-none focus:border-[var(--color-primary)]"
              />
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-500">
                  {errors[field.name].message}
                </p>
              )}
            </div>
          ))}
          <div className="mt-4 flex items-center justify-between">
            <Button type="submit" label="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving' : 'Save'}
            </Button>
            {message && <p className="text-sm text-red-500">{message}</p>}
          </div>
        </form>
      </div>
    </>
  );
}
