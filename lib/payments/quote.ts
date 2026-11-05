import "server-only";

import crypto from "node:crypto";

import type { Product } from "@/lib/data/products";
import { getAdminFirestore } from "@/lib/firebase/admin";
import type { PaymentQuote } from "@/lib/payments/types";
import { getRequiredEnv } from "@/lib/server/env";

const RATE_TTL_MS = 24 * 60 * 60 * 1000;
const REFRESH_LEASE_MS = 15 * 1000;
const FAILED_REFRESH_COOLDOWN_MS = 60 * 60 * 1000;
const MONTHLY_REQUEST_LIMIT = 200;
const MAX_SOURCE_AGE_MS = 72 * 60 * 60 * 1000;
const DEFAULT_PRODUCT_PRICE = 9.99;

type CachedRate = {
  rate: number;
  sourceUpdatedAt: string;
  fetchedAt: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseCachedRate(value: unknown): CachedRate | null {
  if (!isRecord(value)) return null;
  const { rate, sourceUpdatedAt, fetchedAt } = value;
  if (
    typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0 ||
    typeof sourceUpdatedAt !== "string" || !Number.isFinite(Date.parse(sourceUpdatedAt)) ||
    typeof fetchedAt !== "string" || !Number.isFinite(Date.parse(fetchedAt))
  ) return null;
  return { rate, sourceUpdatedAt, fetchedAt };
}

function isFresh(rate: CachedRate) {
  const age = Date.now() - Date.parse(rate.fetchedAt);
  return age >= 0 && age < RATE_TTL_MS;
}

async function fetchCurrencyApiRate(): Promise<CachedRate> {
  const response = await fetch(
    "https://api.currencyapi.com/v3/latest?base_currency=USD&currencies=NGN",
    {
      headers: { apikey: getRequiredEnv("CURRENCY_CONVERT") },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    }
  );
  if (!response.ok) throw new Error("The exchange rate is temporarily unavailable.");

  const payload: unknown = await response.json();
  const meta = isRecord(payload) ? payload.meta : null;
  const data = isRecord(payload) ? payload.data : null;
  const ngn = isRecord(data) ? data.NGN : null;
  const rate = isRecord(ngn) ? ngn.value : null;
  const sourceUpdatedAt = isRecord(meta) ? meta.last_updated_at : null;
  const sourceTime = typeof sourceUpdatedAt === "string" ? Date.parse(sourceUpdatedAt) : NaN;

  if (
    typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0 ||
    typeof sourceUpdatedAt !== "string" || !Number.isFinite(sourceTime) ||
    sourceTime > Date.now() + 5 * 60 * 1000 || Date.now() - sourceTime > MAX_SOURCE_AGE_MS
  ) {
    throw new Error("The exchange rate provider returned an invalid or outdated rate.");
  }

  return { rate, sourceUpdatedAt, fetchedAt: new Date().toISOString() };
}

export async function getUsdNgnRate(): Promise<CachedRate> {
  const db = getAdminFirestore();
  const ref = db.collection("exchangeRates").doc("USD-NGN");

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const claim = await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(ref);
      const data = snapshot.data();
      const cached = parseCachedRate(data);
      if (cached && isFresh(cached)) return { kind: "cached" as const, rate: cached };

      const retryAfter = data?.retryAfter;
      if (typeof retryAfter === "number" && retryAfter > Date.now()) {
        return { kind: "cooldown" as const };
      }

      const leaseUntil = data?.leaseUntil;
      if (typeof leaseUntil === "number" && leaseUntil > Date.now()) {
        return { kind: "wait" as const };
      }

      const requestMonth = new Date().toISOString().slice(0, 7);
      const requestsThisMonth = data?.requestMonth === requestMonth &&
        typeof data.requestCount === "number" ? data.requestCount : 0;
      if (requestsThisMonth >= MONTHLY_REQUEST_LIMIT) {
        return { kind: "limit" as const };
      }

      const token = crypto.randomUUID();
      transaction.set(ref, {
        leaseToken: token,
        leaseUntil: Date.now() + REFRESH_LEASE_MS,
        requestMonth,
        requestCount: requestsThisMonth + 1,
      }, { merge: true });
      return { kind: "fetch" as const, token };
    });

    if (claim.kind === "cached") return claim.rate;
    if (claim.kind === "cooldown") {
      throw new Error("The exchange rate is temporarily unavailable. Please try again later.");
    }
    if (claim.kind === "limit") {
      throw new Error("The monthly exchange rate request limit has been reached.");
    }

    if (claim.kind === "wait") {
      for (let poll = 0; poll < 20; poll += 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const snapshot = await ref.get();
        const cached = parseCachedRate(snapshot.data());
        if (cached && isFresh(cached)) return cached;
        const leaseUntil = snapshot.data()?.leaseUntil;
        if (typeof leaseUntil !== "number" || leaseUntil <= Date.now()) break;
      }
      continue;
    }

    try {
      const rate = await fetchCurrencyApiRate();
      return await db.runTransaction(async (transaction) => {
        const snapshot = await transaction.get(ref);
        if (snapshot.data()?.leaseToken !== claim.token) {
          const cached = parseCachedRate(snapshot.data());
          if (cached && isFresh(cached)) return cached;
          throw new Error("The exchange rate is being refreshed. Please try again.");
        }
        transaction.set(ref, { ...rate, leaseToken: null, leaseUntil: null, retryAfter: null });
        return rate;
      });
    } catch (error) {
      await db.runTransaction(async (transaction) => {
        const snapshot = await transaction.get(ref);
        if (snapshot.data()?.leaseToken === claim.token) {
          transaction.set(ref, {
            leaseToken: null,
            leaseUntil: null,
            retryAfter: Date.now() + FAILED_REFRESH_COOLDOWN_MS,
          }, { merge: true });
        }
      });
      throw error;
    }
  }

  throw new Error("The exchange rate is being refreshed. Please try again shortly.");
}

export async function getPaymentQuote(product: Product): Promise<PaymentQuote> {
  const price = product.price ?? DEFAULT_PRODUCT_PRICE;
  const listAmountMinor = Math.round(price * 100);
  if (!Number.isSafeInteger(listAmountMinor) || listAmountMinor <= 0) {
    throw new Error("This product does not have a valid price.");
  }

  if (product.currency === "NGN") {
    return { kind: "ngn", listAmountMinor, chargeAmountKobo: listAmountMinor };
  }

  const { rate, sourceUpdatedAt, fetchedAt } = await getUsdNgnRate();
  const chargeNaira = Math.round((listAmountMinor / 100) * rate);
  const chargeAmountKobo = chargeNaira * 100;
  if (!Number.isSafeInteger(chargeAmountKobo) || chargeAmountKobo <= 0) {
    throw new Error("The converted product price is invalid.");
  }

  return {
    kind: "usd",
    listAmountMinor,
    chargeAmountKobo,
    ngnPerUsd: rate,
    rateUpdatedAt: sourceUpdatedAt,
    rateFetchedAt: fetchedAt,
  };
}
