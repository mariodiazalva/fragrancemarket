import type { ProductSize } from "@/types";

export const LATTAFA_THE_KINGDOM_IMAGE =
  "/images/products/product-the-kingdom.png";

export const lattafaTheKingdom = {
  name: "The Kingdom",
  brand: "Lattafa",
  description:
    "Una fragancia masculina dulce, cálida y sofisticada, con un carácter intenso y seductor. The Kingdom combina notas aromáticas con acordes gourmand y una base cálida de vainilla, creando un aroma moderno, envolvente y versátil, ideal para destacar especialmente durante la noche.",
  gender: "masculine" as const,
  category: "arabian" as const,
  images: [LATTAFA_THE_KINGDOM_IMAGE],
  notes: {
    top: ["Lavanda", "Menta", "Mandarina"],
    heart: ["Canela", "Tabaco", "Vainilla"],
    base: ["Haba tonka", "Ámbar", "Almizcle"],
  },
  fragranceFamily: ["ámbar", "gourmand", "aromático", "amaderado"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 4 as const,
  intensityScore: 8,
  projection: "Alta",
  longevity: "Alta",
  rating: 4.6,
};

export const lattafaTheKingdomPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 145, stock: 10 },
];

export const lattafaTheKingdomDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 15, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 18, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 23, stock: 11 },
];

export const lattafaTheKingdomSlugs = {
  perfume: "the-kingdom",
  decant: "the-kingdom-decant",
} as const;
