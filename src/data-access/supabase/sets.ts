import "server-only";

import { cache } from "react";

import { mapSetRow, type SetQueryRow } from "@/data-access/mappers/set";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { FragranceSet } from "@/types/content";

const SET_SELECT = `
  id,
  name,
  slug,
  description,
  price,
  compare_at_price,
  image_url,
  set_products (
    size_label,
    individual_price,
    position,
    products (
      id,
      name,
      slug,
      brands ( name )
    )
  )
`;

export const listFragranceSetsFromSupabase = cache(async (): Promise<FragranceSet[]> => {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("sets")
    .select(SET_SELECT)
    .eq("published", true)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`No se pudieron leer los sets: ${error.message}`);
  }

  return ((data ?? []) as SetQueryRow[]).map(mapSetRow);
});
