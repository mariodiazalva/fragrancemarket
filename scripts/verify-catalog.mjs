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
  console.error(
    "Faltan SUPABASE_URL y SUPABASE_ANON_KEY. Copia .env.example a .env.local y pega las claves del proyecto.",
  );
  process.exit(1);
}

const supabase = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data, error } = await supabase
  .from("products")
  .select("name, slug, type, featured, price, product_variants(label, volume_ml, price)")
  .eq("published", true)
  .order("sort_order", { ascending: true });

if (error) {
  console.error("Supabase rechazó la lectura del catálogo:", error.message);
  process.exit(1);
}

if (!data?.length) {
  console.error("Conectado, pero no hay productos. Ejecuta seed.sql y seed-catalog.sql.");
  process.exit(1);
}

const counts = data.reduce((acc, product) => {
  acc[product.type] = (acc[product.type] ?? 0) + 1;
  return acc;
}, {});

console.log(`OK — ${data.length} productos publicados desde Supabase`);
console.log(
  `Tipos: perfume=${counts.perfume ?? 0} · decant=${counts.decant ?? 0} · set=${counts.set ?? 0}`,
);

const expected = [
  ["stronger-with-you-intensely", "Stronger With You Intensely", 360],
  ["odyssey-aqua", "Odyssey Aqua", 170],
  ["born-in-roma-uomo-intense", "Born in Roma Uomo Intense", 480],
  ["acqua-di-gio-profondo", "Acqua di Giò Profondo", 370],
  ["9-pm-night-out", "9 PM Night Out", 230],
  ["khamrah-qahwa", "Khamrah Qahwa", 165],
  ["le-male", "Le Male", 480],
  ["yara", "Yara", 165],
  ["erba-pura", "Erba Pura", 960],
  ["stronger-with-you-intensely-decant", "Stronger With You Intensely", 38],
  ["odyssey-aqua-decant", "Odyssey Aqua", 33],
  ["born-in-roma-uomo-intense-decant", "Born in Roma Uomo Intense", 45],
  ["acqua-di-gio-profondo-decant", "Acqua di Giò Profondo", 52],
  ["9-pm-night-out-decant", "9 PM Night Out", 25],
  ["khamrah-qahwa-decant", "Khamrah Qahwa", 32],
  ["yara-decant", "Yara", 30],
  ["erba-pura-decant", "Erba Pura", 76],
  ["le-male-decant", "Le Male", 52.5],
];

const bySlug = new Map(data.map((product) => [product.slug, product]));
const missing = [];

for (const [slug, name, price] of expected) {
  const product = bySlug.get(slug);
  if (!product) {
    missing.push(`${slug} (falta)`);
    continue;
  }
  if (product.name !== name || Number(product.price) !== price) {
    missing.push(
      `${slug} esperado ${name} S/${price}, en vivo ${product.name} S/${product.price}`,
    );
  }
}

for (const product of data) {
  const variants = [...(product.product_variants ?? [])]
    .sort((a, b) => a.volume_ml - b.volume_ml)
    .map((variant) => `${variant.label}=${variant.price}`)
    .join(" · ");
  console.log(
    `- [${product.type}] ${product.name} · ${product.slug} · S/${product.price}${variants ? ` · ${variants}` : ""}`,
  );
}

if (missing.length) {
  console.error("\nEl catálogo de Supabase no coincide con los precios nuevos:");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  console.error("\nEjecuta supabase/patch-fix-utf8.sql en el SQL Editor.");
  process.exitCode = 1;
}
