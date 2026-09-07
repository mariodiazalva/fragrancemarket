import type { ProductSize } from "@/types";

export const LATTAFA_YARA_MOI_IMAGE = "/images/products/product-yara-moi.png";

export const lattafaYaraMoi = {
  name: "Yara Moi",
  brand: "Lattafa",
  description:
    "Una fragancia femenina dulce, cremosa y elegante, con un carácter suave y envolvente. Yara Moi combina frutas, flores blancas y acordes gourmand sobre una base cálida de vainilla, almizcle y sándalo, creando un aroma femenino, sofisticado y fácil de llevar.",
  gender: "feminine" as const,
  category: "arabian" as const,
  images: [LATTAFA_YARA_MOI_IMAGE],
  notes: {
    top: ["Melocotón", "Jazmín"],
    heart: ["Caramelo", "Ámbar"],
    base: ["Sándalo", "Pachulí", "Vainilla", "Almizcle"],
  },
  fragranceFamily: ["floral", "ámbar", "gourmand", "almizclado"],
  occasions: ["diario", "cita", "fiesta", "formal", "noche"],
  intensity: 4 as const,
  intensityScore: 7,
  projection: "Media",
  longevity: "Alta",
  rating: 4.6,
};

export const lattafaYaraMoiPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 143, stock: 10 },
];

export const lattafaYaraMoiDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 15, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 17, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 22, stock: 11 },
];

export const lattafaYaraMoiSlugs = {
  perfume: "yara-moi",
  decant: "yara-moi-decant",
} as const;
