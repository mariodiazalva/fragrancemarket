import {
  getFragranceSetBySlugFromStore,
  listFragranceSets,
} from "@/data-access/sets";
import type { FragranceSet } from "@/types/content";

/**
 * Set catalog. Home, /combos and PDP contents read from here.
 * Swap is in the data-access layer; views stay the same.
 */
export async function getFragranceSets(): Promise<FragranceSet[]> {
  return listFragranceSets();
}

export async function getFragranceSetBySlug(
  slug: string,
): Promise<FragranceSet | null> {
  return getFragranceSetBySlugFromStore(slug);
}
