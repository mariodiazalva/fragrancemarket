import {
  applyProductOverride,
  injectMissingDecants,
} from "@/data/catalog-overrides";
import {
  listFeaturedProductsFromMock,
  listPublishedProductsFromMock,
} from "@/data-access/mock/products";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Product } from "@/types";

function withProductOverrides(products: Product[]): Product[] {
  return injectMissingDecants(products.map(applyProductOverride));
}

async function loadSupabaseProducts() {
  return import("@/data-access/supabase/products");
}

function warnMockFallback(scope: string) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[elova] Supabase no está configurado. ${scope} usa mock data.`);
  }
}

/**
 * Data access for products.
 * Catalog reads go through this module; Home featured, catalog and PDP use Supabase when configured.
 */
export async function listFeaturedProducts(limit: number): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    warnMockFallback("Home");
    return withProductOverrides(listFeaturedProductsFromMock(limit));
  }

  const { listFeaturedProductsFromSupabase } = await loadSupabaseProducts();
  return withProductOverrides(await listFeaturedProductsFromSupabase(limit));
}

export async function listPublishedProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    warnMockFallback("Catálogo");
    return withProductOverrides(listPublishedProductsFromMock());
  }

  const { listPublishedProductsFromSupabase } = await loadSupabaseProducts();
  return withProductOverrides(await listPublishedProductsFromSupabase());
}
