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

function categorySlug(value) {
  if (!value) {
    return "";
  }

  if (Array.isArray(value)) {
    return value[0]?.slug ?? "";
  }

  return value.slug ?? "";
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
  .from("products")
  .select("name, occasions, categories(slug)")
  .eq("published", true);

if (error) {
  console.error("Supabase rechazó la lectura del catálogo:", error.message);
  process.exit(1);
}

if (!data?.length) {
  console.error("No hay productos publicados.");
  process.exit(1);
}

const byCategory = {};
const byOccasion = {};

for (const product of data) {
  const category = categorySlug(product.categories) || "(sin categoría)";
  byCategory[category] = (byCategory[category] ?? 0) + 1;

  for (const occasion of product.occasions ?? []) {
    byOccasion[occasion] = (byOccasion[occasion] ?? 0) + 1;
  }
}

const requiredCategories = ["designer", "niche", "arabian"];
const requiredOccasions = ["diario", "cita", "fiesta", "formal", "noche"];
const missing = [
  ...requiredCategories.filter((key) => !byCategory[key]),
  ...requiredOccasions.filter((key) => !byOccasion[key]),
];

if (missing.length) {
  console.error(`Faltan productos para: ${missing.join(", ")}`);
  process.exit(1);
}

console.log("OK — hay productos para Diseñador, Nicho y cada ocasión.");
console.log(
  `Estilo: diseñador=${byCategory.designer} · nicho=${byCategory.niche} · árabe=${byCategory.arabian}`,
);
console.log(
  `Ocasión: ${requiredOccasions.map((key) => `${key}=${byOccasion[key]}`).join(" · ")}`,
);
