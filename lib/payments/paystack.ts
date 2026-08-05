import { getRequiredEnv, getSiteUrl } from "@/lib/server/env";
import type { PaystackVerificationData } from "@/lib/payments/types";

const PAYSTACK_API_BASE_URL = "https://api.paystack.co";
const DEFAULT_CURRENCY = "NGN";

type PaystackInitializeTransactionResponse = {
  data: {
    access_code: string;
    authorization_url: string;
    reference: string;
  };
  message: string;
  status: boolean;
};

type PaystackVerifyTransactionResponse = {
  data: PaystackVerificationData;
  message: string;
  status: boolean;
};

function getPaystackSecretKey() {
  return getRequiredEnv("PAYSTACK_SECRET_KEY");
}

async function paystackFetch<T>(path: string, init: RequestInit): Promise<T> {
  const response = await fetch(`${PAYSTACK_API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getPaystackSecretKey()}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  const payload = (await response.json()) as { message?: string; status?: boolean };

  if (!response.ok || payload.status === false) {
    throw new Error(payload.message ?? "Paystack request failed.");
  }

  return payload as T;
}

export function generatePaystackReference() {
  return `sgc-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function toKobo(valueInNaira: number) {
  return Math.round(valueInNaira * 100);
}

export function buildGuideCallbackUrl(slug: string) {
  return `${getSiteUrl()}/products/${slug}`;
}

export async function initializePaystackTransaction(input: {
  amount: number;
  callbackUrl: string;
  email: string;
  metadata?: Record<string, unknown>;
  reference: string;
}) {
  const payload = await paystackFetch<PaystackInitializeTransactionResponse>(
    "/transaction/initialize",
    {
      method: "POST",
      body: JSON.stringify({
        amount: String(input.amount),
        callback_url: input.callbackUrl,
        currency: DEFAULT_CURRENCY,
        email: input.email,
        metadata: input.metadata,
        reference: input.reference,
      }),
    }
  );

  return payload.data;
}

export async function verifyPaystackTransaction(reference: string) {
  const payload = await paystackFetch<PaystackVerifyTransactionResponse>(
    `/transaction/verify/${encodeURIComponent(reference)}`,
    {
      method: "GET",
    }
  );

  return payload.data;
}

export function isPaystackTerminalFailure(status: string) {
  return ["abandoned", "failed", "reversed"].includes(status);
}
