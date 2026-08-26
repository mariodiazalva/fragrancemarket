import type { ProductSize } from "@/types";

export const AFNAN_9_AM_DIVE_IMAGE = "/images/products/product-9-am-dive.png";

export const afnan9amDive = {
  name: "9 AM Dive",
  brand: "Afnan",
  description:
    "Una fragancia fresca, cítrica y moderna, ideal para quienes buscan un aroma limpio, energético y versátil. 9 AM Dive combina frutas refrescantes y notas acuáticas con un corazón aromático y un fondo amaderado, convirtiéndola en una excelente opción para el día a día y los días cálidos.",
  gender: "masculine" as const,
  category: "arabian" as const,
  images: [AFNAN_9_AM_DIVE_IMAGE],
  notes: {
    top: ["Limón", "Menta", "Grosella negra", "Pimienta rosa"],
    heart: ["Manzana", "Cedro", "Incienso"],
    base: ["Jengibre", "Sándalo", "Pachulí", "Jazmín"],
  },
  fragranceFamily: ["cítrico", "aromático", "fresco", "frutal", "amaderado"],
  occasions: ["diario", "cita", "fiesta", "formal"],
  intensity: 4 as const,
  intensityScore: 7,
  projection: "Media-alta",
  longevity: "Alta",
  rating: 4.6,
};

export const afnan9amDivePerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 150, stock: 10 },
];

export const afnan9amDiveDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 15, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 18, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 23, stock: 11 },
];

export const afnan9amDiveSlugs = {
  perfume: "9-am-dive",
  decant: "9-am-dive-decant",
} as const;
