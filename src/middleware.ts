import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect portal and admin routes
  if (req.nextUrl.pathname.startsWith('/portal/dashboard') || req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/portal', req.url));
    }
  }

  // Admin and Staff only for /admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session?.user.id)
      .single();

    if (profile?.role !== 'Admin' && profile?.role !== 'Staff' && profile?.role !== 'Editor') {
      return NextResponse.redirect(new URL('/portal/dashboard', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/portal/dashboard/:path*', '/admin/:path*'],
};
