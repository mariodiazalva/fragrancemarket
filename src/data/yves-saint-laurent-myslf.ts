import type { ProductSize } from "@/types";

export const YVES_SAINT_LAURENT_MYSLF_IMAGE =
  "/images/products/product-myslf.png";

export const yvesSaintLaurentMyslf = {
  name: "MYSLF",
  brand: "Yves Saint Laurent",
  description:
    "Una fragancia masculina moderna, elegante y versátil que combina la frescura de los cítricos con un corazón floral y un fondo cálido y amaderado. MYSLF transmite una sensación limpia, sofisticada y contemporánea, ideal para quienes buscan un aroma refinado que funcione en prácticamente cualquier ocasión.",
  gender: "masculine" as const,
  category: "designer" as const,
  images: [YVES_SAINT_LAURENT_MYSLF_IMAGE],
  notes: {
    top: ["Bergamota de Calabria"],
    heart: ["Flor de azahar", "Absoluto de flor de azahar"],
    base: ["Pachulí", "Ambrofix", "Maderas"],
  },
  fragranceFamily: ["floral", "amaderado", "cítrico", "aromático", "fresco"],
  occasions: ["diario", "cita", "fiesta", "formal", "noche"],
  intensity: 4 as const,
  intensityScore: 7,
  projection: "Media-alta",
  longevity: "Alta",
  rating: 4.7,
};

export const yvesSaintLaurentMyslfPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 660, stock: 10 },
];

export const yvesSaintLaurentMyslfDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 28, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 45, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 79, stock: 11 },
];

export const yvesSaintLaurentMyslfSlugs = {
  perfume: "myslf",
  decant: "myslf-decant",
} as const;
