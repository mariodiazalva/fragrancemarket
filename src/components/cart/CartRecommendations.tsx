"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { getProductHref } from "@/lib/product";
import { formatPrice } from "@/lib/utils";
import { productToCartDraft } from "@/services/cart.service";
import type { Product } from "@/types/product";

type CartRecommendationsProps = {
  excludeProductIds: string[];
  compact?: boolean;
  active?: boolean;
};

export function CartRecommendations({
  excludeProductIds,
  compact = false,
  active = true,
}: CartRecommendationsProps) {
  const { add } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const excludeKey = excludeProductIds.join(",");
  const limit = compact ? 3 : 4;

  useEffect(() => {
    const isPhone = window.matchMedia("(max-width: 767px)").matches;

    if (isPhone && !active) {
      return;
    }

    const params = new URLSearchParams({ limit: String(limit) });

    if (excludeKey) {
      params.set("exclude", excludeKey);
    }

    let cancelled = false;

    fetch(`/api/catalog/recommendations?${params.toString()}`)
      .then((response) => (response.ok ? response.json() : []))
      .then((data: Product[]) => {
        if (!cancelled) {
          setProducts(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setProducts([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [active, excludeKey, limit]);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-[0.7rem] uppercase tracking-[0.2em] text-text-secondary">
        También te puede gustar
      </h2>
      <div
        className={
          compact
            ? "flex w-full min-w-0 gap-3 overflow-x-auto overscroll-x-contain pb-1 no-scrollbar"
            : "grid min-w-0 grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4"
        }
      >
        {products.map((product) => {
          const href = getProductHref(product.slug);
          const draft = productToCartDraft(product);
          const soldOut =
            (draft.variants.find((variant) => variant.label === draft.sizeLabel)?.stock ?? 0) <= 0;

          return (
            <article
              key={product.id}
              className={
                compact
                  ? "min-w-[9.5rem] max-w-[9.5rem] border border-elova-border bg-surface"
                  : "border border-elova-border bg-surface"
              }
            >
              <Link href={href} className="relative block aspect-[4/5] overflow-hidden bg-surface-elevated">
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={`${product.name} de ${product.brand}`}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                ) : null}
              </Link>
              <div className="space-y-2 p-3">
                <p className="truncate text-[0.6rem] uppercase tracking-[0.16em] text-text-secondary">
                  {product.brand}
                </p>
                <h3 className="truncate font-serif text-sm text-text-primary">
                  <Link href={href} className="hover:text-elova-gold">
                    {product.name}
                  </Link>
                </h3>
                <p className="text-xs text-text-primary">{formatPrice(draft.price)}</p>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  disabled={soldOut}
                  onClick={() => add(draft)}
                >
                  {soldOut ? "Agotado" : "Agregar"}
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
