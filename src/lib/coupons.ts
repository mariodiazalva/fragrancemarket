import { isArabicWeekndPerfume } from "@/data/promos";

export type CouponItem = {
  slug: string;
  price: number;
  quantity: number;
};

export type CouponDefinition = {
  code: string;
  storePercent: number;
  arabicExtraPercent: number;
};

export type CouponQuote = CouponDefinition & {
  discountAmount: number;
  arabicSubtotal: number;
  label: string;
};

export const BAEES10_COUPON: CouponDefinition = {
  code: "BAEES10",
  storePercent: 10,
  arabicExtraPercent: 5,
};

export function normalizeCouponCode(value: string): string {
  return value.trim().toUpperCase();
}

export function findCoupon(code: string): CouponDefinition | null {
  if (normalizeCouponCode(code) === BAEES10_COUPON.code) {
    return BAEES10_COUPON;
  }

  return null;
}

export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

export function arabicWeekndSubtotal(items: CouponItem[]): number {
  return roundMoney(
    items.reduce((total, item) => {
      if (!isArabicWeekndPerfume(item.slug)) {
        return total;
      }

      return total + item.price * item.quantity;
    }, 0),
  );
}

export function quoteCoupon(
  code: string,
  items: CouponItem[],
  shippingAmount = 0,
): CouponQuote | null {
  const coupon = findCoupon(code);

  if (!coupon) {
    return null;
  }

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const arabicSubtotal = arabicWeekndSubtotal(items);
  const base = Math.max(0, subtotal) + Math.max(0, shippingAmount);
  const discountAmount = roundMoney(
    base * (coupon.storePercent / 100) + arabicSubtotal * (coupon.arabicExtraPercent / 100),
  );

  return {
    ...coupon,
    arabicSubtotal,
    discountAmount,
    label:
      arabicSubtotal > 0
        ? `${coupon.storePercent}% en el total (incluye envío) y +${coupon.arabicExtraPercent}% en Arabic Weeknd`
        : `${coupon.storePercent}% en el total, incluido el envío`,
  };
}
