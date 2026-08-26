import type { ProductSize } from "@/types";

export const XERJOFF_NAXOS_IMAGE = "/images/products/product-naxos.png";

export const xerjoffNaxos = {
  name: "Naxos",
  brand: "Xerjoff",
  description:
    "Una fragancia lujosa, cálida y sofisticada que combina cítricos frescos con lavanda, miel y tabaco. Naxos destaca por su carácter dulce, elegante y envolvente, con una excelente presencia y un fondo cálido de vainilla y haba tonka. Una opción refinada y memorable, perfecta para destacar en ocasiones especiales.",
  gender: "unisex" as const,
  category: "niche" as const,
  images: [XERJOFF_NAXOS_IMAGE],
  notes: {
    top: ["Limón", "Bergamota", "Lavanda"],
    heart: ["Miel", "Canela", "Jazmín", "Cashmeran"],
    base: ["Tabaco", "Vainilla", "Haba tonka", "Almizcle"],
  },
  fragranceFamily: ["aromático", "ámbar", "cítrico", "floral", "gourmand"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Alta",
  longevity: "Muy alta",
  rating: 4.8,
};

export const xerjoffNaxosPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 970, stock: 10 },
];

export const xerjoffNaxosDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 35, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 63, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 115, stock: 11 },
];

export const xerjoffNaxosSlugs = {
  perfume: "naxos",
  decant: "naxos-decant",
} as const;
