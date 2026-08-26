import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { getProductHref, getSetIndividualTotal, getSetSavings } from "@/lib/product";
import { formatPrice } from "@/lib/utils";
import type { FragranceSet } from "@/types";

type SetCardProps = {
  set: FragranceSet;
};

export function SetCard({ set }: SetCardProps) {
  const individualTotal = getSetIndividualTotal(set);
  const savings = getSetSavings(set);
  const href = getProductHref(set.slug);

  return (
    <article className="group flex h-full flex-col border border-elova-border bg-surface transition-[border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-elova-gold hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none">
      <Link href={href} className="relative block aspect-[3/4] overflow-hidden bg-surface-elevated">
        <Image
          src={set.image}
          alt={`Set ${set.name}`}
          fill
          sizes="(max-width: 768px) 90vw, 50vw"
          className="object-cover transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 sm:p-5">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-elova-gold">
            Set
          </p>
          <h3 className="mt-2 font-serif text-xl font-bold tracking-[-0.02em] text-text-primary sm:text-2xl">
            <Link href={href} className="transition-colors hover:text-elova-gold">
              {set.name}
            </Link>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {set.description}
          </p>
        </div>

        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-text-secondary">
            Incluye
          </p>
          <ul className="mt-3 space-y-2">
            {set.items.map((item) => (
              <li
                key={`${set.id}-${item.productId}`}
                className="flex items-baseline justify-between gap-3 text-sm"
              >
                <span className="min-w-0 text-text-primary">
                  {item.name}
                  <span className="block text-[0.7rem] uppercase tracking-[0.12em] text-text-secondary">
                    {item.brand} · {item.sizeLabel}
                  </span>
                </span>
                <span className="shrink-0 text-text-secondary">
                  {formatPrice(item.individualPrice)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto space-y-3 border-t border-elova-border pt-4">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[0.7rem] uppercase tracking-[0.16em] text-text-secondary">
              Precio individual
            </span>
            <span className="text-sm text-text-secondary line-through">
              {formatPrice(individualTotal)}
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[0.7rem] uppercase tracking-[0.16em] text-text-secondary">
              Precio del set
            </span>
            <span className="text-base text-text-primary">
              {formatPrice(set.price)}
            </span>
          </div>
          {savings > 0 ? (
            <p className="text-[0.7rem] uppercase tracking-[0.16em] text-elova-gold">
              Ahorras {formatPrice(savings)}
            </p>
          ) : null}
          <ButtonLink href={href} fullWidth>
            Elegir este set
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
