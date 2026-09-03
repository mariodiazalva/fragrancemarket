import type { Product } from "@/types/product";

export const ARABIC_WEEKND_SLUGS = [
  "yara-elixir",
  "odyssey-mandarin-sky",
  "khamrah-qahwa",
  "9-pm",
] as const;

export type ArabicWeekndSlug = (typeof ARABIC_WEEKND_SLUGS)[number];

export const SALE_BADGE_LABEL = "15% OFF";

export const arabicWeekndPromo = {
  id: "arabic-weeknd",
  name: "Arabic Weeknd",
  eyebrow: "Por tiempo limitado",
  title: "Arabic Weeknd",
  description:
    "Cuatro firmas árabes en 100 ml con 15% de descuento. Solo estas piezas entran en Promos, y el mismo precio corre en todo el catálogo mientras dure la campaña.",
  badge: SALE_BADGE_LABEL,
  discountPercent: 15,
  slugs: ARABIC_WEEKND_SLUGS,
} as const;

export function isArabicWeekndPerfume(
  slug: string,
  type?: Product["type"],
): slug is ArabicWeekndSlug {
  if (type && type !== "perfume") {
    return false;
  }

  return (ARABIC_WEEKND_SLUGS as readonly string[]).includes(slug);
}

export function applySalePrice(
  originalPrice: number,
  percent = arabicWeekndPromo.discountPercent,
): number {
  return Math.round(originalPrice * (1 - percent / 100));
}

function alreadyDiscounted(price: number, compareAtPrice?: number): boolean {
  return compareAtPrice !== undefined && compareAtPrice > price;
}

export function applyArabicWeekndPromo(product: Product): Product {
  if (!isArabicWeekndPerfume(product.slug, product.type)) {
    return product;
  }

  if (alreadyDiscounted(product.price, product.compareAtPrice)) {
    return {
      ...product,
      sizes: product.sizes.map((size) => {
        if (size.volumeMl !== 100 || alreadyDiscounted(size.price, size.compareAtPrice)) {
          return size;
        }

        return {
          ...size,
          compareAtPrice: size.price,
          price: applySalePrice(size.price),
        };
      }),
    };
  }

  const originalPrice = product.price;

  return {
    ...product,
    price: applySalePrice(originalPrice),
    compareAtPrice: originalPrice,
    sizes: product.sizes.map((size) => {
      if (size.volumeMl !== 100 || alreadyDiscounted(size.price, size.compareAtPrice)) {
        return size;
      }

      return {
        ...size,
        compareAtPrice: size.price,
        price: applySalePrice(size.price),
      };
    }),
  };
}
