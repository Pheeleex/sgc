export const SUPPORTED_CURRENCIES = ["USD", "NGN"] as const;

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export const DEFAULT_PRODUCT_CURRENCY: SupportedCurrency = "USD";
export const LEGACY_PRODUCT_CURRENCY: SupportedCurrency = "NGN";

export function normalizeSupportedCurrency(
  value: string | null | undefined,
  fallback: SupportedCurrency = DEFAULT_PRODUCT_CURRENCY
): SupportedCurrency {
  const normalizedValue = value?.toUpperCase();

  return SUPPORTED_CURRENCIES.includes(normalizedValue as SupportedCurrency)
    ? (normalizedValue as SupportedCurrency)
    : fallback;
}

export function toCurrencySubunit(amount: number) {
  return Math.round(amount * 100);
}

export function formatCurrency(
  amount: number,
  currency: SupportedCurrency = DEFAULT_PRODUCT_CURRENCY
) {
  return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
    currency,
    maximumFractionDigits: currency === "NGN" ? 0 : 2,
    minimumFractionDigits: currency === "NGN" ? 0 : 2,
    style: "currency",
  }).format(amount);
}
