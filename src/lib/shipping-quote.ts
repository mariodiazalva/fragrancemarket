import type { ShippingAddress } from "@/lib/shipping";
import { quoteTrujilloDelivery } from "@/lib/trujillo-delivery";

export const SHALOM_SHIPPING_AMOUNT = 15;
export const PICKUP_SHIPPING_AMOUNT = 0;

export type ShippingMethod = "pickup" | "local" | "shalom";

export function quoteShippingAmount(shipping: ShippingAddress): number {
  if (shipping.carrier === "Pickup") {
    return PICKUP_SHIPPING_AMOUNT;
  }

  if (shipping.carrier === "Shalom") {
    return SHALOM_SHIPPING_AMOUNT;
  }

  if (shipping.carrier === "Local") {
    const quoted = quoteTrujilloDelivery(shipping.district ?? "", shipping.line);

    if (!quoted) {
      throw new Error("Elige un distrito de Trujillo para el delivery.");
    }

    return quoted.amount;
  }

  throw new Error("Elige un método de envío.");
}
