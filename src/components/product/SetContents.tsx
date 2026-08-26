import Link from "next/link";

import { getProductHref, getSetIndividualTotal, getSetSavings } from "@/lib/product";
import { formatPrice } from "@/lib/utils";
import type { FragranceSet } from "@/types";

type SetContentsProps = {
  set: FragranceSet;
};

export function SetContents({ set }: SetContentsProps) {
  const individualTotal = getSetIndividualTotal(set);
  const savings = getSetSavings(set);

  return (
    <section className="border border-elova-border px-4 py-5 sm:px-5 sm:py-6">
      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-text-secondary">
        Perfumes incluidos
      </p>
      <ul className="mt-4 space-y-3">
        {set.items.map((item) => (
          <li
            key={item.productId}
            className="flex items-baseline justify-between gap-3 border-b border-elova-border-subtle pb-3 last:border-b-0 last:pb-0"
          >
            <Link
              href={getProductHref(item.slug)}
              className="min-w-0 text-sm text-text-primary transition-colors hover:text-elova-gold"
            >
              {item.name}
              <span className="mt-1 block text-[0.7rem] uppercase tracking-[0.12em] text-text-secondary">
                {item.brand} · {item.sizeLabel}
              </span>
            </Link>
            <span className="shrink-0 text-sm text-text-secondary">
              {formatPrice(item.individualPrice)}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-5 space-y-2 text-sm">
        <p className="flex justify-between text-text-secondary">
          <span>Si los compras sueltos</span>
          <span className="line-through">{formatPrice(individualTotal)}</span>
        </p>
        <p className="flex justify-between text-text-primary">
          <span>Precio del set</span>
          <span>{formatPrice(set.price)}</span>
        </p>
        {savings > 0 ? (
          <p className="text-[0.7rem] uppercase tracking-[0.16em] text-elova-gold">
            Ahorras {formatPrice(savings)}
          </p>
        ) : null}
      </div>
    </section>
  );
}
