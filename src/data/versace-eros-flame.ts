import type { ProductSize } from "@/types";

export const VERSACE_EROS_FLAME_IMAGE =
  "/images/products/product-eros-flame.jpg";

export const versaceErosFlame = {
  name: "Eros Flame",
  brand: "Versace",
  description:
    "Una fragancia masculina intensa, cálida y seductora que combina cítricos vibrantes con especias aromáticas y un fondo amaderado. Eros Flame tiene un carácter apasionado y elegante, con una mezcla equilibrada entre frescura y calidez que la hace ideal para destacar tanto de día como de noche.",
  gender: "masculine" as const,
  category: "designer" as const,
  images: [VERSACE_EROS_FLAME_IMAGE],
  notes: {
    top: ["Mandarina", "Limón", "Pimienta negra", "Romero", "Chinotto"],
    heart: ["Geranio", "Rosa", "Pimienta de Madagascar"],
    base: ["Haba tonka", "Vainilla", "Sándalo", "Cedro", "Pachulí", "Musgo de roble"],
  },
  fragranceFamily: ["cítrico", "aromático", "especiado", "ámbar", "amaderado"],
  occasions: ["diario", "cita", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Alta",
  longevity: "Alta",
  rating: 4.7,
};

export const versaceErosFlamePerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 465, stock: 10 },
];

export const versaceErosFlameDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 24, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 35, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 57, stock: 11 },
];

export const versaceErosFlameSlugs = {
  perfume: "eros-flame",
  decant: "eros-flame-decant",
} as const;
