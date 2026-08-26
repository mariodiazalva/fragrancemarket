import { AddToCartButton } from "@/components/catalog/AddToCartButton";
import { ProductCard } from "@/components/ui/ProductCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProductBadges } from "@/lib/product";
import { productToCartDraft } from "@/services/cart.service";
import type { Product } from "@/types";

type FeaturedSectionProps = {
  products: Product[];
};

export function FeaturedSection({ products }: FeaturedSectionProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Catálogo"
          title="Los más deseados"
          description="Piezas que suelen pedirse primero: frascos, decants y firmas con más demanda."
        />

        <div className="reveal-stagger mt-10 flex w-full min-w-0 gap-3 overflow-x-auto overscroll-x-contain snap-x snap-mandatory no-scrollbar pb-2 sm:gap-4 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[min(17rem,85%)] snap-start sm:min-w-[46%] md:min-w-0"
            >
              <ProductCard
                name={product.name}
                brand={product.brand}
                slug={product.slug}
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                image={product.images[0]}
                imageSizes="(max-width: 767px) 85vw, (max-width: 1280px) 33vw, 25vw"
                rating={product.rating}
                badges={getProductBadges(product)}
                footer={
                  <AddToCartButton draft={productToCartDraft(product)} />
                }
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
