import type { ProductSize } from "@/types";

export const LATTAFA_ASAD_BOURBON_IMAGE =
  "/images/products/product-asad-bourbon.png";

export const lattafaAsadBourbon = {
  name: "Asad Bourbon",
  brand: "Lattafa",
  description:
    "Una fragancia cálida, dulce y sofisticada que combina un acorde de bourbon con vainilla cremosa y especias. Asad Bourbon tiene un carácter intenso, envolvente y masculino, perfecto para quienes buscan un aroma elegante y seductor, especialmente durante la noche y en climas frescos.",
  gender: "masculine" as const,
  category: "arabian" as const,
  images: [LATTAFA_ASAD_BOURBON_IMAGE],
  notes: {
    top: ["Pimienta rosa", "Lavanda", "Ciruela"],
    heart: ["Bourbon", "Cacao", "Nuez moscada", "Davana"],
    base: ["Ámbar", "Vainilla", "Vetiver"],
  },
  fragranceFamily: ["ámbar", "gourmand", "especiado", "aromático"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Alta",
  longevity: "Alta",
  rating: 4.7,
};

export const lattafaAsadBourbonPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 160, stock: 10 },
];

export const lattafaAsadBourbonDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 15, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 18, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 24, stock: 11 },
];

export const lattafaAsadBourbonSlugs = {
  perfume: "asad-bourbon",
  decant: "asad-bourbon-decant",
} as const;
