import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isProtected =
    pathname.startsWith("/dashboard") || pathname.startsWith("/invoices");

  if (!isAuthPage && !isProtected) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/invoices/:path*", "/login", "/signup"],
};
