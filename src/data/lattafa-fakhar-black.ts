import type { ProductSize } from "@/types";

export const LATTAFA_FAKHAR_BLACK_IMAGE =
  "/images/products/product-fakhar-black.png";

export const lattafaFakharBlack = {
  name: "Fakhar Black",
  brand: "Lattafa",
  description:
    "Una fragancia masculina fresca, aromática y elegante, con un perfil limpio y sofisticado. Fakhar Black combina notas verdes y especiadas con un corazón floral y una base amaderada, creando un aroma versátil y moderno, perfecto tanto para el día a día como para ocasiones especiales.",
  gender: "masculine" as const,
  category: "arabian" as const,
  images: [LATTAFA_FAKHAR_BLACK_IMAGE],
  notes: {
    top: ["Manzana", "Jengibre", "Bergamota"],
    heart: ["Lavanda", "Salvia", "Bayas de enebro", "Geranio"],
    base: ["Cedro", "Haba tonka", "Ámbar", "Vetiver"],
  },
  fragranceFamily: ["aromático", "amaderado", "fresco", "verde"],
  occasions: ["diario", "cita", "fiesta", "formal", "noche"],
  intensity: 4 as const,
  intensityScore: 7,
  projection: "Media-alta",
  longevity: "Alta",
  rating: 4.6,
};

export const lattafaFakharBlackPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 143, stock: 10 },
];

export const lattafaFakharBlackDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 15, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 17, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 22, stock: 11 },
];

export const lattafaFakharBlackSlugs = {
  perfume: "fakhar-black",
  decant: "fakhar-black-decant",
} as const;
