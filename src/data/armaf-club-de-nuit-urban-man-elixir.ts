import type { ProductSize } from "@/types";

export const ARMAF_CLUB_DE_NUIT_URBAN_MAN_ELIXIR_IMAGE =
  "/images/products/product-club-de-nuit-urban-man-elixir.png";

export const armafClubDeNuitUrbanManElixir = {
  name: "Club de Nuit Urban Man Elixir",
  brand: "Armaf",
  description:
    "Una fragancia masculina intensa, elegante y moderna, con una combinación de frescura cítrica, especias aromáticas y un fondo cálido y amaderado. Club de Nuit Urban Man Elixir destaca por su gran presencia y versatilidad, siendo una excelente opción para citas, noches, eventos y ocasiones especiales.",
  gender: "masculine" as const,
  category: "arabian" as const,
  images: [ARMAF_CLUB_DE_NUIT_URBAN_MAN_ELIXIR_IMAGE],
  notes: {
    top: ["Bergamota", "Pimienta rosa", "Cardamomo", "Azafrán"],
    heart: ["Lavanda", "Jazmín", "Vetiver", "Geranio"],
    base: ["Ambroxan", "Ámbar", "Pachulí", "Cedro", "Ládano"],
  },
  fragranceFamily: ["aromático", "amaderado", "especiado", "ámbar", "cítrico"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Muy alta",
  longevity: "Muy alta",
  rating: 4.7,
};

export const armafClubDeNuitUrbanManElixirPerfumeSizes: ProductSize[] = [
  { label: "105 ml", volumeMl: 105, price: 173, stock: 10 },
];

export const armafClubDeNuitUrbanManElixirDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 15, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 19, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 25, stock: 11 },
];

export const armafClubDeNuitUrbanManElixirSlugs = {
  perfume: "club-de-nuit-urban-man-elixir",
  decant: "club-de-nuit-urban-man-elixir-decant",
} as const;
