// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/admin') && 
    !['/admin/login', '/admin/callback'].includes(pathname)) {
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return res;
}
