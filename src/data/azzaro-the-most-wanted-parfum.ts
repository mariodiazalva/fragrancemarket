import type { ProductSize } from "@/types";

export const AZZARO_THE_MOST_WANTED_PARFUM_IMAGE =
  "/images/products/product-the-most-wanted-parfum.png";

export const azzaroTheMostWantedParfum = {
  name: "The Most Wanted Parfum",
  brand: "Azzaro",
  description:
    "Una fragancia masculina intensa, cálida y seductora, con un carácter dulce y sofisticado. The Most Wanted Parfum combina un acorde especiado con una dulce vainilla y un fondo amaderado, creando un aroma elegante, envolvente y de gran presencia. Perfecta para noches, citas y ocasiones especiales.",
  gender: "masculine" as const,
  category: "designer" as const,
  images: [AZZARO_THE_MOST_WANTED_PARFUM_IMAGE],
  notes: {
    top: ["Jengibre", "Acordes especiados"],
    heart: ["Acorde amaderado"],
    base: ["Bourbon vainilla", "Acordes balsámicos"],
  },
  fragranceFamily: ["ámbar", "gourmand", "especiado", "amaderado"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Alta",
  longevity: "Muy alta",
  rating: 4.7,
};

export const azzaroTheMostWantedParfumPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 415, stock: 10 },
];

export const azzaroTheMostWantedParfumDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 22, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 32, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 52, stock: 11 },
];

export const azzaroTheMostWantedParfumSlugs = {
  perfume: "the-most-wanted-parfum",
  decant: "the-most-wanted-parfum-decant",
} as const;
