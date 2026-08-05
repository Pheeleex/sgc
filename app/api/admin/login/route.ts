import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSessionCookieValue,
  isValidAdminPassword,
} from "@/lib/admin/session";
import {
  checkRateLimit,
  getClientIp,
  rateLimitHeaders,
} from "@/lib/server/rate-limit";

export const runtime = "nodejs";

const ADMIN_LOGIN_RATE_LIMIT = {
  limit: 5,
  windowMs: 15 * 60 * 1000,
};

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rateLimit = await checkRateLimit({
      key: `admin-login:${clientIp}`,
      ...ADMIN_LOGIN_RATE_LIMIT,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { headers: rateLimitHeaders(rateLimit), status: 429 }
      );
    }

    const body = (await request.json()) as { password?: string };
    const password = body.password ?? "";

    if (!isValidAdminPassword(password)) {
      return NextResponse.json(
        { error: "Invalid admin password." },
        { headers: rateLimitHeaders(rateLimit), status: 401 }
      );
    }

    const response = NextResponse.json(
      { ok: true },
      { headers: rateLimitHeaders(rateLimit) }
    );

    response.cookies.set({
      httpOnly: true,
      maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
      name: ADMIN_SESSION_COOKIE,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      value: await createAdminSessionCookieValue(),
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "We could not log you in.",
      },
      { status: 500 }
    );
  }
}
