import { AddToCartButton } from "@/components/catalog/AddToCartButton";
import { ProductCard } from "@/components/ui/ProductCard";
import { getProductBadges } from "@/lib/product";
import { productToCartDraft } from "@/services/cart.service";
import type { Product } from "@/types";

type ProductGridProps = {
  products: Product[];
  headingLevel?: "h2" | "h3";
};

export function ProductGrid({ products, headingLevel = "h2" }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="border border-elova-border px-5 py-12 text-center text-sm text-text-secondary">
        No encontramos fragancias con esos filtros. Prueba otra búsqueda o limpia
        los filtros.
      </p>
    );
  }

  return (
    <div className="reveal-stagger grid min-w-0 grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          brand={product.brand}
          slug={product.slug}
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          image={product.images[0]}
          rating={product.rating}
          badges={getProductBadges(product)}
          headingLevel={headingLevel}
          footer={
            <AddToCartButton draft={productToCartDraft(product)} />
          }
        />
      ))}
    </div>
  );
}
