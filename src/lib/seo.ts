import type { Metadata } from "next";

import {
  DEFAULT_OG_IMAGE,
  SITE_CURRENCY,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/constants";
import { combosComingSoon } from "@/data/combos";
import { catalogPages, type CatalogRouteId } from "@/lib/catalog";
import { getProductHref } from "@/lib/product";
import { socialLinks } from "@/lib/navigation";
import type { Product } from "@/types/product";

export const INDEXABLE_PATHS = [
  "/",
  "/perfumes",
  "/decants",
  "/hombre",
  "/mujer",
  "/unisex",
  "/arabes",
  "/disenador",
  "/nicho",
  ...(combosComingSoon ? [] : ["/combos"]),
  "/ocasiones/diario",
  "/ocasiones/cita",
  "/ocasiones/fiesta",
  "/ocasiones/formal",
  "/ocasiones/noche",
  "/colecciones/frescos",
  "/colecciones/seductores",
  "/colecciones/intensos",
  "/colecciones/elegantes",
  "/nosotros",
  "/contacto",
  "/envios",
  "/politicas",
  "/terminos",
  "/privacidad",
  "/libro-de-reclamaciones",
] as const;

export type BreadcrumbEntry = {
  name: string;
  path: string;
};

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("http")
    ? path
    : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  return normalized.replace(/\/$/, "") || SITE_URL;
}

export function truncateMeta(value: string, max = 160): string {
  const clean = value.replace(/\s+/g, " ").trim();

  if (clean.length <= max) {
    return clean;
  }

  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

export function productMetaTitle(product: Product): string {
  return product.seoTitle?.trim() || product.name;
}

export function productMetaDescription(product: Product): string {
  return truncateMeta(product.seoDescription?.trim() || product.description);
}

export function productAvailability(product: Product): "InStock" | "OutOfStock" {
  const hasStock =
    product.stock > 0 || product.sizes.some((size) => size.stock > 0);

  return hasStock ? "InStock" : "OutOfStock";
}

export function verifiedSocialUrls(): string[] {
  const placeholders = new Set([
    "https://www.instagram.com/",
    "https://www.tiktok.com/",
    "https://wa.me/",
  ]);

  return socialLinks
    .map((link) => link.href)
    .filter((url) => !placeholders.has(url));
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const metaDescription = truncateMeta(description);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: metaDescription,
    alternates: {
      canonical: path,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: openGraphLocale(),
      siteName: SITE_NAME,
      title,
      description: metaDescription,
      url,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metaDescription,
      images: [imageUrl],
    },
  };
}

export function createCatalogMetadata(route: CatalogRouteId): Metadata {
  const config = catalogPages[route];

  return createPageMetadata({
    title: config.title,
    description: config.description,
    path: `/${route}`,
  });
}

export function createProductMetadata(product: Product): Metadata {
  const path = getProductHref(product.slug);
  const title = productMetaTitle(product);
  const description = productMetaDescription(product);
  const image = product.images[0] ?? DEFAULT_OG_IMAGE;

  return {
    ...createPageMetadata({
      title,
      description,
      path,
      image,
    }),
    openGraph: {
      type: "website",
      locale: openGraphLocale(),
      siteName: SITE_NAME,
      title,
      description,
      url: absoluteUrl(path),
      images: product.images.length
        ? product.images.map((src) => ({
            url: absoluteUrl(src),
            alt: `${product.name} de ${product.brand}`,
          }))
        : [{ url: absoluteUrl(DEFAULT_OG_IMAGE), alt: title }],
    },
    other: {
      "product:brand": product.brand,
      "product:price:amount": String(product.price),
      "product:price:currency": SITE_CURRENCY,
      "product:availability": productAvailability(product),
    },
  };
}

export function organizationJsonLd() {
  const sameAs = verifiedSocialUrls();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function breadcrumbJsonLd(items: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productJsonLd(product: Product) {
  const url = absoluteUrl(getProductHref(product.slug));
  const offers = product.sizes.map((size) => ({
    "@type": "Offer",
    url,
    name: size.label,
    price: size.price,
    priceCurrency: SITE_CURRENCY,
    availability:
      size.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    ...(size.sku ? { sku: size.sku } : {}),
  }));

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    image: product.images.map((src) => absoluteUrl(src)),
    offers:
      offers.length === 1
        ? offers[0]
        : {
            "@type": "AggregateOffer",
            url,
            priceCurrency: SITE_CURRENCY,
            lowPrice: Math.min(...product.sizes.map((size) => size.price)),
            highPrice: Math.max(...product.sizes.map((size) => size.price)),
            offerCount: offers.length,
            offers,
          },
  };

  if (product.ratingCount && product.ratingCount > 0 && product.rating !== undefined) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.ratingCount,
    };
  }

  return schema;
}

export function openGraphLocale(): string {
  return SITE_LOCALE.replace("-", "_");
}
