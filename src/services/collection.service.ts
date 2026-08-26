import { withoutHiddenSetProducts } from "@/data/combos";
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
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    return null;
  }

  return {
    ...collection,
    products: withoutHiddenSetProducts(collection.products),
  };
}
