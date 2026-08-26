import type { ProductSize } from "@/types";

export const LE_MALE_ELIXIR_IMAGE =
  "/images/products/product-le-male-elixir.png";

export const leMaleElixir = {
  name: "Le Male Elixir",
  brand: "Jean Paul Gaultier",
  description:
    "Una fragancia intensa, cálida y seductora que lleva el ADN de Le Male a un nivel más profundo y opulento. Le Male Elixir combina miel, tabaco y vainilla con un fondo amaderado, creando un aroma dulce, masculino y envolvente, perfecto para destacar durante la noche.",
  gender: "masculine" as const,
  category: "designer" as const,
  images: [LE_MALE_ELIXIR_IMAGE],
  notes: {
    top: ["Lavanda", "Menta"],
    heart: ["Benjuí", "Vainilla", "Miel"],
    base: ["Tabaco", "Haba tonka", "Opopónaco"],
  },
  fragranceFamily: ["ámbar", "gourmand", "aromático", "amaderado"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 10,
  projection: "Muy alta",
  longevity: "Muy alta",
  rating: 4.8,
};

export const leMaleElixirPerfumeSizes: ProductSize[] = [
  { label: "125 ml", volumeMl: 125, price: 541, stock: 10 },
];

export const leMaleElixirDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 23, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 34, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 56, stock: 11 },
];

export const leMaleElixirSlugs = {
  perfume: "le-male-elixir",
  decant: "le-male-elixir-decant",
} as const;
