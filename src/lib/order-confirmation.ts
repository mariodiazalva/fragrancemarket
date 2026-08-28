import { storePickupMapEmbedUrl, type BillingAddress, type ShippingAddress } from "@/lib/shipping";
import { findShalomAgency } from "@/lib/shalom";
import type { OrderCustomer, OrderPaymentItem, OrderPaymentSummary } from "@/types/order";
import type { Product } from "@/types/product";

export function shortOrderNumber(orderId: string): string {
  return orderId.replace(/-/g, "").slice(0, 8).toUpperCase();
}

export function customerFirstName(customer: OrderCustomer | null | undefined): string {
  return customer?.fullName?.trim().split(/\s+/)[0] ?? "";
}

export function formatPhoneDisplay(value: string | null | undefined): string {
  const digits = (value ?? "").replace(/\D/g, "");
  const local = digits.startsWith("51") && digits.length >= 11 ? digits.slice(2) : digits;

  if (local.length === 9) {
    return `${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
  }

  return value?.trim() ?? "";
}

export function shippingMethodLabel(shipping: ShippingAddress | null): string {
  if (!shipping) {
    return "Envío";
  }

  if (shipping.carrier === "Pickup") {
    return "Recojo en local";
  }

  if (shipping.carrier === "Local") {
    return "Delivery en Trujillo";
  }

  if (shipping.carrier === "Shalom" || /shalom/i.test(shipping.line)) {
    return "Recojo en Shalom";
  }

  return "Envío";
}

export function shippingAddressLines(
  shipping: ShippingAddress,
  customer?: OrderCustomer | null,
): string[] {
  return [
    customer?.fullName ? `Destinatario: ${customer.fullName}` : null,
    shipping.line,
    shipping.district,
    [shipping.city, shipping.department].filter(Boolean).join(", "),
    "Perú",
  ]
    .map((line) => line?.trim())
    .filter((line): line is string => Boolean(line));
}

export function billingAddressLines(
  billing: BillingAddress,
  customer?: OrderCustomer | null,
): string[] {
  return [
    customer?.fullName,
    billing.dni ? `DNI ${billing.dni}` : null,
    billing.line,
    billing.district,
    [billing.city, billing.department].filter(Boolean).join(", "),
    "Perú",
    formatPhoneDisplay(customer?.phone),
  ]
    .map((line) => line?.trim())
    .filter((line): line is string => Boolean(line));
}

export function shippingMapQuery(shipping: ShippingAddress): string {
  const agency = shipping.agencyId ? findShalomAgency(shipping.agencyId) : undefined;

  return [
    agency ? `${agency.address}, ${agency.district}` : shipping.line,
    shipping.district,
    shipping.city,
    shipping.department,
    "Perú",
  ]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(", ");
}

export function shippingMapEmbedUrl(shipping: ShippingAddress): string {
  if (shipping.carrier === "Pickup") {
    return storePickupMapEmbedUrl();
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(shippingMapQuery(shipping))}&hl=es&z=16&output=embed`;
}

export function isOrderAwaitingPayment(status: string): boolean {
  return status === "pending";
}

export function orderDetailHref(orderId: string, status: string): string {
  if (isOrderAwaitingPayment(status)) {
    return `/pedido/${orderId}/pagar`;
  }

  return `/pedido/confirmado?id=${encodeURIComponent(orderId)}`;
}

export function accountOrdersHref(email?: string | null): string {
  const trimmed = email?.trim();

  if (!trimmed) {
    return "/cuenta";
  }

  return `/cuenta?email=${encodeURIComponent(trimmed)}`;
}

export function orderItemCount(items: OrderPaymentItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function orderSubtotal(order: OrderPaymentSummary): number {
  const fromItems = order.items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );

  if (fromItems > 0) {
    return fromItems;
  }

  return Math.max(0, order.total - order.shippingAmount);
}

export function enrichOrderItems(
  items: OrderPaymentItem[],
  products: Product[],
): OrderPaymentItem[] {
  return items.map((item) => {
    const product =
      products.find((entry) => entry.id === item.productId) ??
      products.find((entry) => entry.name === item.name);

    const sizeLabel =
      item.sizeLabel ||
      product?.sizes.find((size) => size.price === item.unitPrice)?.label ||
      product?.sizes[0]?.label;

    return {
      ...item,
      productId: item.productId ?? product?.id,
      sizeLabel,
      image: item.image || product?.images[0],
      slug: item.slug ?? product?.slug,
    };
  });
}
