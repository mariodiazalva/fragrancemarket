import "server-only";

import { parseBillingAddress, parseShippingAddress } from "@/lib/shipping";
import { createSupabaseSessionClient } from "@/lib/supabase/session";
import type {
  AdminCustomer,
  AdminDashboard,
  AdminDashboardOrder,
  AdminInventoryItem,
} from "@/types/admin";
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
    billing: parseBillingAddress(row.billing),
    customer: mapCustomer(row.customer),
    items: mapItems(row.items),
  };
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  return value as Record<string, unknown>;
}

function mapDashboardOrder(value: unknown): AdminDashboardOrder | null {
  const row = asRecord(value);

  if (!row) {
    return null;
  }

  const id = typeof row.id === "string" ? row.id : "";
  const status = typeof row.status === "string" ? row.status : "";
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
    currency: typeof row.currency === "string" ? row.currency : "PEN",
    createdAt,
    itemCount: Math.max(0, Math.round(asNumber(row.itemCount))),
    customer: mapCustomer(row.customer),
  };
}

function mapDashboard(value: unknown): AdminDashboard {
  const row = asRecord(value);
  const counts = asRecord(row?.counts);
  const totals = asRecord(row?.totals);

  return {
    counts: {
      orders: Math.round(asNumber(counts?.orders)),
      customers: Math.round(asNumber(counts?.customers)),
      pending: Math.round(asNumber(counts?.pending)),
      paid: Math.round(asNumber(counts?.paid)),
      processing: Math.round(asNumber(counts?.processing)),
      shipped: Math.round(asNumber(counts?.shipped)),
      delivered: Math.round(asNumber(counts?.delivered)),
      cancelled: Math.round(asNumber(counts?.cancelled)),
      toShip: Math.round(asNumber(counts?.toShip)),
      lowStock: Math.round(asNumber(counts?.lowStock)),
    },
    totals: {
      pending: asNumber(totals?.pending),
      revenue: asNumber(totals?.revenue),
    },
    recentOrders: Array.isArray(row?.recentOrders)
      ? row.recentOrders.flatMap((item) => {
          const mapped = mapDashboardOrder(item);
          return mapped ? [mapped] : [];
        })
      : [],
  };
}

function mapCustomerRow(value: unknown): AdminCustomer | null {
  const row = asRecord(value);

  if (!row) {
    return null;
  }

  const id = typeof row.id === "string" ? row.id : "";
  const email = typeof row.email === "string" ? row.email : "";

  if (!UUID_PATTERN.test(id) || !email) {
    return null;
  }

  return {
    id,
    email,
    fullName: typeof row.fullName === "string" ? row.fullName : "",
    phone: typeof row.phone === "string" ? row.phone : "",
    createdAt: typeof row.createdAt === "string" ? row.createdAt : "",
    orderCount: Math.max(0, Math.round(asNumber(row.orderCount))),
    totalSpent: asNumber(row.totalSpent),
    lastOrderAt: typeof row.lastOrderAt === "string" ? row.lastOrderAt : "",
    lastStatus: typeof row.lastStatus === "string" ? row.lastStatus : "",
  };
}

function mapInventoryItem(value: unknown): AdminInventoryItem | null {
  const row = asRecord(value);

  if (!row) {
    return null;
  }

  const productId = typeof row.productId === "string" ? row.productId : "";
  const name = typeof row.name === "string" ? row.name : "";

  if (!UUID_PATTERN.test(productId) || !name) {
    return null;
  }

  const variantId = typeof row.variantId === "string" ? row.variantId : "";

  return {
    productId,
    variantId: UUID_PATTERN.test(variantId) ? variantId : null,
    name,
    slug: typeof row.slug === "string" ? row.slug : "",
    brand: typeof row.brand === "string" ? row.brand : "",
    type: typeof row.type === "string" ? row.type : "",
    label: typeof row.label === "string" ? row.label : "",
    price: asNumber(row.price),
    stock: Math.max(0, Math.round(asNumber(row.stock))),
    published: row.published !== false,
  };
}

function mapAdminError(message: string): Error {
  if (/Could not find the function/i.test(message)) {
    return new Error(
      "La gestión de la tienda aún no está activa. Ejecuta supabase/migrations/20260826150000_admin_intranet.sql.",
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

  if (/order_not_found|variant_not_found|product_not_found|customer_not_found/i.test(message)) {
    return new Error("No encontramos ese pedido.");
  }

  if (/invalid_transition|invalid_stock|variant_required/i.test(message)) {
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

export async function getAdminDashboard(): Promise<AdminDashboard> {
  const supabase = await createSupabaseSessionClient();
  const { data, error } = await supabase.rpc("get_admin_dashboard");

  if (error) {
    throw mapAdminError(error.message);
  }

  return mapDashboard(data);
}

export async function listAdminCustomers(): Promise<AdminCustomer[]> {
  const supabase = await createSupabaseSessionClient();
  const { data, error } = await supabase.rpc("list_admin_customers");

  if (error) {
    throw mapAdminError(error.message);
  }

  if (!Array.isArray(data)) {
    return [];
  }

  return data.flatMap((item) => {
    const mapped = mapCustomerRow(item);
    return mapped ? [mapped] : [];
  });
}

export async function listAdminInventory(): Promise<AdminInventoryItem[]> {
  const supabase = await createSupabaseSessionClient();
  const { data, error } = await supabase.rpc("list_admin_inventory");

  if (error) {
    throw mapAdminError(error.message);
  }

  if (!Array.isArray(data)) {
    return [];
  }

  return data.flatMap((item) => {
    const mapped = mapInventoryItem(item);
    return mapped ? [mapped] : [];
  });
}

export async function setAdminStock(
  productId: string,
  variantId: string | null,
  stock: number,
): Promise<void> {
  if (!UUID_PATTERN.test(productId) || !Number.isInteger(stock) || stock < 0) {
    throw new Error("Pedido o estado inválido.");
  }

  if (variantId && !UUID_PATTERN.test(variantId)) {
    throw new Error("Pedido o estado inválido.");
  }

  const supabase = await createSupabaseSessionClient();
  const { error } = await supabase.rpc("admin_set_stock", {
    p_product_id: productId,
    p_variant_id: variantId,
    p_stock: stock,
  });

  if (error) {
    throw mapAdminError(error.message);
  }
}

export async function deleteAdminOrder(orderId: string): Promise<void> {
  if (!UUID_PATTERN.test(orderId)) {
    throw new Error("Pedido o estado inválido.");
  }

  const supabase = await createSupabaseSessionClient();
  const { error } = await supabase.rpc("admin_delete_order", {
    p_order_id: orderId,
  });

  if (error) {
    throw mapAdminError(error.message);
  }
}

export async function deleteAdminCustomer(customerId: string): Promise<void> {
  if (!UUID_PATTERN.test(customerId)) {
    throw new Error("Pedido o estado inválido.");
  }

  const supabase = await createSupabaseSessionClient();
  const { error } = await supabase.rpc("admin_delete_customer", {
    p_customer_id: customerId,
  });

  if (error) {
    throw mapAdminError(error.message);
  }
}
