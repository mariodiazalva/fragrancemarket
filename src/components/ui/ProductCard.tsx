import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { ProductPrice } from "@/components/ui/ProductPrice";
import { Rating } from "@/components/ui/Rating";
import { getProductHref } from "@/lib/product";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  name: string;
  brand: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  image?: string;
  imageAlt?: string;
  imageSizes?: string;
  rating?: number;
  badges?: string[];
  footer?: ReactNode;
  className?: string;
  headingLevel?: "h2" | "h3";
};

export function ProductCard({
  name,
  brand,
  slug,
  price,
  compareAtPrice,
  image,
  imageAlt,
  imageSizes = "(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw",
  rating,
  badges = [],
  footer,
  className,
  headingLevel = "h3",
}: ProductCardProps) {
  const href = getProductHref(slug);
  const TitleTag = headingLevel;

  return (
    <article
      className={cn(
        "group flex h-full min-w-0 flex-col border border-elova-border bg-surface transition-[border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-elova-gold hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none",
        className,
      )}
    >
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden bg-surface-elevated">
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? `${name} de ${brand}`}
            fill
            sizes={imageSizes}
            className="object-cover transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(160deg,var(--elova-cream)_0%,var(--elova-cream-deep)_100%)]"
          />
        )}

        {badges.length > 0 ? (
          <div className="absolute left-2 top-2 flex max-w-[calc(100%-1rem)] flex-wrap gap-1.5 sm:left-3 sm:top-3 sm:gap-2">
            {badges.map((badge) => (
              <Badge key={badge} variant="gold">
                {badge}
              </Badge>
            ))}
          </div>
        ) : null}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-3 sm:p-5">
        <div className="min-w-0 space-y-1">
          <p className="text-[0.6rem] uppercase tracking-[0.14em] text-text-secondary sm:text-[0.65rem] sm:tracking-[0.22em]">
            {brand}
          </p>
          <TitleTag className="font-serif text-lg font-bold leading-tight tracking-[-0.02em] text-text-primary sm:text-xl">
            <Link href={href} className="transition-colors duration-200 hover:text-elova-gold">
              {name}
            </Link>
          </TitleTag>
        </div>

        {rating !== undefined ? <Rating value={rating} size="sm" showValue /> : null}

        <div className="mt-auto space-y-3">
          <ProductPrice price={price} compareAtPrice={compareAtPrice} size="sm" />
          {footer}
        </div>
      </div>
    </article>
  );
}
