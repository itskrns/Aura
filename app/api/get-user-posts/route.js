import { NextResponse } from 'next/server';
import supabase from '@/app/_lib/supabase';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data);
}
