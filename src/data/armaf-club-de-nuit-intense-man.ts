import type { ProductSize } from "@/types";

export const ARMAF_CLUB_DE_NUIT_INTENSE_MAN_IMAGE =
  "/images/products/product-club-de-nuit-intense-man.jpg";

export const armafClubDeNuitIntenseMan = {
  name: "Club de Nuit Intense Man",
  brand: "Armaf",
  description:
    "Una fragancia masculina potente, fresca y sofisticada, reconocida por su carácter cítrico, frutal y ahumado. Club de Nuit Intense Man combina una salida vibrante con un corazón floral y un fondo profundo de maderas, creando un aroma elegante, versátil y de gran presencia.",
  gender: "masculine" as const,
  category: "arabian" as const,
  images: [ARMAF_CLUB_DE_NUIT_INTENSE_MAN_IMAGE],
  notes: {
    top: ["Limón", "Piña", "Bergamota", "Grosella negra", "Manzana"],
    heart: ["Abedul", "Jazmín", "Rosa"],
    base: ["Almizcle", "Ámbar gris", "Pachulí", "Vainilla"],
  },
  fragranceFamily: ["cítrico", "frutal", "amaderado", "ahumado", "aromático"],
  occasions: ["diario", "cita", "fiesta", "formal", "noche"],
  intensity: 4 as const,
  intensityScore: 8,
  projection: "Alta",
  longevity: "Alta",
  rating: 4.7,
};

export const armafClubDeNuitIntenseManPerfumeSizes: ProductSize[] = [
  { label: "105 ml", volumeMl: 105, price: 155, stock: 10 },
];

export const armafClubDeNuitIntenseManDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 15, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 18, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 23, stock: 11 },
];

export const armafClubDeNuitIntenseManSlugs = {
  perfume: "club-de-nuit-intense-man",
  decant: "club-de-nuit-intense-man-decant",
} as const;
