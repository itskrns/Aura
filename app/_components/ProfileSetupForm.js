'use client';

import { useForm } from 'react-hook-form';
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
    name: 'Phone',
    placeholder: 'Phone',
    validation: {
      pattern: { value: /^[0-9]+$/, message: 'Invalid Phone number' },
    },
  },
];

export default function ProfileSetupForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <>
      <div className="w-full max-w-md rounded-lg border-[1px] border-[var(--color-border)] bg-[var(--color-light)] p-12 text-[var(--color-primary)] shadow-2xl">
        <form className="space-y-6">
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
          <div className="mt-4 flex justify-between">
            {message && <p className="text-sm text-red-500">{message}</p>}

            <Button type="submit" label="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
