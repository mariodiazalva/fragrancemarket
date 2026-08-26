import type { ProductSize } from "@/types";

export const AL_HARAMAIN_AMBER_OUD_GOLD_IMAGE =
  "/images/products/product-amber-oud-gold.png";

export const alHaramainAmberOudGold = {
  name: "Amber Oud Gold Edition",
  brand: "Al Haramain",
  description:
    "Una fragancia lujosa, dulce y vibrante con un marcado carácter frutal. Amber Oud Gold Edition combina frutas exóticas y cítricos con una base cálida de vainilla, ámbar y almizcle, creando un aroma elegante, llamativo y de gran presencia. Su perfil unisex la hace versátil para cualquier ocasión.",
  gender: "unisex" as const,
  category: "arabian" as const,
  images: [AL_HARAMAIN_AMBER_OUD_GOLD_IMAGE],
  notes: {
    top: ["Bergamota", "Acordes verdes"],
    heart: ["Melón", "Piña", "Ámbar", "Vainilla"],
    base: ["Almizcle", "Maderas", "Vainilla"],
  },
  fragranceFamily: ["frutal", "cítrico", "ámbar", "almizclado", "amaderado"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Alta",
  longevity: "Muy alta",
  rating: 4.7,
};

export const alHaramainAmberOudGoldPerfumeSizes: ProductSize[] = [
  { label: "120 ml", volumeMl: 120, price: 260, stock: 10 },
];

export const alHaramainAmberOudGoldDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 25, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 35, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 45, stock: 11 },
];

export const alHaramainAmberOudGoldSlugs = {
  perfume: "amber-oud-gold-edition",
  decant: "amber-oud-gold-edition-decant",
} as const;
