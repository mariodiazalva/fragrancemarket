import {
  isStoreAdmin,
  listAdminOrders,
  setAdminOrderStatus,
} from "@/data-access/admin-orders";
import type { AdminOrder } from "@/types/order";

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
