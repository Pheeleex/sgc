import { NextResponse, type NextRequest } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  isValidAdminSessionCookie,
} from "@/lib/admin/session";

function isAdminApiRoute(pathname: string) {
  return pathname.startsWith("/api/admin");
}

function isLoginRoute(pathname: string) {
  return pathname === "/admin/login" || pathname === "/api/admin/login";
}


export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasValidSession = await isValidAdminSessionCookie(
    request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  );

  if (isLoginRoute(pathname)) {
    if (pathname === "/admin/login" && hasValidSession) {
      return NextResponse.redirect(new URL("/admin/products", request.url));
    }

    return NextResponse.next();
  }

  if (hasValidSession) {
    return NextResponse.next();
  }

  if (isAdminApiRoute(pathname)) {
    return NextResponse.json({ error: "Admin login required." }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", `${pathname}${search}`);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
