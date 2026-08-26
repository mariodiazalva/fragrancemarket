import type { ProductSize } from "@/types";

export const XERJOFF_ERBA_PURA_IMAGE =
  "/images/products/product-erba-pura.png";

export const xerjoffErbaPura = {
  name: "Erba Pura",
  brand: "Xerjoff",
  description:
    "Una fragancia vibrante, lujosa y envolvente que combina un explosivo acorde frutal con cítricos frescos y una base cálida y almizclada. Erba Pura destaca por su gran presencia y estela, ofreciendo un aroma moderno, sensual y sofisticado que funciona tanto para hombres como para mujeres.",
  gender: "unisex" as const,
  category: "niche" as const,
  images: [XERJOFF_ERBA_PURA_IMAGE],
  notes: {
    top: ["Naranja de Sicilia", "Bergamota de Calabria", "Limón de Sicilia"],
    heart: ["Frutas mediterráneas"],
    base: ["Almizcle blanco", "Ámbar", "Vainilla de Madagascar"],
  },
  fragranceFamily: ["cítrico", "frutal", "ámbar", "almizclado", "amaderado"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Muy alta",
  longevity: "Muy alta",
  rating: 4.8,
};

export const xerjoffErbaPuraPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 960, stock: 5 },
];

export const xerjoffErbaPuraDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 45, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 76, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 142, stock: 11 },
];

export const xerjoffErbaPuraSlugs = {
  perfume: "erba-pura",
  decant: "erba-pura-decant",
} as const;
