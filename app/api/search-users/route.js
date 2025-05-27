import { NextResponse } from 'next/server';
import supabase from '@/app/_lib/supabase';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');
  const { data, error } = await supabase
    .from('users')
    .select('id, username, fullName, profilePhoto')
    .ilike('username', `%${q}%`)
    .limit(10);
  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data);
}
