import type { ProductSize } from "@/types";

export const VALENTINO_BORN_IN_ROMA_CORAL_FANTASY_IMAGE =
  "/images/products/product-born-in-roma-coral-fantasy.png";

export const valentinoBornInRomaCoralFantasy = {
  name: "Born in Roma Coral Fantasy",
  brand: "Valentino",
  description:
    "Una fragancia masculina moderna, fresca y vibrante que combina un carácter afrutado con notas aromáticas y un fondo amaderado. Born in Roma Coral Fantasy tiene un perfil juvenil y sofisticado, ideal para quienes buscan un aroma versátil, llamativo y fácil de llevar durante el día o la noche.",
  gender: "masculine" as const,
  category: "designer" as const,
  images: [VALENTINO_BORN_IN_ROMA_CORAL_FANTASY_IMAGE],
  notes: {
    top: ["Bergamota", "Cardamomo", "Acordes rojos"],
    heart: ["Lavanda", "Geranio", "Salvia"],
    base: ["Vetiver", "Pachulí", "Tabaco"],
  },
  fragranceFamily: ["frutal", "aromático", "amaderado", "floral"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 4 as const,
  intensityScore: 8,
  projection: "Alta",
  longevity: "Alta",
  rating: 4.7,
};

export const valentinoBornInRomaCoralFantasyPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 550, stock: 10 },
];

export const valentinoBornInRomaCoralFantasyDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 25, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 35, stock: 18 },
];

export const valentinoBornInRomaCoralFantasySlugs = {
  perfume: "born-in-roma-coral-fantasy",
  decant: "born-in-roma-coral-fantasy-decant",
} as const;
