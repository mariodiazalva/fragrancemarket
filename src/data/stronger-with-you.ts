import type { ProductSize } from "@/types";

export const STRONGER_WITH_YOU_IMAGE =
  "/images/products/product-stronger-with-you.png";

export const strongerWithYouIntensely = {
  name: "Stronger With You Intensely",
  brand: "Emporio Armani",
  description:
    "Una fragancia intensa, cálida y adictiva que combina acordes dulces y especiados con una base profunda y envolvente. Stronger With You Intensely destaca por su carácter seductor y masculino, siendo especialmente atractivo para noches, citas y ocasiones especiales.",
  gender: "masculine" as const,
  category: "designer" as const,
  images: [STRONGER_WITH_YOU_IMAGE],
  notes: {
    top: ["Pimienta rosa", "Enebro", "Violeta"],
    heart: ["Toffee", "Canela", "Salvia"],
    base: ["Vainilla", "Ámbar", "Haba tonka", "Ante"],
  },
  fragranceFamily: ["ámbar", "aromático", "especiado", "oriental"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Alta",
  longevity: "Muy alta",
  rating: 4.8,
};

export const strongerWithYouPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 360, stock: 8 },
];

export const strongerWithYouDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 30, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 38, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 55, stock: 11 },
];

export const strongerWithYouSlugs = {
  perfume: "stronger-with-you-intensely",
  decant: "stronger-with-you-intensely-decant",
} as const;
