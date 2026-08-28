import { SITE_CURRENCY, SITE_LOCALE } from "@/lib/constants";

export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(
  value: number,
  locale = SITE_LOCALE,
  currency = SITE_CURRENCY,
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatCatalogPrice(
  value: number,
  locale = SITE_LOCALE,
  currency = SITE_CURRENCY,
): string {
  if (!Number.isFinite(value) || value <= 0) {
    return "S/ —";
  }

  return formatPrice(value, locale, currency);
}

export function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
