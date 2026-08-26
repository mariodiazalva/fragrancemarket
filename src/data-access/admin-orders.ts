import "server-only";

import { parseShippingAddress } from "@/lib/shipping";
import { createSupabaseSessionClient } from "@/lib/supabase/session";
import type { AdminOrder, AdminOrderCustomer, OrderPaymentItem } from "@/types/order";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const ADMIN_STATUSES = new Set(["paid", "processing", "shipped", "delivered", "cancelled"]);

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

function mapCustomer(value: unknown): AdminOrderCustomer | null {
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

function mapItems(value: unknown): OrderPaymentItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const line = item as Record<string, unknown>;
    const name = typeof line.name === "string" ? line.name : "";

    if (!name) {
      return [];
    }

    return [
      {
        name,
        quantity: Math.max(1, Math.round(asNumber(line.quantity))),
        unitPrice: asNumber(line.unitPrice),
      },
    ];
  });
}

function mapAdminOrder(value: unknown): AdminOrder | null {
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
  const notes = typeof row.notes === "string" ? row.notes : "";

  if (!UUID_PATTERN.test(id) || !status) {
    return null;
  }

  return {
    id,
    status,
    total: asNumber(row.total),
    currency,
    createdAt,
    notes,
    shipping: parseShippingAddress(row.shipping),
    customer: mapCustomer(row.customer),
    items: mapItems(row.items),
  };
}

function mapAdminError(message: string): Error {
  if (/Could not find the function/i.test(message)) {
    return new Error(
      "La gestión de pedidos aún no está activa. Ejecuta supabase/migrations/20260820140000_admin_orders.sql.",
    );
  }

  if (/not_admin/i.test(message)) {
    return new Error("not_admin");
  }

  if (/not_authenticated/i.test(message)) {
    return new Error("not_authenticated");
  }

  if (/insufficient_stock/i.test(message)) {
    return new Error("No hay stock suficiente para marcar este pedido como pagado.");
  }

  if (/order_not_found/i.test(message)) {
    return new Error("No encontramos ese pedido.");
  }

  if (/invalid_transition/i.test(message)) {
    return new Error("Ese cambio de estado no está permitido.");
  }

  return new Error("No se pudo actualizar el pedido.");
}

export async function isStoreAdmin(): Promise<boolean> {
  const supabase = await createSupabaseSessionClient();
  const { data, error } = await supabase.rpc("is_store_admin");

  if (error) {
    if (/Could not find the function/i.test(error.message)) {
      return false;
    }

    return false;
  }

  return data === true;
}

export async function listAdminOrders(): Promise<AdminOrder[]> {
  const supabase = await createSupabaseSessionClient();
  const { data, error } = await supabase.rpc("list_admin_orders");

  if (error) {
    throw mapAdminError(error.message);
  }

  if (!Array.isArray(data)) {
    return [];
  }

  return data.flatMap((item) => {
    const mapped = mapAdminOrder(item);
    return mapped ? [mapped] : [];
  });
}

export async function setAdminOrderStatus(
  orderId: string,
  status: string,
): Promise<void> {
  if (!UUID_PATTERN.test(orderId) || !ADMIN_STATUSES.has(status)) {
    throw new Error("Pedido o estado inválido.");
  }

  const supabase = await createSupabaseSessionClient();
  const { error } = await supabase.rpc("admin_set_order_status", {
    p_order_id: orderId,
    p_status: status,
  });

  if (error) {
    throw mapAdminError(error.message);
  }
}
