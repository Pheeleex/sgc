import { client } from "./client";

type SanityFetchOptions = {
  query: string;
  params?: Record<string, unknown>;
};

export async function sanityFetch<T = unknown>({
  query,
  params = {},
}: SanityFetchOptions): Promise<{ data: T }> {
  const data = await client.fetch<T>(query, params);
  return { data };
}

export async function SanityLive() {
  return null;
}
