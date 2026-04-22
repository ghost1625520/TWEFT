import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // STRICT CHECK: Redirect to a config-error page or just block if critical
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('/rest/v1')) {
    console.error('CRITICAL: Supabase environment variables are missing or misconfigured.');
    return response; 
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session
  const { data: { user } } = await supabase.auth.getUser();

  const isAuthPage = request.nextUrl.pathname.startsWith('/portal/dashboard') || 
                     request.nextUrl.pathname.startsWith('/admin');

  // Protect portal and admin routes
  if (isAuthPage && !user) {
    return NextResponse.redirect(new URL('/portal', request.url));
  }

  // Admin and Staff only for /admin
  if (request.nextUrl.pathname.startsWith('/admin') && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'Admin' && profile?.role !== 'Staff' && profile?.role !== 'Editor') {
      return NextResponse.redirect(new URL('/portal/dashboard', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (static assets)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
