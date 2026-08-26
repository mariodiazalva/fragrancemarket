import type { Product, ProductSize } from "@/types";

export const VALENTINO_BORN_IN_ROMA_IMAGE =
  "/images/products/product-born-in-roma-v2.png";

export const valentinoBornInRoma = {
  name: "Born in Roma Uomo Intense",
  brand: "Valentino",
  description:
    "Una fragancia intensa, elegante y seductora que combina la calidez de la vainilla con acordes aromáticos y amaderados. Born in Roma Uomo Intense proyecta una personalidad sofisticada y moderna, ideal para destacar especialmente durante la noche y en ocasiones especiales.",
  gender: "masculine" as const,
  category: "designer" as const,
  images: [VALENTINO_BORN_IN_ROMA_IMAGE],
  notes: {
    top: ["Vainilla"],
    heart: ["Lavandín"],
    base: ["Vetiver"],
  },
  fragranceFamily: ["ámbar", "aromático", "amaderado", "oriental"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Alta",
  longevity: "Alta",
  rating: 4.9,
};

export const valentinoBornInRomaPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 480, stock: 6 },
];

export const valentinoBornInRomaDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 30, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 45, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 73, stock: 11 },
];

export const valentinoBornInRomaSlugs = {
  perfume: "born-in-roma-uomo-intense",
  decant: "born-in-roma-uomo-intense-decant",
} as const;
