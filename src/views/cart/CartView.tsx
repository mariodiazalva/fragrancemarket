"use client";

import { CartLineItem } from "@/components/cart/CartLineItem";
import { CartRecommendations } from "@/components/cart/CartRecommendations";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";

export function CartView() {
  const { items, totals, clear } = useCart();
  const excludeIds = items.map((item) => item.productId);

  return (
    <main className="flex-1 pb-28 pt-8 sm:pb-16 sm:pt-12">
      <Container>
        <div className="elova-fade-up">
          <p className="text-xs uppercase tracking-[0.35em] text-elova-gold">Compra</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-serif text-[2rem] font-bold tracking-[-0.02em] text-text-primary sm:text-4xl lg:text-5xl">
              Carrito
            </h1>
            {items.length > 0 ? (
              <button
                type="button"
                onClick={clear}
                className="inline-flex min-h-11 items-center text-[0.7rem] uppercase tracking-[0.16em] text-text-secondary transition-colors hover:text-elova-gold"
              >
                Vaciar carrito
              </button>
            ) : null}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="mt-12 border border-elova-border px-5 py-12 text-center">
            <p className="font-serif text-2xl text-text-primary">Tu carrito está vacío</p>
            <p className="mx-auto mt-3 max-w-md text-sm text-text-secondary">
              Agrega un decant o un frasco. Puedes cambiar la presentación y la
              cantidad cuando quieras.
            </p>
            <div className="mt-6">
              <ButtonLink href="/perfumes" variant="outline">
                Ver perfumes
              </ButtonLink>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <section>
              <h2 className="sr-only">Productos en el carrito</h2>
              {items.map((item) => (
                <CartLineItem key={item.lineId} item={item} />
              ))}
            </section>

            <aside className="hidden h-fit border border-elova-border bg-surface p-5 lg:block">
              <CartSummary subtotal={totals.subtotal} total={totals.total} />
              <div className="mt-5">
                <ButtonLink href="/checkout" fullWidth>
                  Continuar
                </ButtonLink>
              </div>
            </aside>
          </div>
        )}

        <Reveal>
          <div className="mt-12">
            <CartRecommendations excludeProductIds={excludeIds} />
          </div>
        </Reveal>
      </Container>

      {items.length > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-elova-border bg-elova-cream/95 px-5 py-3 backdrop-blur-md lg:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <CartSummary subtotal={totals.subtotal} total={totals.total} compact />
          <div className="mt-3">
            <ButtonLink href="/checkout" fullWidth>
              Continuar
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function CartSummary({
  subtotal,
  total,
  compact = false,
}: {
  subtotal: number;
  total: number;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "flex items-center justify-between gap-4" : "space-y-4"}>
      <div className={compact ? "min-w-0" : "space-y-3"}>
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[0.7rem] uppercase tracking-[0.16em] text-text-secondary">
            Subtotal
          </span>
          <span className="text-sm text-text-primary">{formatPrice(subtotal)}</span>
        </div>
        <div className={`flex items-baseline justify-between gap-4 ${compact ? "" : "border-t border-elova-border pt-3"}`}>
          <span className="text-[0.7rem] uppercase tracking-[0.16em] text-text-secondary">
            Total
          </span>
          <span className="text-base text-text-primary">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
