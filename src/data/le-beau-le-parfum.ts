import type { ProductSize } from "@/types";

export const LE_BEAU_LE_PARFUM_IMAGE =
  "/images/products/product-le-beau-le-parfum.png";

export const leBeauLeParfum = {
  name: "Le Beau Le Parfum",
  brand: "Jean Paul Gaultier",
  description:
    "Una fragancia masculina intensa, dulce y seductora, con un carácter tropical y envolvente. Le Beau Le Parfum combina coco, piña y haba tonka con un fondo cálido y amaderado, creando un aroma sensual, sofisticado y de gran presencia.",
  gender: "masculine" as const,
  category: "designer" as const,
  images: [LE_BEAU_LE_PARFUM_IMAGE],
  notes: {
    top: ["Piña", "Coco", "Jengibre"],
    heart: ["Coco", "Iris"],
    base: ["Haba tonka", "Sándalo", "Ámbar"],
  },
  fragranceFamily: ["ámbar", "amaderado", "gourmand", "oriental"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Alta",
  longevity: "Muy alta",
  rating: 4.8,
};

export const leBeauLeParfumPerfumeSizes: ProductSize[] = [
  { label: "125 ml", volumeMl: 125, price: 560, stock: 10 },
];

export const leBeauLeParfumDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 24, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 35, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 58, stock: 11 },
];

export const leBeauLeParfumSlugs = {
  perfume: "le-beau-le-parfum",
  decant: "le-beau-le-parfum-decant",
} as const;
