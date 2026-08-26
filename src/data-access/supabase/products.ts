import "server-only";

import { cache } from "react";

import { mapProductRow } from "@/data-access/mappers/product";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ProductQueryRow } from "@/types/database";
import type { Product } from "@/types";

const PRODUCT_SELECT = `
  id,
  name,
  slug,
  description,
  type,
  gender,
  price,
  compare_at_price,
  stock,
  fragrance_family,
  occasions,
  intensity,
  seo_title,
  seo_description,
  rating,
  rating_count,
  featured,
  bestseller,
  created_at,
  updated_at,
  brands ( name ),
  categories ( slug ),
  product_variants ( label, volume_ml, price, compare_at_price, stock, sku, sort_order ),
  product_images ( url, alt, position ),
  product_notes ( stage, position, fragrance_notes ( name ) )
`;

function mapRows(data: unknown): Product[] {
  return ((data ?? []) as ProductQueryRow[]).map(mapProductRow);
}

export const listPublishedProductsFromSupabase = cache(async (): Promise<Product[]> => {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`No se pudieron leer los productos del catálogo: ${error.message}`);
  }

  return mapRows(data);
});

export async function listFeaturedProductsFromSupabase(limit: number): Promise<Product[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("published", true)
    .eq("featured", true)
    .order("sort_order", { ascending: true })
    .limit(limit);

  if (error) {
    throw new Error(`No se pudieron leer los productos destacados: ${error.message}`);
  }

  return mapRows(data);
}
