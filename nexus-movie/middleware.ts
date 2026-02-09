// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for a session cookie
  const session = request.cookies.get("session-token");
  const { pathname } = request.nextUrl;

  if (session && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isProtected = ["/profile", "/library", "/settings"].some((path) =>
    pathname.startsWith(path)
  );

  if (!session && isProtected) {
    const loginUrl = new URL("/auth", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/library/:path*", "/settings/:path*", "/auth"],
};
