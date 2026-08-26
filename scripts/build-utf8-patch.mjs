import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function sqlText(value) {
  return `convert_from(decode('${Buffer.from(value, "utf8").toString("base64")}', 'base64'), 'UTF8')`;
}

function sqlTextArray(values) {
  return `ARRAY[${values.map(sqlText).join(", ")}]::text[]`;
}

const products = [
  {
    ids: [
      "c0000000-0000-4000-8000-000000000001",
      "c0000000-0000-4000-8000-000000000009",
    ],
    name: "Stronger With You Intensely",
    description:
      "Una fragancia intensa, cálida y adictiva que combina acordes dulces y especiados con una base profunda y envolvente. Stronger With You Intensely destaca por su carácter seductor y masculino, siendo especialmente atractivo para noches, citas y ocasiones especiales.",
    family: ["ámbar", "aromático", "especiado", "oriental"],
    alts: [
      ["c0000000-0000-4000-8000-000000000001", "Stronger With You Intensely"],
      ["c0000000-0000-4000-8000-000000000009", "Stronger With You Intensely decant"],
    ],
  },
  {
    ids: [
      "c0000000-0000-4000-8000-000000000002",
      "c0000000-0000-4000-8000-000000000011",
    ],
    name: "Odyssey Aqua",
    description:
      "Una fragancia fresca, cítrica y aromática con un carácter limpio y masculino. Odyssey Aqua combina notas refrescantes con un fondo amaderado que la convierte en una opción versátil, ideal para el día a día, días calurosos y ocasiones donde buscas transmitir frescura y elegancia.",
    family: ["cítrico", "aromático", "fresco", "amaderado"],
    alts: [
      ["c0000000-0000-4000-8000-000000000002", "Odyssey Aqua"],
      ["c0000000-0000-4000-8000-000000000011", "Odyssey Aqua decant"],
    ],
  },
  {
    ids: [
      "c0000000-0000-4000-8000-000000000003",
      "c0000000-0000-4000-8000-000000000012",
    ],
    name: "Born in Roma Uomo Intense",
    description:
      "Una fragancia intensa, elegante y seductora que combina la calidez de la vainilla con acordes aromáticos y amaderados. Born in Roma Uomo Intense proyecta una personalidad sofisticada y moderna, ideal para destacar especialmente durante la noche y en ocasiones especiales.",
    family: ["ámbar", "aromático", "amaderado", "oriental"],
    alts: [
      ["c0000000-0000-4000-8000-000000000003", "Born in Roma Uomo Intense"],
      ["c0000000-0000-4000-8000-000000000012", "Born in Roma Uomo Intense decant"],
    ],
  },
  {
    ids: [
      "c0000000-0000-4000-8000-000000000004",
      "c0000000-0000-4000-8000-000000000013",
    ],
    name: "Acqua di Giò Profondo",
    description:
      "Una fragancia fresca, elegante y profundamente marina que captura la sensación del océano y la naturaleza. Acqua di Giò Profondo combina cítricos y notas marinas con un corazón aromático y un fondo amaderado, creando un aroma limpio, masculino y sofisticado, ideal para el día a día y los días cálidos.",
    family: ["aromático", "cítrico", "fresco", "amaderado"],
    alts: [
      ["c0000000-0000-4000-8000-000000000004", "Acqua di Giò Profondo"],
      ["c0000000-0000-4000-8000-000000000013", "Acqua di Giò Profondo decant"],
    ],
  },
  {
    ids: [
      "c0000000-0000-4000-8000-000000000005",
      "c0000000-0000-4000-8000-000000000014",
    ],
    name: "9 PM Night Out",
    description:
      "Una fragancia masculina, intensa y sofisticada, diseñada para destacar durante la noche. 9 PM Night Out combina acordes especiados y aromáticos con un fondo cálido y amaderado, creando una esencia elegante, seductora y moderna, perfecta para citas, fiestas y ocasiones especiales.",
    family: ["ámbar", "aromático", "especiado", "amaderado"],
    alts: [
      ["c0000000-0000-4000-8000-000000000005", "9 PM Night Out"],
      ["c0000000-0000-4000-8000-000000000014", "9 PM Night Out decant"],
    ],
  },
  {
    ids: [
      "c0000000-0000-4000-8000-000000000006",
      "c0000000-0000-4000-8000-000000000015",
    ],
    name: "Khamrah Qahwa",
    description:
      "Una fragancia cálida, dulce y envolvente que combina especias aromáticas con acordes gourmand de canela, praliné y café. Khamrah Qahwa ofrece un aroma intenso y adictivo, perfecto para quienes buscan una fragancia llamativa, sofisticada y especialmente atractiva durante la noche y en climas frescos.",
    family: ["ámbar", "especiado", "gourmand", "oriental"],
    alts: [
      ["c0000000-0000-4000-8000-000000000006", "Khamrah Qahwa"],
      ["c0000000-0000-4000-8000-000000000015", "Khamrah Qahwa decant"],
    ],
  },
  {
    ids: [
      "c0000000-0000-4000-8000-000000000007",
      "c0000000-0000-4000-8000-000000000022",
    ],
    name: "Le Male",
    description:
      "Un clásico masculino, sensual y elegante que combina la frescura de la menta con la suavidad de la lavanda y la calidez de la vainilla. Le Male ofrece un aroma distintivo, limpio y seductor, ideal tanto para el día a día como para ocasiones especiales.",
    family: ["aromático", "ámbar", "especiado", "floral"],
    alts: [
      ["c0000000-0000-4000-8000-000000000007", "Le Male"],
      ["c0000000-0000-4000-8000-000000000022", "Le Male decant"],
    ],
  },
  {
    ids: [
      "c0000000-0000-4000-8000-000000000008",
      "c0000000-0000-4000-8000-000000000016",
    ],
    name: "Yara",
    description:
      "Una fragancia femenina, dulce y cremosa, con un carácter delicado y envolvente. Lattafa Yara combina frutas suaves, flores blancas y acordes de vainilla y almizcle, creando un aroma elegante, juvenil y muy fácil de llevar.",
    family: ["floral", "gourmand", "ámbar", "oriental"],
    alts: [
      ["c0000000-0000-4000-8000-000000000008", "Yara"],
      ["c0000000-0000-4000-8000-000000000016", "Yara decant"],
    ],
  },
  {
    ids: [
      "c0000000-0000-4000-8000-000000000010",
      "c0000000-0000-4000-8000-000000000017",
    ],
    name: "Erba Pura",
    description:
      "Una fragancia vibrante, lujosa y envolvente que combina un explosivo acorde frutal con cítricos frescos y una base cálida y almizclada. Erba Pura destaca por su gran presencia y estela, ofreciendo un aroma moderno, sensual y sofisticado que funciona tanto para hombres como para mujeres.",
    family: ["cítrico", "frutal", "ámbar", "almizclado", "amaderado"],
    alts: [
      ["c0000000-0000-4000-8000-000000000010", "Erba Pura"],
      ["c0000000-0000-4000-8000-000000000017", "Erba Pura decant"],
    ],
  },
];

