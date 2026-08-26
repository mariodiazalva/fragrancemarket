import "server-only";

import { cache } from "react";

import { mapReviewRow, type ReviewQueryRow } from "@/data-access/mappers/review";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { DemoReview } from "@/types/content";

const REVIEW_SELECT = `
  id,
  author_name,
  rating,
  title,
  body,
  is_demo,
  products ( name )
`;

export const listDemoReviewsFromSupabase = cache(async (): Promise<DemoReview[]> => {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("reviews")
    .select(REVIEW_SELECT)
    .eq("is_published", true)
    .eq("is_demo", true)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`No se pudieron leer las reseñas: ${error.message}`);
  }

  return ((data ?? []) as ReviewQueryRow[]).map(mapReviewRow);
});
