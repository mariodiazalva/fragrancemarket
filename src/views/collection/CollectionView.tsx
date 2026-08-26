import { ProductGrid } from "@/components/catalog/ProductGrid";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { FragranceCollection } from "@/types/content";

type CollectionViewProps = {
  collection: FragranceCollection;
};

export function CollectionView({ collection }: CollectionViewProps) {
  return (
    <main className="flex-1 pb-20 pt-10 sm:pt-14">
      <Container>
        <div className="elova-fade-up">
          <p className="text-xs uppercase tracking-[0.35em] text-elova-gold">Colección</p>
          <h1 className="mt-4 font-serif text-[2rem] tracking-[0.04em] text-text-primary sm:text-4xl sm:tracking-[0.06em] lg:text-5xl">
            {collection.name}
          </h1>
          {collection.description ? (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary">
              {collection.description}
            </p>
          ) : null}
        </div>

        <Reveal>
          <div className="mt-10">
            {collection.products.length === 0 ? (
              <p className="border border-elova-border px-5 py-12 text-center text-sm text-text-secondary">
                Esta colección aún no tiene piezas publicadas.
              </p>
            ) : (
              <ProductGrid products={collection.products} />
            )}
          </div>
        </Reveal>
      </Container>
    </main>
  );
}
