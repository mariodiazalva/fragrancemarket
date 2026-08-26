import { cache } from "react";

import { productSlugAliases } from "@/data/catalog-overrides";
import { combosComingSoon, withoutHiddenSetProducts } from "@/data/combos";
import { listFeaturedProducts, listPublishedProductCards, listPublishedProducts } from "@/data-access/products";
import { productMatchesQuery } from "@/services/search.service";
import type {
  CatalogFacets,
  CatalogQuery,
  CatalogResult,
  Product,
  ProductFilters,
  ProductSort,
} from "@/types";

function applyFilters(products: Product[], filters?: ProductFilters): Product[] {
  if (!filters) {
    return products;
  }

  return products.filter((product) => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    if (filters.gender && product.gender !== filters.gender) {
      return false;
    }

    if (filters.type && product.type !== filters.type) {
      return false;
    }

    if (filters.featured !== undefined && product.featured !== filters.featured) {
      return false;
    }

    if (filters.bestseller !== undefined && product.bestseller !== filters.bestseller) {
      return false;
    }

    if (filters.brand && product.brand !== filters.brand) {
      return false;
    }

    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false;
    }

    if (
      filters.fragranceFamily &&
      !product.fragranceFamily.includes(filters.fragranceFamily)
    ) {
      return false;
    }

    if (filters.occasion && !product.occasions.includes(filters.occasion)) {
      return false;
    }

    if (
      filters.size !== undefined &&
      !product.sizes.some((size) => size.volumeMl === filters.size)
    ) {
      return false;
    }

    return true;
  });
}

function sortProducts(products: Product[], sort: ProductSort = "recommended"): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "bestsellers":
      return sorted.sort((a, b) => Number(b.bestseller) - Number(a.bestseller) || (b.rating ?? 0) - (a.rating ?? 0));
    case "newest":
      return sorted.sort((a, b) => {
        const aDate = a.createdAt ? Date.parse(a.createdAt) : 0;
        const bDate = b.createdAt ? Date.parse(b.createdAt) : 0;
        return bDate - aDate;
      });
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "recommended":
    default:
      return sorted.sort((a, b) => {
        const featuredDelta = Number(b.featured) - Number(a.featured);
        if (featuredDelta !== 0) {
          return featuredDelta;
        }

        const bestsellerDelta = Number(b.bestseller) - Number(a.bestseller);
        if (bestsellerDelta !== 0) {
          return bestsellerDelta;
        }

        return (b.rating ?? 0) - (a.rating ?? 0);
      });
  }
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "es"));
}

function buildFacets(products: Product[]): CatalogFacets {
  const prices = products.map((product) => product.price);

  return {
    genders: uniqueSorted(products.map((product) => product.gender)) as CatalogFacets["genders"],
    brands: uniqueSorted(products.map((product) => product.brand)),
    types: uniqueSorted(products.map((product) => product.type)) as CatalogFacets["types"],
    categories: uniqueSorted(
      products.map((product) => product.category),
    ) as CatalogFacets["categories"],
    families: uniqueSorted(products.flatMap((product) => product.fragranceFamily)),
    occasions: uniqueSorted(products.flatMap((product) => product.occasions)),
    sizes: [...new Set(products.flatMap((product) => product.sizes.map((size) => size.volumeMl)))].sort(
      (a, b) => a - b,
    ),
    priceRange: {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 0,
    },
  };
}

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  const products = withoutHiddenSetProducts(await listPublishedProducts());
  return applyFilters(products, filters);
}

export async function getProductCards(filters?: ProductFilters): Promise<Product[]> {
  const products = withoutHiddenSetProducts(await listPublishedProductCards());
  return applyFilters(products, filters);
}

export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  const products = await listPublishedProducts();
  const resolved = productSlugAliases[slug] ?? slug;
  return (
    products.find((item) => item.slug === resolved || item.slug === slug) ?? null
  );
});

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const extra = combosComingSoon ? 8 : 0;
  return withoutHiddenSetProducts(await listFeaturedProducts(limit + extra)).slice(
    0,
    limit,
  );
}

export async function getBestsellers(limit = 8): Promise<Product[]> {
  const products = withoutHiddenSetProducts(await listPublishedProducts());
  return products.filter((product) => product.bestseller).slice(0, limit);
}

export type RelatedProducts = {
  youMayLike: Product[];
  pairWith: Product[];
  sameBrand: Product[];
};

function excludeCurrent(products: Product[], productId: string): Product[] {
  return products.filter((item) => item.id !== productId);
}

export async function getRelatedProducts(product: Product): Promise<RelatedProducts> {
  const catalog = withoutHiddenSetProducts(await listPublishedProducts());
  const others = excludeCurrent(catalog, product.id);

  const youMayLike = others
    .filter(
      (item) =>
        item.fragranceFamily.some((family) => product.fragranceFamily.includes(family)) ||
        item.occasions.some((occasion) => product.occasions.includes(occasion)),
    )
    .slice(0, 4);

  const complementary = others.filter((item) => {
    if (item.name === product.name && item.type !== product.type) {
      return true;
    }

    if (product.type !== "set" && item.type === "set") {
      return item.fragranceFamily.some((family) => product.fragranceFamily.includes(family));
    }

    if (product.type === "set" && item.type !== "set") {
      return item.fragranceFamily.some((family) => product.fragranceFamily.includes(family));
    }

    return false;
  });

  const pairWith = complementary.slice(0, 4);
  const sameBrand = others.filter((item) => item.brand === product.brand).slice(0, 4);

  return {
    youMayLike: youMayLike.length > 0 ? youMayLike : others.slice(0, 4),
    pairWith: pairWith.length > 0 ? pairWith : others.filter((item) => item.type !== product.type).slice(0, 4),
    sameBrand,
  };
}

export const getProductSlugs = cache(async (): Promise<string[]> => {
  const products = withoutHiddenSetProducts(await listPublishedProducts());
  return products.map((product) => product.slug);
});

export async function getMatchingFullBottle(
  product: Product,
): Promise<Product | null> {
  if (product.type !== "decant") {
    return null;
  }

  const catalog = await listPublishedProducts();

  return (
    catalog.find(
      (item) => item.type === "perfume" && item.name === product.name,
    ) ?? null
  );
}

export async function getCatalog(
  query: CatalogQuery = {},
  options?: { facetFilters?: ProductFilters },
): Promise<CatalogResult> {
  const catalog = withoutHiddenSetProducts(await listPublishedProducts());
  const { query: searchQuery, sort, ...filters } = query;
  const filtered = applyFilters(catalog, filters);
  const searched = searchQuery
    ? filtered.filter((product) => productMatchesQuery(product, searchQuery))
    : filtered;

  return {
    products: sortProducts(searched, sort),
    total: searched.length,
    facets: buildFacets(applyFilters(catalog, options?.facetFilters ?? {
      category: filters.category,
      gender: filters.gender,
      type: filters.type,
    })),
  };
}
