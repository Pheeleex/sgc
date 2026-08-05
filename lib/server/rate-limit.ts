import "server-only";

import crypto from "node:crypto";

import { getAdminFirestore } from "@/lib/firebase/admin";

const RATE_LIMIT_COLLECTION = "rateLimits";

type RateLimitInput = {
  key: string;
  limit: number;
  windowMs: number;
};

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: string;
  retryAfterSeconds: number;
};

function hashKey(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

export function rateLimitHeaders(result: RateLimitResult) {
  return {
    "Retry-After": String(result.retryAfterSeconds),
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": result.resetAt,
  };
}

export async function checkRateLimit({
  key,
  limit,
  windowMs,
}: RateLimitInput): Promise<RateLimitResult> {
  const db = getAdminFirestore();
  const now = Date.now();
  const hashedKey = hashKey(key);
  const ref = db.collection(RATE_LIMIT_COLLECTION).doc(hashedKey);

  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const data = snapshot.exists
      ? (snapshot.data() as { count?: number; resetAt?: number })
      : null;
    const existingResetAt = data?.resetAt ?? 0;
    const windowExpired = !data || existingResetAt <= now;
    const resetAt = windowExpired ? now + windowMs : existingResetAt;
    const currentCount = windowExpired ? 0 : data?.count ?? 0;
    const nextCount = currentCount + 1;
    const allowed = nextCount <= limit;

    transaction.set(
      ref,
      {
        count: allowed ? nextCount : currentCount,
        resetAt,
        updatedAt: new Date(now).toISOString(),
      },
      { merge: true }
    );

    return {
      allowed,
      limit,
      remaining: Math.max(0, limit - (allowed ? nextCount : currentCount)),
      resetAt: new Date(resetAt).toISOString(),
      retryAfterSeconds: Math.max(1, Math.ceil((resetAt - now) / 1000)),
    };
  });
}
