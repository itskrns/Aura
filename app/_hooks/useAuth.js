'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  isUserExists,
  signInWithEmail,
  createUser,
  updateUser,
} from '@/app/_lib/auth.js';

export default function useAuth() {
  const [message, setMessage] = useState('');
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();

  async function signIn(data) {
    const exists = await isUserExists(data.email);

    if (!exists) {
      await createUser(data.email);
      router.push(`/auth/signup?email=${data.email}`);
    }

    await signInWithEmail(data.email);
    setMessage('Check your email for Verification Link!!');
  }

  async function signUp(data) {
    const user = await updateUser(data);

    if (!user) setMessage('Error creating user!!');

    await signInWithEmail(data.email);
    setMessage('Check your email for Verification Link!!');
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    signIn,
    signUp,
    message,
  };
}
