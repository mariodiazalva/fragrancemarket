import type { ProductSize } from "@/types";

export const VERSACE_EROS_EAU_DE_PARFUM_IMAGE =
  "/images/products/product-eros-eau-de-parfum.png";

export const versaceErosEauDeParfum = {
  name: "Eros Eau de Parfum",
  brand: "Versace",
  description:
    "Una fragancia masculina intensa, fresca y seductora que combina cítricos vibrantes con notas aromáticas y un fondo cálido y amaderado. Eros Eau de Parfum mantiene el carácter icónico de la línea Eros, pero con una presencia más profunda y envolvente, perfecta para citas, fiestas y ocasiones especiales.",
  gender: "masculine" as const,
  category: "designer" as const,
  images: [VERSACE_EROS_EAU_DE_PARFUM_IMAGE],
  notes: {
    top: ["Limón", "Mandarina", "Manzana", "Menta"],
    heart: ["Geranio", "Ambroxan", "Salvia"],
    base: ["Vainilla", "Haba tonka", "Sándalo", "Cedro", "Pachulí", "Ámbar"],
  },
  fragranceFamily: ["aromático", "ámbar", "cítrico", "amaderado", "gourmand"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Alta",
  longevity: "Alta",
  rating: 4.7,
};

export const versaceErosEauDeParfumPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 365, stock: 10 },
];

export const versaceErosEauDeParfumDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 20, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 30, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 45, stock: 11 },
];

export const versaceErosEauDeParfumSlugs = {
  perfume: "eros-eau-de-parfum",
  decant: "eros-eau-de-parfum-decant",
} as const;
