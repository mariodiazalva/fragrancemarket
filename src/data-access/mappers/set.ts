import { applySetItemOverride } from "@/data/catalog-overrides";
import type { FragranceSet, SetItem } from "@/types/content";

type NamedRelation = { name: string } | { name: string }[] | null;

type SetProductRow = {
  id: string;
  name: string;
  slug: string;
  brands: NamedRelation;
};

export type SetQueryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number | string;
  compare_at_price: number | string | null;
  image_url: string | null;
  set_products:
    | {
        size_label: string | null;
        individual_price: number | string | null;
        position: number | null;
        products: SetProductRow | SetProductRow[] | null;
      }[]
    | null;
};

function asNumber(value: number | string | null | undefined): number {
  if (value === null || value === undefined || value === "") {
    return 0;
  }

  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function relationName(value: NamedRelation): string {
  if (!value) {
    return "";
  }

  if (Array.isArray(value)) {
    return value[0]?.name ?? "";
  }

  return value.name;
}

function asProduct(
  value: SetProductRow | SetProductRow[] | null,
): SetProductRow | null {
  if (!value) {
    return null;
  }

  return Array.isArray(value) ? (value[0] ?? null) : value;
}

export function mapSetRow(row: SetQueryRow): FragranceSet {
  const items: SetItem[] = [...(row.set_products ?? [])]
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .flatMap((line) => {
      const product = asProduct(line.products);

      if (!product) {
        return [];
      }

      return [
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          brand: relationName(product.brands),
          sizeLabel: line.size_label ?? "5 ml",
          individualPrice: asNumber(line.individual_price),
        },
      ];
    });

  const price = asNumber(row.price);
  const compareAtPrice = asNumber(row.compare_at_price);

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
    price,
    compareAtPrice: compareAtPrice > 0 ? compareAtPrice : price,
    image: row.image_url ?? "",
    items: items.map(applySetItemOverride),
  };
}
