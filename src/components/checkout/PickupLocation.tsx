"use client";

import { STORE_PICKUP, storePickupMapEmbedUrl, storePickupMapsUrl } from "@/lib/shipping";

type PickupLocationProps = {
  selected: boolean;
  onSelect: () => void;
};

export function PickupLocation({ selected, onSelect }: PickupLocationProps) {
  return (
    <div
      className={[
        "border",
        selected ? "border-elova-gold bg-surface-elevated" : "border-elova-border bg-surface",
      ].join(" ")}
    >
      <label className="flex cursor-pointer gap-3 px-3 py-3 text-sm leading-relaxed">
        <input
          type="radio"
          name="shippingMethod"
          value="pickup"
          required
          checked={selected}
          onChange={onSelect}
          className="mt-1 shrink-0 accent-elova-gold"
        />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-text-primary">Recojo en local</span>
            <span className="text-[0.7rem] uppercase tracking-[0.12em] text-elova-gold">
              Gratis
            </span>
          </span>
          <span className="mt-1 block text-text-secondary">
            {STORE_PICKUP.line} — {STORE_PICKUP.city}
          </span>
        </span>
      </label>

      {selected ? (
        <div className="border-t border-elova-border">
          <iframe
            title="Mapa del local en Trujillo"
            src={storePickupMapEmbedUrl()}
            className="h-52 w-full border-0 grayscale-[0.35] contrast-[1.05] sm:h-64"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-3">
            <p className="text-xs leading-relaxed text-text-secondary">
              {STORE_PICKUP.line}, {STORE_PICKUP.city}
            </p>
            <a
              href={storePickupMapsUrl()}
              target="_blank"
              rel="noreferrer"
              className="text-[0.7rem] uppercase tracking-[0.12em] text-elova-gold hover:underline"
            >
              Abrir en Maps
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
