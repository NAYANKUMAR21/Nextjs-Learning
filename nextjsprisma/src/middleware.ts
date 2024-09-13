import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isStaticResource = path.startsWith('/_next') || path === '/favicon.ico';

  if (isStaticResource) {
    return new NextResponse(null, { status: 404 });
  }

  const token = request.cookies.get('token')?.value || '';

  if (path == '/' && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  const isAuthPath = path == '/login' || path === '/signup';

  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  const response = NextResponse.next();
  response.headers.set('X-Comming-From', 'middleware'); // Use a custom header
  return response;
}
export const config = {
  matcher: ['/login', '/signup', '/'],
};
