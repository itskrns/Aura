'use server';

import { supabase } from './supabase.js';

export async function signInWithEmail(email) {
  try {
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) throw error.message;

    return true;
  } catch (error) {
    console.error(error.message);
  }
}

export async function isUserExists(email) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error.message;

    return data !== null;
  } catch (error) {
    console.error(error.message);
  }
}

export async function createUser(email) {
  try {
    const { error } = await supabase
      .from('users')
      .upsert({
        email,
        username: '',
        fullName: '',
        phone: '',
        bio: '',
      })
      .select();

    if (error) throw error.message;

    return true;
  } catch (error) {
    console.error(error.message);
  }
}

export async function updateUser(data) {
  try {
    const { error } = await supabase
      .from('users')
      .update({
        username: data.username,
        fullName: data.fullName,
        phone: data.phone,
        bio: data.bio,
      })
      .eq('email', data.email);

    if (error) throw error.message;

    return true;
  } catch (error) {
    console.error(error.message);
  }
}
