import { applyProductOverride } from "@/data/catalog-overrides";
import type { ProductQueryRow } from "@/types/database";
import type {
  FragranceIntensity,
  FragranceNotes,
  Product,
  ProductCategory,
  ProductGender,
  ProductSize,
  ProductType,
} from "@/types/product";

const PRODUCT_CATEGORIES: ProductCategory[] = [
  "full-bottle",
  "decant",
  "arabian",
  "designer",
  "niche",
  "decant-set",
];

function asNumber(value: number | string | null | undefined): number | undefined {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function relationName(
  value: { name: string } | { name: string }[] | null | undefined,
): string {
  if (!value) {
    return "";
  }

  if (Array.isArray(value)) {
    return value[0]?.name ?? "";
  }

  return value.name;
}

function relationSlug(
  value: { slug: string } | { slug: string }[] | null | undefined,
): string | undefined {
  if (!value) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value[0]?.slug;
  }

  return value.slug;
}

function asCategory(value: string | undefined): ProductCategory {
  if (value && PRODUCT_CATEGORIES.includes(value as ProductCategory)) {
    return value as ProductCategory;
  }

  return "niche";
}

function asType(value: string): ProductType {
  if (value === "perfume" || value === "decant" || value === "set") {
    return value;
  }

  return "perfume";
}

function asGender(value: string): ProductGender {
  if (value === "masculine" || value === "feminine" || value === "unisex") {
    return value;
  }

  return "unisex";
}

function asIntensity(value: number | null): FragranceIntensity | undefined {
  if (value === 1 || value === 2 || value === 3 || value === 4 || value === 5) {
    return value;
  }

  return undefined;
}

function noteNames(
  notes: ProductQueryRow["product_notes"],
  stage: keyof FragranceNotes,
): string[] {
  return (notes ?? [])
    .filter((note) => note.stage === stage)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((note) => relationName(note.fragrance_notes))
    .filter(Boolean);
}

export function mapProductRow(row: ProductQueryRow): Product {
  const sizes: ProductSize[] = [...(row.product_variants ?? [])]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || a.volume_ml - b.volume_ml)
    .map((variant) => ({
      label: variant.label,
      volumeMl: variant.volume_ml,
      price: asNumber(variant.price) ?? 0,
      compareAtPrice: asNumber(variant.compare_at_price),
      stock: variant.stock,
      sku: variant.sku ?? undefined,
    }));

  const images = [...(row.product_images ?? [])]
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((image) => image.url)
    .filter(Boolean);

  const price = asNumber(row.price) ?? sizes[0]?.price ?? 0;
  const compareAtPrice = asNumber(row.compare_at_price);
  const rating = asNumber(row.rating);
  const ratingCount = row.rating_count ?? 0;

  return applyProductOverride({
    id: row.id,
    name: row.name,
    brand: relationName(row.brands),
    slug: row.slug,
    description: row.description ?? "",
    gender: asGender(row.gender),
    category: asCategory(relationSlug(row.categories)),
    type: asType(row.type),
    price,
    compareAtPrice,
    images,
    sizes,
    notes: {
      top: noteNames(row.product_notes, "top"),
      heart: noteNames(row.product_notes, "heart"),
      base: noteNames(row.product_notes, "base"),
    },
    fragranceFamily: row.fragrance_family ?? [],
    occasions: row.occasions ?? [],
    intensity: asIntensity(row.intensity),
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
    rating,
    ratingCount: ratingCount > 0 ? ratingCount : undefined,
    featured: row.featured,
    bestseller: row.bestseller,
    stock: row.stock,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  });
}
