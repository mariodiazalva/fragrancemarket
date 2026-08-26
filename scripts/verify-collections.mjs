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

const expected = ["frescos", "seductores", "intensos", "elegantes"];

const { data, error } = await supabase
  .from("collections")
  .select("name, slug, collection_products(product_id)")
  .eq("published", true)
  .in("slug", expected);

if (error) {
  console.error("Supabase rechazó la lectura de colecciones:", error.message);
  process.exit(1);
}

if (!data?.length) {
  console.error(
    "No hay colecciones. Ejecuta supabase/seed-collections.sql en el SQL Editor.",
  );
  process.exit(1);
}

const bySlug = new Map(data.map((row) => [row.slug, row]));
const missing = expected.filter((slug) => !bySlug.has(slug));

if (missing.length) {
  console.error(`Faltan colecciones: ${missing.join(", ")}`);
  process.exit(1);
}

const empty = expected.filter((slug) => {
  const row = bySlug.get(slug);
  return !row?.collection_products?.length;
});

if (empty.length) {
  console.error(`Colecciones sin productos: ${empty.join(", ")}`);
  process.exit(1);
}

console.log("OK — las 4 colecciones de perfil están publicadas.");

for (const slug of expected) {
  const row = bySlug.get(slug);
  console.log(
    `- ${row.name} · ${slug} · ${row.collection_products.length} piezas`,
  );
}
