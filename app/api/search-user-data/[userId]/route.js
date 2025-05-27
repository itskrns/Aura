import supabase from '@/app/_lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(req, context) {
  const userId = context?.params?.userId;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !data) return NextResponse.json({}, { status: 404 });
  return NextResponse.json(data);
}
