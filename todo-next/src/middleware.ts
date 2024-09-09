import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';
  const isPublicPath =
    path === '/login' ||
    path === '/signup' ||
    path == '/verifyemail' ||
    path === '/forgotpassword' ||
    path == '/:slug';

  if (isPublicPath && token) {
    console.log('Herer.....', path, '12', token);
    let newPath = new URL('/', request.nextUrl);
    return NextResponse.redirect(newPath);
  }

  if (!isPublicPath && !token) {
    let newPath = new URL('/login', request.nextUrl);
    return NextResponse.redirect(newPath);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/verifyemail',
    '/forgotpassword',
    '/:slug',
  ],
};
