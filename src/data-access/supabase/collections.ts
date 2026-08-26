import "server-only";

import { cache } from "react";

import { listPublishedProductsFromSupabase } from "@/data-access/supabase/products";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { FragranceCollection } from "@/types/content";

type CollectionRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

type CollectionProductRow = {
  product_id: string;
  position: number | null;
};

export const listCollectionSlugsFromSupabase = cache(async (): Promise<string[]> => {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("collections")
    .select("slug")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`No se pudieron leer las colecciones: ${error.message}`);
  }

  return (data ?? []).map((row) => row.slug).filter(Boolean);
});

export async function getCollectionBySlugFromSupabase(
  slug: string,
): Promise<FragranceCollection | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("collections")
    .select("id, name, slug, description")
    .eq("published", true)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`No se pudo leer la colección: ${error.message}`);
  }

  const collection = data as CollectionRow | null;

  if (!collection) {
    return null;
  }

  const { data: links, error: linksError } = await supabase
    .from("collection_products")
    .select("product_id, position")
    .eq("collection_id", collection.id)
    .order("position", { ascending: true });

  if (linksError) {
    throw new Error(`No se pudieron leer las piezas de la colección: ${linksError.message}`);
  }

  const catalog = await listPublishedProductsFromSupabase();
  const byId = new Map(catalog.map((product) => [product.id, product]));
  const products = ((links ?? []) as CollectionProductRow[])
    .map((link) => byId.get(link.product_id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return {
    id: collection.id,
    name: collection.name,
    slug: collection.slug,
    description: collection.description ?? "",
    products,
  };
}
