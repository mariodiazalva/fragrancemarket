import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadLocalEnv() {
  const file = resolve(process.cwd(), ".env.local");

  if (!existsSync(file)) {
    return;
  }

  for (const rawLine of readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separator = line.indexOf("=");

    if (separator === -1) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function firstValue(...values) {
  return values.find((value) => typeof value === "string" && value.trim());
}

function isPlaceholder(value) {
  return /your[-_ ]?(anon|project)|YOUR_PROJECT/i.test(value);
}

loadLocalEnv();

const url = firstValue(process.env.SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_URL);
const anonKey = firstValue(
  process.env.SUPABASE_ANON_KEY,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

if (!url || !anonKey || isPlaceholder(url) || isPlaceholder(anonKey)) {
  console.error("Faltan SUPABASE_URL y SUPABASE_ANON_KEY.");
  process.exit(1);
}

const supabase = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const missingId = "00000000-0000-4000-8000-000000000000";

const { data, error } = await supabase.rpc("get_order_for_payment", {
  p_order_id: missingId,
});

if (error) {
  if (/Could not find the function/i.test(error.message)) {
    console.error(
      "Faltan las funciones. Ejecuta supabase/migrations/20260818180000_order_payment.sql.",
    );
    process.exit(1);
  }

  console.error(error.message);
  process.exit(1);
}

if (data !== null) {
  console.error("get_order_for_payment debió devolver null para un pedido inexistente.");
  process.exit(1);
}

const { error: payError } = await supabase.rpc("confirm_order_payment", {
  p_order_id: missingId,
});

if (!payError) {
  console.error("confirm_order_payment respondió sin error con un pedido inexistente.");
  process.exit(1);
}

if (/Could not find the function/i.test(payError.message)) {
  console.error(
    "Falta confirm_order_payment. Ejecuta supabase/migrations/20260818180000_order_payment.sql.",
  );
  process.exit(1);
}

if (!/order_not_found/i.test(payError.message)) {
  console.error(`Se esperaba order_not_found. Recibido: ${payError.message}`);
  process.exit(1);
}

console.log("OK — get_order_for_payment y confirm_order_payment están activas.");
console.log("Un pedido inexistente no se puede pagar.");
