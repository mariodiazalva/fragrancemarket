import "server-only";

import { findShalomAgency } from "@/lib/shalom";
import { STORE_PICKUP, parseBillingAddress, parseShippingAddress } from "@/lib/shipping";
import { quoteShippingAmount } from "@/lib/shipping-quote";
import { isTrujilloCity, quoteTrujilloDelivery } from "@/lib/trujillo-delivery";
import { getSignedInEmail } from "@/data-access/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  OrderCustomer,
  OrderListItem,
  OrderPaymentItem,
  OrderPaymentSummary,
  PlaceOrderInput,
  PlaceOrderResult,
} from "@/types/order";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  const email = input.email.trim().toLowerCase();
  const fullName = input.fullName.trim();
  const phoneDigits = (input.phone ?? "").replace(/\D/g, "");
  const dni = (input.dni ?? "").replace(/\D/g, "");
  const extraNotes = input.notes?.trim() ?? "";
  let shipping = parseShippingAddress(input.shipping);
  const billing = parseBillingAddress({ ...input.billing, dni });

  if (!isEmail(email)) {
    throw new Error("El correo no es válido.");
  }

  if (!fullName) {
    throw new Error("Escribe tus nombres y apellidos.");
  }

  if (dni.length < 8 || dni.length > 9) {
    throw new Error("El DNI debe tener 8 dígitos.");
  }

  if (phoneDigits.length < 9) {
    throw new Error("Escribe tu número de teléfono.");
  }

  if (!shipping?.carrier) {
    throw new Error("Elige un método de envío.");
  }

  if (shipping.carrier === "Shalom") {
    if (!shipping.agencyId || !findShalomAgency(shipping.agencyId)) {
      throw new Error("Elige una agencia Shalom para el envío.");
    }
  } else if (shipping.carrier === "Pickup") {
    shipping = {
      line: STORE_PICKUP.line,
      district: STORE_PICKUP.district,
      city: STORE_PICKUP.city,
      department: STORE_PICKUP.department,
      carrier: "Pickup",
    };
  } else if (shipping.carrier === "Local") {
    if (shipping.department !== "La Libertad" || !isTrujilloCity(shipping.city)) {
      throw new Error("El delivery local solo está disponible en Trujillo.");
    }

    if (!quoteTrujilloDelivery(shipping.district ?? "", shipping.line)) {
      throw new Error("Elige un distrito de Trujillo para el delivery.");
    }
  } else {
    throw new Error("Elige un método de envío.");
  }

  quoteShippingAmount(shipping);

  if (!billing) {
    throw new Error("Completa la dirección de facturación.");
  }

  if (!input.items.length) {
    throw new Error("El carrito está vacío.");
  }

  if (input.items.length > 20) {
    throw new Error("Hay demasiadas líneas en el pedido.");
  }

  for (const item of input.items) {
    if (!UUID_PATTERN.test(item.productId)) {
      throw new Error(
        "Hay un producto antiguo en el carrito. Vacía el carrito y vuelve a agregar las piezas.",
      );
    }

    if (!item.sizeLabel.trim() || item.quantity < 1 || item.quantity > 12) {
      throw new Error("Revisa las cantidades del carrito.");
    }
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.rpc("place_order", {
    p_email: email,
    p_full_name: fullName,
    p_phone: phoneDigits,
    p_notes: extraNotes,
    p_items: input.items.map((item) => ({
      product_id: item.productId,
      size_label: item.sizeLabel,
      quantity: item.quantity,
    })),
    p_shipping: shipping,
    p_billing: billing,
  });

  if (error) {
    if (/Could not find the function/i.test(error.message)) {
      throw new Error(
        "El checkout aún no está activo. Ejecuta supabase/migrations/20260826010000_order_billing.sql.",
      );
    }

    if (/invalid_shipping/i.test(error.message)) {
      throw new Error("Completa la dirección de envío.");
    }

    if (/invalid_billing/i.test(error.message)) {
      throw new Error("Completa la dirección de facturación.");
    }

    throw new Error("No se pudo registrar el pedido. Inténtalo de nuevo.");
  }

  if (typeof data !== "string" || !data) {
    throw new Error("No se pudo registrar el pedido. Inténtalo de nuevo.");
  }

  return { orderId: data };
}

function asNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return 0;
}

function mapPaymentError(message: string): Error {
  if (/Could not find the function/i.test(message)) {
    return new Error(
      "El pago aún no está activo. Ejecuta supabase/migrations/20260818180000_order_payment.sql.",
    );
  }

  if (/insufficient_stock/i.test(message)) {
    return new Error("No hay stock suficiente para confirmar este pedido.");
  }

  if (/order_not_found/i.test(message)) {
    return new Error("No encontramos ese pedido.");
  }

  if (/invalid_status/i.test(message)) {
    return new Error("Este pedido ya no se puede pagar.");
  }

  return new Error("No se pudo confirmar el pago. Inténtalo de nuevo.");
}

