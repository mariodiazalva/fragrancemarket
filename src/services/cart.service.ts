import { getDefaultSize } from "@/lib/product";
import type { CartDraft, CartVariant } from "@/types/cart";
import type { Product } from "@/types/product";

export function productToCartDraft(
  product: Product,
  sizeLabel?: string,
  quantity = 1,
): CartDraft {
  const selected =
    product.sizes.find((size) => size.label === sizeLabel) ?? getDefaultSize(product);

  const variants: CartVariant[] = product.sizes.map((size) => ({
    label: size.label,
    volumeMl: size.volumeMl,
    price: size.price,
    compareAtPrice: size.compareAtPrice,
    stock: size.stock,
  }));

  return {
    productId: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    image: product.images[0],
    sizeLabel: selected.label,
    volumeMl: selected.volumeMl,
    price: selected.price,
    compareAtPrice: selected.compareAtPrice,
    quantity,
    variants,
  };
}

export function pickCartRecommendations(
  products: Product[],
  excludeProductIds: string[],
  limit = 4,
): Product[] {
  const excluded = new Set(excludeProductIds);
  const available = products.filter((product) => !excluded.has(product.id));
  const featured = available.filter((product) => product.featured || product.bestseller);
  const rest = available.filter((product) => !product.featured && !product.bestseller);

  return [...featured, ...rest].slice(0, limit);
}
