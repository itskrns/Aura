import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function middleware(req) {
  const session = await getServerSession(authOptions);
  const { pathname } = req.nextUrl;

  // Agar user logged in nahi hai aur /account routes access kar raha hai, toh redirect to /auth
  if (!session && pathname.startsWith('/account')) {
    return NextResponse.redirect(new URL('/auth', req.nextUrl));
  }

  // Agar user already logged in hai aur /auth page visit kar raha hai, toh redirect to /account
  if (session && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/account', req.nextUrl));
  }

  return NextResponse.next();
}

// Middleware ko sirf specific routes par apply karna
export const config = {
  matcher: ['/account/:path*', '/auth'],
};
