import { normalizeSearch } from "@/lib/utils";
import type { Product, ProductSearchSuggestion } from "@/types";

export const MIN_SEARCH_QUERY_LENGTH = 2;
export const SEARCH_SUGGESTION_LIMIT = 8;

/**
 * Local product search. Swap the catalog source later without changing UI.
 */
export function productMatchesQuery(product: Product, query?: string): boolean {
  const normalizedQuery = query ? normalizeSearch(query) : "";

  if (!normalizedQuery) {
    return true;
  }

  return (
    normalizeSearch(product.name).includes(normalizedQuery) ||
    normalizeSearch(product.brand).includes(normalizedQuery) ||
    product.fragranceFamily?.some((family) =>
      normalizeSearch(family).includes(normalizedQuery),
    )
  );
}

function scoreMatch(product: Product, normalizedQuery: string): number {
  const name = normalizeSearch(product.name);
  const brand = normalizeSearch(product.brand);
  let score = 0;

  if (brand === normalizedQuery) {
    score += 120;
  } else if (brand.startsWith(normalizedQuery)) {
    score += 90;
  } else if (brand.includes(normalizedQuery)) {
    score += 60;
  }

  if (name === normalizedQuery) {
    score += 100;
  } else if (name.startsWith(normalizedQuery)) {
    score += 70;
  } else if (name.includes(normalizedQuery)) {
    score += 40;
  }

  if (
    product.fragranceFamily?.some((family) =>
      normalizeSearch(family).includes(normalizedQuery),
    )
  ) {
    score += 15;
  }

  if (product.bestseller) {
    score += 4;
  }

  if (product.featured) {
    score += 2;
  }

  return score;
}

export function toSearchSuggestion(product: Product): ProductSearchSuggestion {
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    slug: product.slug,
    image: product.images[0],
    type: product.type,
  };
}

export function suggestProducts(
  products: Product[],
  query: string,
  limit = SEARCH_SUGGESTION_LIMIT,
): Product[] {
  const normalizedQuery = normalizeSearch(query);

  if (normalizedQuery.length < MIN_SEARCH_QUERY_LENGTH) {
    return [];
  }

  return products
    .filter((product) => productMatchesQuery(product, query))
    .sort(
      (left, right) =>
        scoreMatch(right, normalizedQuery) - scoreMatch(left, normalizedQuery) ||
        left.name.localeCompare(right.name, "es"),
    )
    .slice(0, limit);
}
