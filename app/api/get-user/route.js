import { NextResponse } from 'next/server';
import supabase from '@/app/_lib/supabase';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const { data, error } = await supabase
    .from('users')
    .select('id, username, fullName, profilePhoto, bio')
    .eq('id', id)
    .single();
  if (error || !data) return NextResponse.json({}, { status: 404 });
  return NextResponse.json(data);
}
