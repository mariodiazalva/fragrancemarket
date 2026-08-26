import type { ProductSize } from "@/types";

export const FRENCH_AVENUE_LIQUID_BRUN_IMAGE =
  "/images/products/product-liquid-brun.png";

export const frenchAvenueLiquidBrun = {
  name: "Liquid Brun",
  brand: "French Avenue",
  description:
    "Una fragancia cálida, dulce y sofisticada, con un perfil gourmand y especiado que transmite elegancia y sensualidad. Liquid Brun destaca por su combinación de vainilla cremosa, canela y acordes amaderados, creando un aroma envolvente y adictivo, ideal para noches y climas frescos.",
  gender: "masculine" as const,
  category: "arabian" as const,
  images: [FRENCH_AVENUE_LIQUID_BRUN_IMAGE],
  notes: {
    top: ["Canela", "Cardamomo", "Nuez moscada"],
    heart: ["Acordes amaderados", "Praliné"],
    base: ["Vainilla", "Ámbar", "Almizcle"],
  },
  fragranceFamily: ["ámbar", "gourmand", "especiado", "amaderado"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Alta",
  longevity: "Muy alta",
  rating: 4.7,
};

export const frenchAvenueLiquidBrunPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 250, stock: 10 },
];

export const frenchAvenueLiquidBrunDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 22, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 32, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 38, stock: 11 },
];

export const frenchAvenueLiquidBrunSlugs = {
  perfume: "liquid-brun",
  decant: "liquid-brun-decant",
} as const;
