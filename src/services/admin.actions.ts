"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { safeAdminPath, type AdminPath } from "@/lib/admin";
import {
  removeAdminCustomerById,
  removeAdminOrderById,
  updateAdminOrderStatus,
  updateAdminStock,
} from "@/services/admin.service";

function adminActionErrorCode(error: unknown): string {
  const message = error instanceof Error ? error.message : "";

  if (/not_admin|not_authenticated/i.test(message)) {
    return "admin";
  }

  if (/stock/i.test(message)) {
    return "stock";
  }

  if (/no encontramos/i.test(message)) {
    return "missing";
  }

  if (/no está permitido|inválido/i.test(message)) {
    return "transition";
  }

  if (/aún no está activa/i.test(message)) {
    return "setup";
  }

  return "update";
}

function redirectAdmin(path: AdminPath, query: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/pedidos");
  revalidatePath("/admin/clientes");
  revalidatePath("/admin/inventario");
  redirect(`${path}?${query}`);
}

export async function setAdminOrderStatusAction(formData: FormData) {
  const orderId = String(formData.get("orderId") ?? "");
  const status = String(formData.get("status") ?? "");
  const next = safeAdminPath(String(formData.get("next") ?? "/admin/pedidos"));

  try {
    await updateAdminOrderStatus(orderId, status);
  } catch (error) {
    redirectAdmin(next, `error=${adminActionErrorCode(error)}`);
  }

  redirectAdmin(next, "ok=1");
}

export async function setAdminStockAction(formData: FormData) {
  const productId = String(formData.get("productId") ?? "");
  const variantId = String(formData.get("variantId") ?? "").trim();
  const stock = Math.round(Number(formData.get("stock")));
  const next = safeAdminPath(String(formData.get("next") ?? "/admin/inventario"));

  if (!Number.isFinite(stock) || stock < 0) {
    redirectAdmin(next, "error=transition");
  }

  try {
    await updateAdminStock(productId, variantId || null, stock);
  } catch (error) {
    redirectAdmin(next, `error=${adminActionErrorCode(error)}`);
  }

  redirectAdmin(next, "ok=1");
}

export async function deleteAdminOrderAction(formData: FormData) {
  const orderId = String(formData.get("orderId") ?? "");
  const next = safeAdminPath(String(formData.get("next") ?? "/admin/pedidos"));

  try {
    await removeAdminOrderById(orderId);
  } catch (error) {
    redirectAdmin(next, `error=${adminActionErrorCode(error)}`);
  }

  redirectAdmin(next, "ok=deleted");
}

export async function deleteAdminCustomerAction(formData: FormData) {
  const customerId = String(formData.get("customerId") ?? "");
  const next = safeAdminPath(String(formData.get("next") ?? "/admin/clientes"));

  try {
    await removeAdminCustomerById(customerId);
  } catch (error) {
    redirectAdmin(next, `error=${adminActionErrorCode(error)}`);
  }

  redirectAdmin(next, "ok=deleted");
}
