import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { PREFERRED_LANG_COOKIE } from './constants/storage.constants';
import { AUTH_COOKIE_KEY } from './helpers/session';

export function middleware(request: NextRequest) {
  // Redirect to login page if user is not authenticated and navigate to dashboard.
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const isAuthenticated = request.cookies.get(AUTH_COOKIE_KEY)?.value;
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const locale = request.nextUrl.locale;
    const preffreredLanguage = request.cookies.get(PREFERRED_LANG_COOKIE)
      ?.value;

    if (locale && preffreredLanguage && locale !== preffreredLanguage) {
      const url = request.nextUrl.clone();
      url.locale = preffreredLanguage;

      // it should change the path of the url with new locale
      // TODO: need to replace with redirect after the issue is fixed by Next.js team in new Next.js version.
      // issue Link : https://github.com/vercel/next.js/issues/49883
      return NextResponse.rewrite(url);
    }
  }

  // Redirect to dashboard if user is authenticated and navigate to login page.
  if (request.nextUrl.pathname === '/login') {
    const isAuthenticated = request.cookies.get(AUTH_COOKIE_KEY)?.value;
    if (isAuthenticated) {
      return NextResponse.redirect(
        new URL('dashboard', request.nextUrl.origin)
      );
    }
  }
}
