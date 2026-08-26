import type { ProductSize } from "@/types";

export const YVES_SAINT_LAURENT_Y_EAU_DE_PARFUM_IMAGE =
  "/images/products/product-y-eau-de-parfum.png";

export const yvesSaintLaurentYEauDeParfum = {
  name: "Y Eau de Parfum",
  brand: "Yves Saint Laurent",
  description:
    "Una fragancia masculina fresca, aromática y sofisticada que combina cítricos y notas verdes con un corazón aromático y un fondo cálido y amaderado. Y Eau de Parfum ofrece un equilibrio entre frescura y profundidad, convirtiéndola en una opción versátil para el día a día, citas y ocasiones especiales.",
  gender: "masculine" as const,
  category: "designer" as const,
  images: [YVES_SAINT_LAURENT_Y_EAU_DE_PARFUM_IMAGE],
  notes: {
    top: ["Manzana", "Jengibre", "Bergamota"],
    heart: ["Salvia", "Enebro", "Geranio"],
    base: ["Ámbar", "Cedro", "Vetiver", "Haba tonka", "Olibano"],
  },
  fragranceFamily: ["aromático", "fresco", "amaderado", "especiado", "ámbar"],
  occasions: ["diario", "cita", "fiesta", "formal", "noche"],
  intensity: 4 as const,
  intensityScore: 8,
  projection: "Alta",
  longevity: "Alta",
  rating: 4.7,
};

export const yvesSaintLaurentYEauDeParfumPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 570, stock: 10 },
];

export const yvesSaintLaurentYEauDeParfumDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 26, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 41, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 70, stock: 11 },
];

export const yvesSaintLaurentYEauDeParfumSlugs = {
  perfume: "y-eau-de-parfum",
  decant: "y-eau-de-parfum-decant",
} as const;
