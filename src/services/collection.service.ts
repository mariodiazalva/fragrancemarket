import {
  getCollectionBySlug,
  listCollectionSlugs,
} from "@/data-access/collections";
import type { FragranceCollection } from "@/types/content";

export async function getCollectionSlugs(): Promise<string[]> {
  return listCollectionSlugs();
}

export async function getFragranceCollectionBySlug(
  slug: string,
): Promise<FragranceCollection | null> {
  return getCollectionBySlug(slug);
}
