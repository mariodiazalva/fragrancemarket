import {
  getCollectionBySlugFromMock,
  listCollectionsFromMock,
} from "@/data-access/mock/collections";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { FragranceCollection } from "@/types/content";

export async function listCollectionSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return listCollectionsFromMock().map((item) => item.slug);
  }

  const { listCollectionSlugsFromSupabase } = await import(
    "@/data-access/supabase/collections"
  );

  return listCollectionSlugsFromSupabase();
}

export async function getCollectionBySlug(
  slug: string,
): Promise<FragranceCollection | null> {
  if (!isSupabaseConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[elova] Supabase no está configurado. Colecciones usan mock data.");
    }

    return getCollectionBySlugFromMock(slug);
  }

  const { getCollectionBySlugFromSupabase } = await import(
    "@/data-access/supabase/collections"
  );

  return getCollectionBySlugFromSupabase(slug);
}
