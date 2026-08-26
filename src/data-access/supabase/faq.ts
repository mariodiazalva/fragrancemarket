import "server-only";

import { cache } from "react";

import { mapFaqRow, type FaqQueryRow } from "@/data-access/mappers/faq";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { FaqItem } from "@/types/content";

export const listFaqsFromSupabase = cache(async (): Promise<FaqItem[]> => {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("id, question, answer")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    const missingTable =
      error.code === "PGRST205" ||
      /could not find the table/i.test(error.message) ||
      /relation ["']?public\.faqs["']? does not exist/i.test(error.message);

    if (missingTable) {
      throw new Error("FAQ_TABLE_MISSING");
    }

    throw new Error(`No se pudieron leer las preguntas frecuentes: ${error.message}`);
  }

  return ((data ?? []) as FaqQueryRow[]).map(mapFaqRow);
});
