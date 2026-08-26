"use client";

import { useEffect } from "react";

import { CartLineItem } from "@/components/cart/CartLineItem";
import { CartRecommendations } from "@/components/cart/CartRecommendations";
import { CloseIcon } from "@/components/layout/icons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { cn, formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, totals, isOpen, justAdded, closeCart, clear } = useCart();
  const excludeIds = items.map((item) => item.productId);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCart();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeCart, isOpen]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60]",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Cerrar carrito"
        className={cn(
          "absolute inset-0 bg-elova-graphite/50 transition-opacity duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          isOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={closeCart}
      />

      <aside
        role="dialog"
        aria-modal="true"
        id="cart-drawer"
        aria-hidden={!isOpen}
        inert={!isOpen}
        aria-labelledby="cart-drawer-title"
        className={cn(
          "absolute inset-x-0 bottom-0 flex max-h-[92svh] w-full flex-col bg-elova-cream shadow-[0_-12px_40px_rgba(0,0,0,0.18)] transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[min(28rem,100%)] md:shadow-[-12px_0_40px_rgba(0,0,0,0.18)]",
          isOpen
            ? "translate-x-0 translate-y-0"
            : "translate-y-full md:translate-x-full md:translate-y-0",
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-elova-border px-4 py-4 sm:px-5">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-elova-gold">
              Tu selección
            </p>
            <h2 id="cart-drawer-title" className="font-serif text-2xl font-bold tracking-[-0.02em] text-text-primary">
              Carrito
            </h2>
          </div>
          <button
            type="button"
            aria-label="Cerrar carrito"
            onClick={closeCart}
            className="inline-flex size-11 items-center justify-center text-text-primary transition-colors duration-200 hover:text-elova-gold"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        {justAdded ? (
          <p
            role="status"
            className="elova-fade-in border-b border-elova-border bg-elova-gold/10 px-5 py-3 text-sm text-text-primary"
          >
            Agregado a tu carrito.
          </p>
        ) : null}

        <div className="min-h-0 flex-1 overflow-y-auto px-4 sm:px-5">
          {items.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-serif text-2xl text-text-primary">Tu carrito está vacío</p>
              <p className="mt-3 text-sm text-text-secondary">
                Elige un decant o un frasco para empezar.
              </p>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <CartLineItem key={item.lineId} item={item} compact />
              ))}
              {items.length > 0 ? (
                <button
                  type="button"
                  onClick={clear}
                  className="mb-4 min-h-11 text-[0.7rem] uppercase tracking-[0.16em] text-text-secondary transition-colors duration-200 hover:text-elova-gold"
                >
                  Vaciar carrito
                </button>
              ) : null}
            </div>
          )}

          <div className="py-6">
            <CartRecommendations
              excludeProductIds={excludeIds}
              compact
              active={isOpen}
            />
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-elova-border bg-elova-cream px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-5">
          <div className="mb-4 space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-[0.7rem] uppercase tracking-[0.16em] text-text-secondary">
                Subtotal
              </span>
              <span className="text-sm text-text-primary">{formatPrice(totals.subtotal)}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-[0.7rem] uppercase tracking-[0.16em] text-text-secondary">
                Total
              </span>
              <span className="text-lg text-text-primary">{formatPrice(totals.total)}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <ButtonLink href="/carrito" fullWidth onClick={closeCart}>
              Ver carrito
            </ButtonLink>
            <Button variant="outline" fullWidth onClick={closeCart}>
              Seguir viendo
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
