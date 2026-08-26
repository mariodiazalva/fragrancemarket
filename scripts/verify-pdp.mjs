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

const slug = process.argv[2] ?? "amber-veil";

const { data, error } = await supabase
  .from("products")
  .select(
    `
      name,
      slug,
      description,
      type,
      brands ( name ),
      product_variants ( label, volume_ml, price, stock ),
      product_images ( url ),
      product_notes ( stage, fragrance_notes ( name ) )
    `,
  )
  .eq("published", true)
  .eq("slug", slug)
  .maybeSingle();

if (error) {
  console.error("Supabase rechazó la ficha:", error.message);
  process.exit(1);
}

if (!data) {
  console.error(`No hay producto publicado con slug "${slug}".`);
  process.exit(1);
}

const brand = Array.isArray(data.brands) ? data.brands[0]?.name : data.brands?.name;
const notes = (data.product_notes ?? []).length;
const variants = data.product_variants?.length ?? 0;
const images = data.product_images?.length ?? 0;

if (!variants || !images) {
  console.error("La ficha está incompleta: faltan variantes o imágenes.");
  process.exit(1);
}

console.log(`OK — ficha ${data.slug} desde Supabase`);
console.log(`- ${data.name} (${brand ?? "sin marca"}) · ${data.type}`);
console.log(`- ${variants} variante(s) · ${images} imagen(es) · ${notes} nota(s)`);
console.log(`- ${data.description}`);
