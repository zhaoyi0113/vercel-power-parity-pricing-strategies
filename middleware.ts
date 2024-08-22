import { NextRequest, NextResponse } from 'next/server';

// Set pathname were middleware will be executed
export const config = {
  matcher: ['/edge', '/api/hello'],
};

export function middleware(req: NextRequest) {
  // Get country
  console.log('request country:', req.geo);
  const country = req.geo?.country?.toLowerCase() || 'au';

  console.log('middleware before: ', req.nextUrl.pathname);
  // Update pathname
  req.nextUrl.pathname += `/${country}`;
  console.log('middleware after', req.nextUrl.pathname);

  // Rewrite to URL
  return NextResponse.rewrite(req.nextUrl);
}
