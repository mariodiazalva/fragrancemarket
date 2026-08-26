"use server";

import { redirect } from "next/navigation";

import { isStoreAdmin } from "@/data-access/admin-orders";
import { requestMagicLink, signInWithPassword, signOutSession } from "@/data-access/auth";
import { isAdminPath, safeAdminPath } from "@/lib/admin";
import { SITE_URL } from "@/lib/constants";

function authSendErrorCode(
  error: unknown,
): "invalid" | "wait" | "quota" | "smtp" | "send" {
  if (error instanceof Error && /correo no es válido/i.test(error.message)) {
    return "invalid";
  }

  const message = error instanceof Error ? error.message : "";
  const code =
    error && typeof error === "object" && "code" in error && typeof error.code === "string"
      ? error.code
      : "";
  const status =
    error && typeof error === "object" && "status" in error && typeof error.status === "number"
      ? error.status
      : 0;

  if (
    /email_address_invalid/i.test(code) ||
    /email address .+ is invalid/i.test(message)
  ) {
    return "invalid";
  }

  if (
    /email_address_not_authorized/i.test(code) ||
    /only be sent to members in your supabase organization/i.test(message)
  ) {
    return "smtp";
  }

  if (
    /over_email_send_rate_limit/i.test(code) ||
    /email rate limit exceeded/i.test(message)
  ) {
    return "quota";
  }

  if (
    status === 429 ||
    /after \d+ seconds/i.test(message) ||
    /rate limit/i.test(message) ||
    /too many requests/i.test(message)
  ) {
    return "wait";
  }

  return "send";
}

function safeAuthNext(value: string): string {
  return isAdminPath(value) ? value : "/cuenta";
}

export async function requestMagicLinkAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const next = safeAuthNext(String(formData.get("next") ?? ""));
  const origin = new URL(SITE_URL).origin;
  const redirectTo = isAdminPath(next)
    ? `${origin}/auth/callback?next=${encodeURIComponent(next)}`
    : `${origin}/auth/callback`;

  try {
    await requestMagicLink(email, redirectTo);
  } catch (error) {
    redirect(`${next}?error=${authSendErrorCode(error)}`);
  }

  redirect(`${next}?sent=1`);
}

export async function signInAdminAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = safeAdminPath(String(formData.get("next") ?? "/admin"));

  try {
    await signInWithPassword(email, password);
  } catch {
    redirect(`${next}?error=credentials`);
  }

  if (!(await isStoreAdmin())) {
    await signOutSession();
    redirect(`${next}?error=admin`);
  }

  redirect(next);
}

export async function signOutAction() {
  await signOutSession();
  redirect("/cuenta");
}

export async function signOutAdminAction() {
  await signOutSession();
  redirect("/admin");
}
