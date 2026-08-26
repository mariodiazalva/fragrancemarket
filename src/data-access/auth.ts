import "server-only";

import { createSupabaseSessionClient } from "@/lib/supabase/session";

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function getSignedInEmail(): Promise<string | null> {
  const supabase = await createSupabaseSessionClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user?.email) {
    return null;
  }

  return data.user.email.toLowerCase();
}

export async function requestMagicLink(email: string, redirectTo: string): Promise<void> {
  const trimmed = email.trim().toLowerCase();

  if (!isEmail(trimmed)) {
    throw new Error("El correo no es válido.");
  }

  const supabase = await createSupabaseSessionClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: trimmed,
    options: {
      emailRedirectTo: redirectTo,
      shouldCreateUser: true,
    },
  });

  if (!error) {
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.warn("[elova] No se pudo enviar el enlace de acceso:", error.message);
  }

  throw error;
}

export async function signOutSession(): Promise<void> {
  const supabase = await createSupabaseSessionClient();
  await supabase.auth.signOut();
}

export async function exchangeAuthCode(code: string): Promise<boolean> {
  const supabase = await createSupabaseSessionClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  return !error;
}
