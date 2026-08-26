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

const { data, error } = await supabase
  .from("sets")
  .select(
    `
      name,
      slug,
      price,
      set_products (
        size_label,
        individual_price,
        products ( name, slug )
      )
    `,
  )
  .eq("published", true)
  .order("created_at", { ascending: true });

if (error) {
  console.error("Supabase rechazó la lectura de sets:", error.message);
  process.exit(1);
}

if (!data?.length) {
  console.error("No hay sets. Ejecuta supabase/seed-sets.sql en el SQL Editor.");
  process.exit(1);
}

const incomplete = data.filter((set) => (set.set_products?.length ?? 0) < 1);

if (incomplete.length) {
  console.error("Hay sets sin productos. Revisa set_products.");
  process.exit(1);
}

console.log(`OK — ${data.length} sets desde Supabase:`);

for (const set of data) {
  const items = set.set_products ?? [];
  console.log(`- ${set.name} · ${set.slug} · ${items.length} perfume(s) · S/ ${set.price}`);
  for (const item of items) {
    const product = Array.isArray(item.products) ? item.products[0] : item.products;
    console.log(`    · ${product?.name ?? "?"} (${item.size_label})`);
  }
}
