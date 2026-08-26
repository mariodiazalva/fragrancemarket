import { ButtonLink } from "@/components/ui/Button";
import { ProductPrice } from "@/components/ui/ProductPrice";
import { getProductHref } from "@/lib/product";
import type { Product } from "@/types";

type DecantUpsellProps = {
  fullBottle: Product | null;
};

export function DecantUpsell({ fullBottle }: DecantUpsellProps) {
  return (
    <section className="theme-ink border border-elova-gold/30 bg-elova-graphite px-4 py-7 sm:px-8 sm:py-8">
      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-elova-gold sm:text-xs sm:tracking-[0.35em]">
        ¿Te gustó?
      </p>
      <h2 className="mt-4 font-serif text-2xl tracking-[0.04em] text-text-primary sm:text-3xl lg:text-4xl">
        Consigue el frasco completo.
      </h2>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-text-secondary">
        Si el vial te convence en la piel, el frasco completo es el siguiente
        paso. Aquí solo lo mostramos; la compra de esa presentación se hará
        desde su ficha.
      </p>

      {fullBottle ? (
        <div className="mt-8 flex flex-col gap-4 border-t border-elova-border pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-text-secondary">
              {fullBottle.brand}
            </p>
            <p className="mt-2 font-serif text-2xl text-text-primary">
              {fullBottle.name}
            </p>
            <div className="mt-3">
              <ProductPrice price={fullBottle.price} size="sm" />
            </div>
          </div>
          <ButtonLink
            href={getProductHref(fullBottle.slug)}
            variant="outline"
            fullWidth
            className="sm:w-auto"
          >
            Ver el frasco
          </ButtonLink>
        </div>
      ) : null}
    </section>
  );
}
