import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/database.types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  
  // セッション情報を取得
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    // セッションがない場合は認証エラー
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return res;
}





// // (念の為に残してる)リクエストがアプリに届く前に実行されwる関数(middleware)
// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
// import { NextResponse } from 'next/server'

// import type { NextRequest } from 'next/server'
// import type { Database } from '@/lib/database.types'

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next()
//   const supabase = createMiddlewareClient<Database>({ req, res })
//   await supabase.auth.getSession()
//   return res
// }