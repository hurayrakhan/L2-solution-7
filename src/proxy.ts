import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  const isProtectedAdmin = pathname.startsWith("/admin");
  const isProtectedProvider = pathname.startsWith("/provider");
  const isProtectedDashboard = pathname.startsWith("/dashboard");

  // If user visits auth pages while already logged in
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user visits protected pages without a token
  if (!token && (isProtectedAdmin || isProtectedProvider || isProtectedDashboard)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/provider/:path*",
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};
