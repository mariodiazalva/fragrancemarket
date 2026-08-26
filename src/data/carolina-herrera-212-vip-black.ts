import type { ProductSize } from "@/types";

export const CAROLINA_HERRERA_212_VIP_BLACK_IMAGE =
  "/images/products/product-212-vip-black.png";

export const carolinaHerrera212VipBlack = {
  name: "212 VIP Black",
  brand: "Carolina Herrera",
  description:
    "Una fragancia masculina, intensa y seductora, con un carácter elegante y nocturno. 212 VIP Black combina la frescura de la absenta con notas aromáticas y un fondo cálido de almizcle y vainilla, creando un aroma moderno, sofisticado y perfecto para destacar.",
  gender: "masculine" as const,
  category: "designer" as const,
  images: [CAROLINA_HERRERA_212_VIP_BLACK_IMAGE],
  notes: {
    top: ["Absenta", "Anís"],
    heart: ["Lavanda", "Hinojo"],
    base: ["Almizcle negro", "Vainilla"],
  },
  fragranceFamily: ["aromático", "ámbar", "frutal", "oriental"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Alta",
  longevity: "Alta",
  rating: 4.7,
};

export const carolinaHerrera212VipBlackPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 430, stock: 10 },
];

export const carolinaHerrera212VipBlackDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 35, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 50, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 70, stock: 11 },
];

export const carolinaHerrera212VipBlackSlugs = {
  perfume: "212-vip-black",
  decant: "212-vip-black-decant",
} as const;
