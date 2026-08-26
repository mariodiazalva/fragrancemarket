"use client";

import Image from "next/image";
import Link from "next/link";

import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { useCart } from "@/hooks/useCart";
import { getProductHref } from "@/lib/product";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/types/cart";

type CartLineItemProps = {
  item: CartItem;
  compact?: boolean;
};

export function CartLineItem({ item, compact = false }: CartLineItemProps) {
  const { updateQuantity, changeVariant, remove, closeCart } = useCart();
  const href = getProductHref(item.slug);
  const selectedVariant =
    item.variants.find((variant) => variant.label === item.sizeLabel) ?? item.variants[0];
  const maxStock = selectedVariant?.stock ?? item.quantity;
  const lineTotal = item.price * item.quantity;

  return (
    <article className="cart-line-enter flex min-w-0 gap-3 border-b border-elova-border py-5 last:border-b-0 sm:gap-4">
      <Link
        href={href}
        onClick={closeCart}
        className="relative block size-16 shrink-0 overflow-hidden bg-surface-elevated sm:size-24"
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={`${item.name} de ${item.brand}`}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 bg-[linear-gradient(160deg,var(--elova-cream)_0%,var(--elova-cream-deep)_100%)]" />
        )}
      </Link>

      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[0.6rem] uppercase tracking-[0.14em] text-text-secondary sm:text-[0.65rem] sm:tracking-[0.18em]">
              {item.brand}
            </p>
            <p className="font-serif text-base leading-tight tracking-[0.03em] text-text-primary sm:text-lg">
              <Link href={href} onClick={closeCart} className="transition-colors hover:text-elova-gold">
                {item.name}
              </Link>
            </p>
          </div>
          <p className="shrink-0 text-sm text-text-primary">{formatPrice(lineTotal)}</p>
        </div>

        {item.variants.length > 1 ? (
          <label className="block">
            <span className="sr-only">Presentación de {item.name}</span>
            <select
              value={item.sizeLabel}
              onChange={(event) => {
                const next = item.variants.find((variant) => variant.label === event.target.value);
                if (next) {
                  changeVariant(item.lineId, next);
                }
              }}
              className="h-11 w-full border border-elova-border bg-transparent px-3 text-xs uppercase tracking-[0.14em] text-text-primary focus:border-elova-gold/50 focus:outline-none"
            >
              {item.variants.map((variant) => (
                <option key={variant.label} value={variant.label} disabled={variant.stock <= 0}>
                  {variant.label} · {formatPrice(variant.price)}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <p className="text-xs uppercase tracking-[0.14em] text-text-secondary">
            {item.sizeLabel}
          </p>
        )}

        <div className={`flex min-w-0 flex-wrap items-center gap-2 ${compact ? "justify-between" : "justify-between sm:justify-start sm:gap-6"}`}>
          <QuantityStepper
            value={item.quantity}
            min={0}
            max={maxStock}
            label={item.name}
            onChange={(quantity) => updateQuantity(item.lineId, quantity)}
          />
          <button
            type="button"
            onClick={() => remove(item.lineId)}
            className="inline-flex min-h-11 items-center px-2 text-[0.7rem] uppercase tracking-[0.16em] text-text-secondary transition-colors hover:text-elova-gold"
          >
            Quitar
          </button>
        </div>
      </div>
    </article>
  );
}
