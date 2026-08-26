import { ProductCard } from "@/components/ui/ProductCard";
import { getProductBadges } from "@/lib/product";
import type { Product } from "@/types";

type RelatedRailProps = {
  title: string;
  products: Product[];
};

export function RelatedRail({ title, products }: RelatedRailProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="font-serif text-xl tracking-[0.04em] text-text-primary sm:text-2xl lg:text-3xl">
        {title}
      </h2>
      <div className="mt-6 flex w-full min-w-0 gap-3 overflow-x-auto overscroll-x-contain snap-x snap-mandatory no-scrollbar pb-2 sm:gap-4 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[min(16.5rem,82%)] snap-start sm:min-w-[46%] md:min-w-0"
          >
            <ProductCard
              name={product.name}
              brand={product.brand}
              slug={product.slug}
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              image={product.images[0]}
              rating={product.rating}
              badges={getProductBadges(product)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
