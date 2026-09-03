import {
  isArabicWeekndPerfume,
  SALE_BADGE_LABEL,
} from "@/data/promos";
import type { BadgeVariant } from "@/lib/tokens";
import type { FragranceSet } from "@/types/content";
import type { FragranceIntensity, Product, ProductSize } from "@/types/product";

export const PRODUCT_PATH = "/producto";

export function getProductHref(slug: string): string {
  return `${PRODUCT_PATH}/${slug}`;
}

export function getProductBadges(product: Product): string[] {
  const badges: string[] = [];

  if (isArabicWeekndPerfume(product.slug, product.type)) {
    badges.push(SALE_BADGE_LABEL);
  }

  if (product.bestseller) {
    badges.push("Bestseller");
  }

  if (
    !isArabicWeekndPerfume(product.slug, product.type) &&
    product.compareAtPrice !== undefined &&
    product.compareAtPrice > product.price
  ) {
    badges.push("Oferta");
  }

  return badges;
}

export function getBadgeVariant(badge: string): BadgeVariant {
  return badge === SALE_BADGE_LABEL ? "sale" : "gold";
}

export function getSetIndividualTotal(set: FragranceSet): number {
  const fromItems = set.items.reduce((total, item) => total + item.individualPrice, 0);
  return fromItems > 0 ? fromItems : set.compareAtPrice;
}

export function getSetSavings(set: FragranceSet): number {
  return Math.max(0, getSetIndividualTotal(set) - set.price);
}

export function getProductIntensity(product: Product): FragranceIntensity {
  if (product.intensity) {
    return product.intensity;
  }

  const families = product.fragranceFamily.join(" ");

  if (families.includes("oud") || families.includes("oriental")) {
    return 5;
  }

  if (families.includes("especiado") || families.includes("ámbar")) {
    return 4;
  }

  if (families.includes("amaderado")) {
    return 4;
  }

  if (families.includes("fresco") || families.includes("cítrico")) {
    return 2;
  }

  return 3;
}

export function getDefaultSize(product: Product): ProductSize {
  return (
    product.sizes.find((size) => size.volumeMl === 5) ??
    product.sizes[0] ?? {
      label: "Única",
      volumeMl: 0,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      stock: product.stock,
    }
  );
}

export const intensityLabels: Record<FragranceIntensity, string> = {
  1: "Muy suave",
  2: "Suave",
  3: "Moderada",
  4: "Alta",
  5: "Muy alta",
};
