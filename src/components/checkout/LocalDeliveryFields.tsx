"use client";

import { Input } from "@/components/ui/Input";
import { TRUJILLO_DISTRICTS, type TrujilloDeliveryQuote } from "@/lib/trujillo-delivery";
import { formatPrice } from "@/lib/utils";

const selectClassName =
  "h-11 w-full min-w-0 border border-elova-border bg-surface px-4 text-base text-text-primary focus:border-elova-gold/50 focus:bg-surface-elevated focus:outline-none sm:text-sm";

type LocalDeliveryFieldsProps = {
  selected: boolean;
  onSelect: () => void;
  district: string;
  deliveryLine: string;
  quote: TrujilloDeliveryQuote | null;
  onDistrictChange: (value: string) => void;
  onDeliveryLineChange: (value: string) => void;
};

export function LocalDeliveryFields({
  selected,
  onSelect,
  district,
  deliveryLine,
  quote,
  onDistrictChange,
  onDeliveryLineChange,
}: LocalDeliveryFieldsProps) {
  const priceLabel = quote ? formatPrice(quote.amount) : "S/ 5 a S/ 10";

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
          value="local"
          required
          checked={selected}
          onChange={onSelect}
          className="mt-1 shrink-0 accent-elova-gold"
        />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-text-primary">Delivery en Trujillo</span>
            <span className="text-[0.7rem] uppercase tracking-[0.12em] text-elova-gold">
              {priceLabel}
            </span>
          </span>
          <span className="mt-1 block text-text-secondary">
            Céntrico {formatPrice(5)} · intermedio {formatPrice(8)} · alejado {formatPrice(10)}.
          </span>
        </span>
      </label>

      {selected ? (
        <div className="space-y-4 border-t border-elova-border px-3 py-4">
          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="localDistrict"
              className="text-xs font-medium uppercase tracking-[0.14em] text-text-secondary"
            >
              Distrito
            </label>
            <select
              id="localDistrict"
              name="localDistrict"
              required
              value={district}
              onChange={(event) => onDistrictChange(event.target.value)}
              className={selectClassName}
            >
              <option value="">Elige un distrito</option>
              {TRUJILLO_DISTRICTS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Dirección de entrega"
            name="deliveryLine"
            autoComplete="street-address"
            required
            minLength={5}
            maxLength={160}
            hint="Calle, manzana, lote o referencia. Con eso afinamos si es céntrico, intermedio o alejado."
            value={deliveryLine}
            onChange={(event) => onDeliveryLineChange(event.target.value)}
          />
          {quote ? (
            <p className="text-sm text-text-secondary">
              {quote.label}: {formatPrice(quote.amount)}
            </p>
          ) : (
            <p className="text-sm text-text-secondary">
              Elige el distrito para ver el costo de delivery.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
