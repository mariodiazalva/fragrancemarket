import type { ProductSize } from "@/types";

export const LE_MALE_IMAGE = "/images/products/product-le-male.png";

export const leMale = {
  name: "Le Male",
  brand: "Jean Paul Gaultier",
  description:
    "Un clásico masculino, sensual y elegante que combina la frescura de la menta con la suavidad de la lavanda y la calidez de la vainilla. Le Male ofrece un aroma distintivo, limpio y seductor, ideal tanto para el día a día como para ocasiones especiales.",
  gender: "masculine" as const,
  category: "designer" as const,
  images: [LE_MALE_IMAGE],
  notes: {
    top: ["Menta", "Lavanda", "Bergamota", "Cardamomo"],
    heart: ["Canela", "Flor de azahar", "Comino"],
    base: ["Vainilla", "Haba tonka", "Sándalo", "Cedro", "Ámbar"],
  },
  fragranceFamily: ["aromático", "ámbar", "especiado", "floral"],
  occasions: ["diario", "cita", "fiesta", "formal", "noche"],
  intensity: 4 as const,
  intensityScore: 8,
  projection: "Alta",
  longevity: "Alta",
  rating: 4.7,
};

export const leMalePerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 480, stock: 11 },
];

export const leMaleDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 36, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 52.5, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 72, stock: 11 },
];

export const leMaleSlugs = {
  perfume: "le-male",
  decant: "le-male-decant",
} as const;
