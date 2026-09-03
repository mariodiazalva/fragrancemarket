import Link from "next/link";

import { DecantUpsell } from "@/components/product/DecantUpsell";
import { SetContents } from "@/components/product/SetContents";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductReassurance } from "@/components/product/ProductReassurance";
import { RelatedRail } from "@/components/product/RelatedRail";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/ui/Reveal";
import { SALE_BADGE_LABEL } from "@/data/promos";
import { genderLabels, typeLabels } from "@/lib/catalog";
import { getBadgeVariant, getProductBadges } from "@/lib/product";
import type { FragranceSet, Product } from "@/types";
import type { RelatedProducts } from "@/services/product.service";

type ProductViewProps = {
  product: Product;
  related: RelatedProducts;
  fullBottle?: Product | null;
  fragranceSet?: FragranceSet | null;
};

const catalogHref: Record<Product["type"], string> = {
  perfume: "/perfumes",
  decant: "/decants",
  set: "/combos",
};

export function ProductView({
  product,
  related,
  fullBottle = null,
  fragranceSet = null,
}: ProductViewProps) {
  const badges = getProductBadges(product);

  return (
    <main className="pb-20 pt-8 sm:pt-12">
      <Container>
        <nav aria-label="Migas de pan" className="text-[0.65rem] uppercase tracking-[0.12em] text-text-secondary sm:text-[0.7rem] sm:tracking-[0.16em]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-elova-gold">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={catalogHref[product.type]}
                className="transition-colors hover:text-elova-gold"
              >
                {typeLabels[product.type]}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-text-primary" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="elova-fade-up mt-8 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <ProductGallery
            images={product.images}
            alt={`${product.name} de ${product.brand}`}
          />

          <div className="space-y-8">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-text-secondary">
                {product.brand}
              </p>
              <h1 className="mt-3 flex flex-wrap items-center gap-3 font-serif text-[2rem] font-bold tracking-[-0.02em] text-text-primary sm:text-4xl lg:text-5xl">
                {product.name}
                {badges.includes(SALE_BADGE_LABEL) ? (
                  <Badge variant="sale">{SALE_BADGE_LABEL}</Badge>
                ) : null}
              </h1>
              <p className="mt-3 text-[0.7rem] uppercase tracking-[0.18em] text-text-secondary">
                {genderLabels[product.gender]}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {product.rating !== undefined ? (
                  <Rating value={product.rating} showValue />
                ) : null}
                {badges
                  .filter((badge) => badge !== SALE_BADGE_LABEL)
                  .map((badge) => (
                    <Badge key={badge} variant={getBadgeVariant(badge)}>
                      {badge}
                    </Badge>
                  ))}
              </div>
            </div>

            <ProductPurchase product={product} />
            {fragranceSet ? <SetContents set={fragranceSet} /> : null}
            {product.type === "decant" ? (
              <DecantUpsell fullBottle={fullBottle} />
            ) : null}
            <ProductDetails product={product} />
          </div>
        </div>

        <div className="mt-16">
          <Reveal>
            <ProductReassurance />
          </Reveal>
        </div>

        <div className="mt-16 space-y-16">
          <Reveal>
            <RelatedRail title="También te puede gustar" products={related.youMayLike} />
          </Reveal>
          <Reveal>
            <RelatedRail title="Combínalo con" products={related.pairWith} />
          </Reveal>
          <Reveal>
            <RelatedRail title="Otros de la misma marca" products={related.sameBrand} />
          </Reveal>
        </div>
      </Container>
    </main>
  );
}