const notes = [
  ["pachuli", "Pachulí"],
  ["lavandin", "Lavandín"],
  ["praline", "Praliné"],
  ["cafe", "Café"],
  ["ambar-mineral", "Ámbar mineral"],
  ["madera-de-pachuli", "Madera de pachulí"],
  ["acordes-aromaticos", "Acordes aromáticos"],
  ["orquidea", "Orquídea"],
  ["limon-de-sicilia", "Limón de Sicilia"],
  ["frutas-mediterraneas", "Frutas mediterráneas"],
  ["ambar", "Ámbar"],
];

const lines = [
  "-- Fix UTF-8 names/descriptions after a Windows encoding paste.",
  "-- Encoding-proof: strings are base64, not raw accents.",
  "-- SQL Editor -> New query -> paste -> Run.",
  "",
];

for (const product of products) {
  const idList = product.ids.map((id) => `'${id}'`).join(", ");
  lines.push(`update public.products`);
  lines.push(`set`);
  lines.push(`  name = ${sqlText(product.name)},`);
  lines.push(`  description = ${sqlText(product.description)},`);
  lines.push(`  fragrance_family = ${sqlTextArray(product.family)}`);
  lines.push(`where id in (${idList});`);
  lines.push("");
  for (const [productId, alt] of product.alts) {
    lines.push(`update public.product_images`);
    lines.push(`set alt = ${sqlText(alt)}`);
    lines.push(`where product_id = '${productId}';`);
    lines.push("");
  }
}

for (const [slug, name] of notes) {
  lines.push(`update public.fragrance_notes`);
  lines.push(`set name = ${sqlText(name)}`);
  lines.push(`where slug = '${slug}';`);
  lines.push("");
}

writeFileSync(join(root, "supabase", "patch-fix-utf8.sql"), lines.join("\n"), "utf8");
console.log("Wrote supabase/patch-fix-utf8.sql");
