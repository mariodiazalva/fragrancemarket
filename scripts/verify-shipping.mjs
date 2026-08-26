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

const { error } = await supabase.rpc("place_order", {
  p_email: "prueba@elova.pe",
  p_full_name: "Prueba",
  p_phone: "",
  p_notes: "",
  p_items: [
    {
      product_id: "00000000-0000-4000-8000-000000000001",
      size_label: "100 ml",
      quantity: 1,
    },
  ],
  p_shipping: {},
});

if (!error) {
  console.error("place_order aceptó un envío vacío.");
  process.exit(1);
}

if (/Could not find the function/i.test(error.message)) {
  console.error(
    "Falta la función con dirección. Ejecuta supabase/migrations/20260818190000_order_shipping.sql.",
  );
  process.exit(1);
}

if (!/invalid_shipping/i.test(error.message)) {
  console.error(`Se esperaba invalid_shipping. Recibido: ${error.message}`);
  process.exit(1);
}

console.log("OK — place_order pide una dirección de envío.");
console.log("Un envío vacío no crea el pedido.");
