import { listFragranceSetsFromMock } from "@/data-access/mock/sets";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { FragranceSet } from "@/types/content";

export async function listFragranceSets(): Promise<FragranceSet[]> {
  if (!isSupabaseConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[elova] Supabase no está configurado. Sets usan mock data.");
    }

    return listFragranceSetsFromMock();
  }

  const { listFragranceSetsFromSupabase } = await import(
    "@/data-access/supabase/sets"
  );

  return listFragranceSetsFromSupabase();
}

export async function getFragranceSetBySlugFromStore(
  slug: string,
): Promise<FragranceSet | null> {
  const sets = await listFragranceSets();
  return sets.find((item) => item.slug === slug) ?? null;
}
