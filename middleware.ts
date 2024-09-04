import { NextRequest, NextResponse } from 'next/server';

// Set pathname were middleware will be executed
export const config = {
  matcher: ['/edge', '/api/hello', '/ssr'],
};

export function middleware(req: NextRequest) {
  // Get country
  console.log('request country:', req.geo, req.nextUrl);
  const country = req.geo?.country?.toLowerCase() || 'au';

  if (req.nextUrl.pathname === '/ssr') {
    return NextResponse.rewrite(req.nextUrl);
  }

  console.log('middleware before: ', req.nextUrl.pathname);
  // Update pathname
  req.nextUrl.pathname += `/${country}`;
  console.log('middleware after', req.nextUrl.pathname);

  // Rewrite to URL
  return NextResponse.rewrite(req.nextUrl);
}
