import {
  deleteAdminCustomer as removeAdminCustomer,
  deleteAdminOrder as removeAdminOrder,
  getAdminDashboard as readAdminDashboard,
  isStoreAdmin,
  listAdminCustomers as readAdminCustomers,
  listAdminInventory as readAdminInventory,
  listAdminOrders,
  setAdminOrderStatus,
  setAdminStock as writeAdminStock,
} from "@/data-access/admin-orders";
import { getSignedInEmail } from "@/data-access/auth";
import type { AdminAccess } from "@/lib/admin";
import type { AdminCustomer, AdminDashboard, AdminInventoryItem } from "@/types/admin";
import type { AdminOrder } from "@/types/order";

export type AdminPageAccess = {
  email: string | null;
  access: AdminAccess;
};

function accessFromError(error: unknown): AdminAccess {
  const message = error instanceof Error ? error.message : "";

  if (/aún no está activa/i.test(message)) {
    return "setup";
  }

  if (/not_authenticated/i.test(message)) {
    return "signed-out";
  }

  return "forbidden";
}

export async function getAdminPageAccess(): Promise<AdminPageAccess> {
  const email = await getSignedInEmail();

  if (!email) {
    return { email: null, access: "signed-out" };
  }

  const isAdmin = await isStoreAdmin();

  return {
    email,
    access: isAdmin ? "ok" : "forbidden",
  };
}

export async function getIsStoreAdmin(): Promise<boolean> {
  return isStoreAdmin();
}

export async function getAdminOrders(): Promise<AdminOrder[]> {
  return listAdminOrders();
}

export async function updateAdminOrderStatus(
  orderId: string,
  status: string,
): Promise<void> {
  return setAdminOrderStatus(orderId, status);
}

export async function getAdminDashboard(): Promise<AdminDashboard> {
  return readAdminDashboard();
}

export async function getAdminCustomers(): Promise<AdminCustomer[]> {
  return readAdminCustomers();
}

export async function getAdminInventory(): Promise<AdminInventoryItem[]> {
  return readAdminInventory();
}

export async function updateAdminStock(
  productId: string,
  variantId: string | null,
  stock: number,
): Promise<void> {
  return writeAdminStock(productId, variantId, stock);
}

export async function removeAdminOrderById(orderId: string): Promise<void> {
  return removeAdminOrder(orderId);
}

export async function removeAdminCustomerById(customerId: string): Promise<void> {
  return removeAdminCustomer(customerId);
}

export { accessFromError };
