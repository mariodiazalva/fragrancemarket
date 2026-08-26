"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { updateAdminOrderStatus } from "@/services/admin-order.service";

function adminStatusErrorCode(error: unknown): string {
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

export async function setAdminOrderStatusAction(formData: FormData) {
  const orderId = String(formData.get("orderId") ?? "");
  const status = String(formData.get("status") ?? "");

  try {
    await updateAdminOrderStatus(orderId, status);
  } catch (error) {
    redirect(`/admin/pedidos?error=${adminStatusErrorCode(error)}`);
  }

  revalidatePath("/admin/pedidos");
  redirect("/admin/pedidos?ok=1");
}
