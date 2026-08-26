import { mockProducts } from "@/data/products";
import type { Product } from "@/types";

export function listPublishedProductsFromMock(): Product[] {
  return mockProducts;
}

export function listFeaturedProductsFromMock(limit: number): Product[] {
  return mockProducts.filter((product) => product.featured).slice(0, limit);
}
