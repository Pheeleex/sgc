export const ADMIN_SESSION_COOKIE = "sgc_admin_session";
export const ADMIN_SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;

const encoder = new TextEncoder();

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? "";
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqual(left: string, right: string) {
  if (left.length !== right.length) {
    return false;
  }

  let result = 0;

  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return result === 0;
}

async function getSigningKey() {
  const secret = getSessionSecret();

  if (!secret) {
    throw new Error("Missing ADMIN_PASSWORD or ADMIN_SESSION_SECRET.");
  }

  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { hash: "SHA-256", name: "HMAC" },
    false,
    ["sign", "verify"]
  );
}

async function signPayload(payload: string) {
  const key = await getSigningKey();
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));

  return toHex(signature);
}

export async function createAdminSessionCookieValue() {
  const expiresAt = Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `admin:${expiresAt}`;
  const signature = await signPayload(payload);

  return `${expiresAt}.${signature}`;
}

export async function isValidAdminSessionCookie(value?: string | null) {
  if (!value) {
    return false;
  }

  const [expiresAt, signature] = value.split(".");
  const expiresAtTime = Number(expiresAt);

  if (!expiresAt || !signature || Number.isNaN(expiresAtTime)) {
    return false;
  }

  if (expiresAtTime <= Date.now()) {
    return false;
  }

  const expectedSignature = await signPayload(`admin:${expiresAtTime}`);

  return constantTimeEqual(signature, expectedSignature);
}

export function isValidAdminPassword(input: string) {
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword) {
    throw new Error("Missing ADMIN_PASSWORD.");
  }

  return constantTimeEqual(input, expectedPassword);
}
