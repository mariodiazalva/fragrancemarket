import type { ProductSize } from "@/types";

export const LATTAFA_YARA_IMAGE = "/images/products/product-yara.png";

export const lattafaYara = {
  name: "Yara",
  brand: "Lattafa",
  description:
    "Una fragancia femenina, dulce y cremosa, con un carácter delicado y envolvente. Lattafa Yara combina frutas suaves, flores blancas y acordes de vainilla y almizcle, creando un aroma elegante, juvenil y muy fácil de llevar.",
  gender: "feminine" as const,
  category: "arabian" as const,
  images: [LATTAFA_YARA_IMAGE],
  notes: {
    top: ["Orquídea", "Heliotropo", "Mandarina"],
    heart: ["Acorde tropical", "Frutas"],
    base: ["Vainilla", "Almizcle", "Sándalo"],
  },
  fragranceFamily: ["floral", "gourmand", "ámbar", "oriental"],
  occasions: ["diario", "cita", "fiesta", "noche"],
  intensity: 4 as const,
  intensityScore: 7,
  projection: "Media",
  longevity: "Alta",
  rating: 4.7,
};

export const lattafaYaraPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 165, stock: 7 },
];

export const lattafaYaraDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 22, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 30, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 45, stock: 11 },
];

export const lattafaYaraSlugs = {
  perfume: "yara",
  decant: "yara-decant",
} as const;
