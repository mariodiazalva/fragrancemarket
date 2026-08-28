import type { ProductSize } from "@/types";

export const AZZARO_THE_MOST_WANTED_IMAGE =
  "/images/products/product-the-most-wanted.png";

export const azzaroTheMostWanted = {
  name: "The Most Wanted",
  brand: "Azzaro",
  description:
    "Una fragancia masculina intensa, dulce y seductora, con un carácter moderno y sofisticado. The Most Wanted combina un acorde especiado y cálido con un corazón dulce y un fondo amaderado, creando un aroma envolvente y llamativo, perfecto para destacar durante la noche y en ocasiones especiales.",
  gender: "masculine" as const,
  category: "designer" as const,
  images: [AZZARO_THE_MOST_WANTED_IMAGE],
  notes: {
    top: ["Cardamomo"],
    heart: ["Toffee", "Acordes ambarados"],
    base: ["Ámbar", "Maderas"],
  },
  fragranceFamily: ["ámbar", "gourmand", "especiado", "amaderado"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Alta",
  longevity: "Muy alta",
  rating: 4.7,
};

export const azzaroTheMostWantedPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 393, stock: 10 },
];

export const azzaroTheMostWantedDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 22, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 30, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 49, stock: 11 },
];

export const azzaroTheMostWantedSlugs = {
  perfume: "the-most-wanted",
  decant: "the-most-wanted-decant",
} as const;
