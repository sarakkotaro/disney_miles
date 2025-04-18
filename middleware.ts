// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from '@/lib/database.types';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', req.url));

  }

  return res;
}

// 認証を必要とするルートだけを指定する
export const config = {
  matcher: ['/mylist/:path*'], // 認証が必要なパスだけ指定
};
