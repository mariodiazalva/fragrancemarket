import type { ProductSize } from "@/types";

export const LATTAFA_KHAMRAH_IMAGE = "/images/products/product-khamrah.png";

export const lattafaKhamrah = {
  name: "Khamrah",
  brand: "Lattafa",
  description:
    "Una fragancia dulce, cálida y envolvente con un marcado carácter gourmand. Khamrah combina especias aromáticas con canela, dátiles y praliné, creando un aroma seductor y adictivo que destaca especialmente durante la noche y en climas frescos.",
  gender: "unisex" as const,
  category: "arabian" as const,
  images: [LATTAFA_KHAMRAH_IMAGE],
  notes: {
    top: ["Canela", "Nuez moscada", "Bergamota"],
    heart: ["Dátiles", "Praliné", "Nardos", "Mahonial"],
    base: ["Vainilla", "Haba tonka", "Mirra", "Ámbar", "Benjuí", "Akigalawood"],
  },
  fragranceFamily: ["ámbar", "gourmand", "especiado", "oriental"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Alta",
  longevity: "Muy alta",
  rating: 4.8,
};

export const lattafaKhamrahPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 155, stock: 10 },
];

export const lattafaKhamrahDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 23, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 32, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 45, stock: 11 },
];

export const lattafaKhamrahSlugs = {
  perfume: "khamrah",
  decant: "khamrah-decant",
} as const;
