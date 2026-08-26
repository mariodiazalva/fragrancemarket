import type { ProductSize } from "@/types";

export const PARFUMS_DE_MARLY_LAYTON_IMAGE =
  "/images/products/product-layton.png";

export const parfumsDeMarlyLayton = {
  name: "Layton",
  brand: "Parfums de Marly",
  description:
    "Una fragancia elegante, sofisticada y seductora que combina frescas notas frutales con especias, flores y un fondo cálido y amaderado. Layton destaca por su versatilidad y su carácter refinado, ofreciendo una excelente presencia tanto de día como de noche.",
  gender: "unisex" as const,
  category: "niche" as const,
  images: [PARFUMS_DE_MARLY_LAYTON_IMAGE],
  notes: {
    top: ["Manzana", "Bergamota", "Lavanda"],
    heart: ["Jazmín", "Violeta", "Geranio"],
    base: ["Vainilla", "Pimienta", "Maderas", "Pachulí", "Guayaco"],
  },
  fragranceFamily: ["ámbar", "floral", "frutal", "especiado", "amaderado"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Alta",
  longevity: "Muy alta",
  rating: 4.8,
};

export const parfumsDeMarlyLaytonPerfumeSizes: ProductSize[] = [
  { label: "125 ml", volumeMl: 125, price: 990, stock: 10 },
];

export const parfumsDeMarlyLaytonDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 55, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 87, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 120, stock: 11 },
];

export const parfumsDeMarlyLaytonSlugs = {
  perfume: "layton",
  decant: "layton-decant",
} as const;
