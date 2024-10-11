import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 쿠키에서 authorization 토큰 확인
  const token = req.cookies.get('authorization')?.value;
  console.log(token);
  console.log('rrr');
  // 로그인된 상태라면 /login, /signup으로 이동하지 않도록 /main으로 리디렉션
  if (
    token &&
    (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup')
  ) {
    return NextResponse.redirect(new URL('/main', req.url));
  }

  // 로그인된 상태가 아니라면 계속해서 로그인 페이지로 접근 허용
  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/signup', '/main'],
};
