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

if (process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
  console.error("No uses NEXT_PUBLIC_ con la service role key.");
  process.exit(1);
}

const supabase = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data, error } = await supabase
  .from("products")
  .select(
    `
      name,
      slug,
      featured,
      type,
      price,
      brands ( name ),
      product_variants ( label, volume_ml, stock ),
      product_images ( url )
    `,
  )
  .eq("published", true)
  .eq("featured", true)
  .order("sort_order", { ascending: true })
  .limit(8);

if (error) {
  console.error("Supabase rechazó la lectura de productos:", error.message);
  process.exit(1);
}

if (!data?.length) {
  console.error(
    "Conectado, pero no hay productos destacados. Ejecuta supabase/migrations y supabase/seed.sql.",
  );
  process.exit(1);
}

console.log(`OK — ${data.length} productos destacados desde Supabase:`);

for (const product of data) {
  const brand = Array.isArray(product.brands) ? product.brands[0]?.name : product.brands?.name;
  const variants = product.product_variants?.length ?? 0;
  console.log(`- ${product.name} (${brand ?? "sin marca"}) · ${product.slug} · ${variants} variante(s)`);
}
