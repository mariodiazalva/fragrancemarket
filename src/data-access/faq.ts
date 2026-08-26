import { listFaqsFromMock } from "@/data-access/mock/faq";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { FaqItem } from "@/types/content";

export async function listFaqs(): Promise<FaqItem[]> {
  if (!isSupabaseConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[elova] Supabase no está configurado. FAQ usa mock data.");
    }

    return listFaqsFromMock();
  }

  const { listFaqsFromSupabase } = await import("@/data-access/supabase/faq");

  try {
    return await listFaqsFromSupabase();
  } catch (error) {
    if (error instanceof Error && error.message === "FAQ_TABLE_MISSING") {
      return listFaqsFromMock();
    }

    throw error;
  }
}
