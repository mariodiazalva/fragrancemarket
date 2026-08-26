function firstNonEmpty(
  ...values: Array<string | undefined | null>
): string | undefined {
  return values.find((value): value is string => Boolean(value && value.trim()));
}

function isPlaceholder(value: string): boolean {
  return /your[-_ ]?(anon|project)|YOUR_PROJECT/i.test(value);
}

export type SupabasePublicConfig = {
  url: string;
  anonKey: string;
};

export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  const url = firstNonEmpty(
    process.env.SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_URL,
  );
  const anonKey = firstNonEmpty(
    process.env.SUPABASE_ANON_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  if (!url || !anonKey || isPlaceholder(url) || isPlaceholder(anonKey)) {
    return null;
  }

  return { url, anonKey };
}

export function isSupabaseConfigured(): boolean {
  return getSupabasePublicConfig() !== null;
}

export function isPaymentsTestMode(): boolean {
  return process.env.PAYMENTS_TEST_MODE === "true";
}

export function getSupabaseServiceRoleKey(): string | null {
  if (process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY must never be exposed as NEXT_PUBLIC_. Remove NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!key || isPlaceholder(key)) {
    return null;
  }

  return key;
}