function mapCustomer(value: unknown): OrderCustomer | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const row = value as Record<string, unknown>;
  const email = typeof row.email === "string" ? row.email : "";
  const fullName = typeof row.fullName === "string" ? row.fullName : "";
  const phone = typeof row.phone === "string" ? row.phone : "";

  if (!email && !fullName) {
    return null;
  }

  return { email, fullName, phone };
}

function mapPaymentItem(value: unknown): OrderPaymentItem | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const line = value as Record<string, unknown>;
  const name = typeof line.name === "string" ? line.name : "";

  if (!name) {
    return null;
  }

  const productId =
    typeof line.productId === "string"
      ? line.productId
      : typeof line.product_id === "string"
        ? line.product_id
        : undefined;
  const sizeLabel =
    typeof line.sizeLabel === "string"
      ? line.sizeLabel
      : typeof line.size_label === "string"
        ? line.size_label
        : undefined;
  const image = typeof line.image === "string" ? line.image : undefined;

  return {
    name,
    quantity: Math.max(1, Math.round(asNumber(line.quantity))),
    unitPrice: asNumber(line.unitPrice ?? line.unit_price),
    ...(productId && UUID_PATTERN.test(productId) ? { productId } : {}),
    ...(sizeLabel?.trim() ? { sizeLabel: sizeLabel.trim() } : {}),
    ...(image?.trim() ? { image: image.trim() } : {}),
  };
}

function mapOrderSummary(value: unknown): OrderPaymentSummary | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const row = value as Record<string, unknown>;
  const id = typeof row.id === "string" ? row.id : "";
  const status = typeof row.status === "string" ? row.status : "";
  const currency = typeof row.currency === "string" ? row.currency : "PEN";
  const items = Array.isArray(row.items)
    ? row.items.flatMap((item) => {
        const mapped = mapPaymentItem(item);
        return mapped ? [mapped] : [];
      })
    : [];

  if (!UUID_PATTERN.test(id) || !status) {
    return null;
  }

  return {
    id,
    status,
    total: asNumber(row.total),
    currency,
    shippingAmount: asNumber(row.shippingAmount ?? row.shipping_amount),
    shipping: parseShippingAddress(row.shipping),
    billing: parseBillingAddress(row.billing),
    customer: mapCustomer(row.customer),
    items,
  };
}

export async function getOrderForPayment(
  orderId: string,
): Promise<OrderPaymentSummary | null> {
  if (!UUID_PATTERN.test(orderId)) {
    return null;
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_order_for_payment", {
    p_order_id: orderId,
  });

  if (error) {
    throw mapPaymentError(error.message);
  }

  return mapOrderSummary(data);
}

export async function confirmOrderPayment(
  orderId: string,
): Promise<OrderPaymentSummary> {
  if (!UUID_PATTERN.test(orderId)) {
    throw new Error("No encontramos ese pedido.");
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.rpc("confirm_order_payment", {
    p_order_id: orderId,
  });

  if (error) {
    throw mapPaymentError(error.message);
  }

  const summary = mapOrderSummary(data);

  if (!summary) {
    throw new Error("No se pudo confirmar el pago. Inténtalo de nuevo.");
  }

  return summary;
}

function mapOrderListItem(value: unknown): OrderListItem | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const row = value as Record<string, unknown>;
  const id = typeof row.id === "string" ? row.id : "";
  const status = typeof row.status === "string" ? row.status : "";
  const currency = typeof row.currency === "string" ? row.currency : "PEN";
  const createdAt =
    typeof row.createdAt === "string"
      ? row.createdAt
      : typeof row.created_at === "string"
        ? row.created_at
        : "";

  if (!UUID_PATTERN.test(id) || !status) {
    return null;
  }

  return {
    id,
    status,
    total: asNumber(row.total),
    currency,
    createdAt,
  };
}

function mapOrderList(data: unknown): OrderListItem[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.flatMap((item) => {
    const mapped = mapOrderListItem(item);
    return mapped ? [mapped] : [];
  });
}

export async function listOrdersByEmail(email: string): Promise<OrderListItem[]> {
  const trimmed = email.trim().toLowerCase();

  if (!isEmail(trimmed)) {
    throw new Error("El correo no es válido.");
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.rpc("list_orders_by_email", {
    p_email: trimmed,
  });

  if (error) {
    if (/Could not find the function/i.test(error.message)) {
      throw new Error(
        "La consulta por correo aún no está activa. Ejecuta supabase/migrations/20260826120000_list_orders_by_email.sql.",
      );
    }

    if (/invalid_email/i.test(error.message)) {
      throw new Error("El correo no es válido.");
    }

    throw new Error("No se pudieron leer tus pedidos.");
  }

  return mapOrderList(data);
}

export async function listMyOrders(): Promise<OrderListItem[]> {
  const email = await getSignedInEmail();

  if (!email) {
    return [];
  }

  return listOrdersByEmail(email);
}
