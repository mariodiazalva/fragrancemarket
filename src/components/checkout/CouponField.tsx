"use client";

import type { CouponQuote } from "@/lib/coupons";

type CouponFieldProps = {
  id: string;
  value: string;
  quote: CouponQuote | null;
  onChange: (value: string) => void;
};

export function CouponField({ id, value, quote, onChange }: CouponFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-[0.7rem] uppercase tracking-[0.14em] text-text-secondary"
      >
        Cupón
      </label>
      <input
        id={id}
        name="couponCode"
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Código"
        className="h-11 w-full min-w-0 border border-elova-black bg-elova-black px-4 text-base text-elova-white caret-elova-white placeholder:text-elova-white/55 focus:border-elova-black focus:outline-none focus:ring-1 focus:ring-elova-white/40 sm:text-sm"
      />
      {quote ? (
        <p className="text-[0.7rem] leading-relaxed text-text-secondary">
          {quote.code}: {quote.label}
        </p>
      ) : value.trim() ? (
        <p className="text-[0.7rem] text-red-700">Ese código no es válido.</p>
      ) : null}
    </div>
  );
}
