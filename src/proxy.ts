import { NextRequest, NextResponse } from "next/server";

const AUTH_PAGES = ["/login", "/register"];
const PROTECTED_PAGES = ["/cart", "/profile"];
export function proxy(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage = AUTH_PAGES.some((route) => pathname.startsWith(route));
  const isProtectedPage = PROTECTED_PAGES.some((route) =>
    pathname.startsWith(route),
  );

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
