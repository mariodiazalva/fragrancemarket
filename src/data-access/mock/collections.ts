import { listPublishedProductsFromMock } from "@/data-access/mock/products";
import type { FragranceCollection } from "@/types/content";
import type { Product } from "@/types/product";

const COLLECTION_META: Array<
  Omit<FragranceCollection, "products"> & {
    match: (product: Product) => boolean;
  }
> = [
  {
    id: "col-frescos",
    name: "Frescos",
    slug: "frescos",
    description: "Cítricos y aromas claros para el día.",
    match: (product) =>
      product.fragranceFamily.includes("fresco") ||
      product.fragranceFamily.includes("cítrico"),
  },
  {
    id: "col-seductores",
    name: "Seductores",
    slug: "seductores",
    description: "Composiciones más cercanas, para un encuentro.",
    match: (product) =>
      product.occasions.includes("cita") ||
      (product.fragranceFamily.includes("ámbar") &&
        product.fragranceFamily.includes("oriental")),
  },
  {
    id: "col-intensos",
    name: "Intensos",
    slug: "intensos",
    description: "Ouds, maderas y piezas de más presencia.",
    match: (product) =>
      product.fragranceFamily.includes("oud") ||
      product.fragranceFamily.includes("amaderado"),
  },
  {
    id: "col-elegantes",
    name: "Elegantes",
    slug: "elegantes",
    description: "Florales precisos y firmas de corte formal.",
    match: (product) => product.fragranceFamily.includes("floral"),
  },
];

function withProducts(): FragranceCollection[] {
  const catalog = listPublishedProductsFromMock().filter(
    (product) => product.type !== "set",
  );

  return COLLECTION_META.map(({ match, ...meta }) => ({
    ...meta,
    products: catalog.filter(match),
  }));
}

export function listCollectionsFromMock(): FragranceCollection[] {
  return withProducts();
}

export function getCollectionBySlugFromMock(
  slug: string,
): FragranceCollection | null {
  return withProducts().find((item) => item.slug === slug) ?? null;
}
