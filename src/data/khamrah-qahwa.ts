import type { ProductSize } from "@/types";

export const KHAMRAH_QAHWA_IMAGE = "/images/products/product-khamrah-qahwa.png";

export const khamrahQahwa = {
  name: "Khamrah Qahwa",
  brand: "Lattafa",
  description:
    "Una fragancia cálida, dulce y envolvente que combina especias aromáticas con acordes gourmand de canela, praliné y café. Khamrah Qahwa ofrece un aroma intenso y adictivo, perfecto para quienes buscan una fragancia llamativa, sofisticada y especialmente atractiva durante la noche y en climas frescos.",
  gender: "unisex" as const,
  category: "arabian" as const,
  images: [KHAMRAH_QAHWA_IMAGE],
  notes: {
    top: ["Canela", "Cardamomo", "Jengibre"],
    heart: ["Praliné", "Frutas confitadas", "Flores blancas"],
    base: ["Café", "Vainilla", "Haba tonka", "Almizcle", "Ámbar"],
  },
  fragranceFamily: ["ámbar", "especiado", "gourmand", "oriental"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Alta",
  longevity: "Muy alta",
  rating: 4.8,
};

export const khamrahQahwaPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 165, stock: 9 },
];

export const khamrahQahwaDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 15, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 18, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 22, stock: 11 },
];

export const khamrahQahwaSlugs = {
  perfume: "khamrah-qahwa",
  decant: "khamrah-qahwa-decant",
} as const;
