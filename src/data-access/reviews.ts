import { listDemoReviewsFromMock } from "@/data-access/mock/reviews";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { DemoReview } from "@/types/content";

export async function listDemoReviews(): Promise<DemoReview[]> {
  if (!isSupabaseConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[elova] Supabase no está configurado. Reseñas usan mock data.");
    }

    return listDemoReviewsFromMock();
  }

  const { listDemoReviewsFromSupabase } = await import(
    "@/data-access/supabase/reviews"
  );

  return listDemoReviewsFromSupabase();
}
