import type { ProductSize } from "@/types";

export const LATTAFA_ISHQ_AL_SHUYUKH_SILVER_IMAGE =
  "/images/products/product-ishq-al-shuyukh-silver.png";

export const lattafaIshqAlShuyukhSilver = {
  name: "Ishq Al Shuyukh Silver",
  brand: "Lattafa",
  description:
    "Una fragancia masculina dulce, cálida y envolvente, con un perfil gourmand y moderno. Ishq Al Shuyukh Silver combina frutas frescas con acordes dulces y una base amaderada, creando un aroma elegante, juvenil y seductor, ideal para citas, salidas y ocasiones especiales.",
  gender: "masculine" as const,
  category: "arabian" as const,
  images: [LATTAFA_ISHQ_AL_SHUYUKH_SILVER_IMAGE],
  notes: {
    top: ["Bergamota", "Limón", "Piña"],
    heart: ["Manzana", "Canela", "Pimienta negra"],
    base: ["Vainilla", "Cedro", "Ámbar", "Almizcle"],
  },
  fragranceFamily: ["gourmand", "ámbar", "amaderado", "frutal", "aromático"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 4 as const,
  intensityScore: 8,
  projection: "Alta",
  longevity: "Alta",
  rating: 4.6,
};

export const lattafaIshqAlShuyukhSilverPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 145, stock: 10 },
];

export const lattafaIshqAlShuyukhSilverDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 15, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 18, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 23, stock: 11 },
];

export const lattafaIshqAlShuyukhSilverSlugs = {
  perfume: "ishq-al-shuyukh-silver",
  decant: "ishq-al-shuyukh-silver-decant",
} as const;
