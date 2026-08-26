import type { ProductSize } from "@/types";

export const VALENTINO_BORN_IN_ROMA_EXTRADOSE_IMAGE =
  "/images/products/product-born-in-roma-extradose.png";

export const valentinoBornInRomaExtradose = {
  name: "Born in Roma Extradose",
  brand: "Valentino",
  description:
    "Una interpretación más intensa y profunda de la línea Born in Roma, con un carácter moderno, seductor y sofisticado. Born in Roma Extradose combina acordes aromáticos y especiados con una base cálida y amaderada, creando una fragancia de gran presencia, ideal para destacar especialmente durante la noche.",
  gender: "masculine" as const,
  category: "designer" as const,
  images: [VALENTINO_BORN_IN_ROMA_EXTRADOSE_IMAGE],
  notes: {
    top: ["Acordes especiados", "Notas aromáticas"],
    heart: ["Lavanda", "Acordes florales"],
    base: ["Vainilla", "Maderas", "Ámbar"],
  },
  fragranceFamily: ["ámbar", "aromático", "amaderado", "especiado"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 10,
  projection: "Muy alta",
  longevity: "Muy alta",
  rating: 4.8,
};

export const valentinoBornInRomaExtradosePerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 670, stock: 10 },
];

export const valentinoBornInRomaExtradoseDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 30, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 45, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 78, stock: 11 },
];

export const valentinoBornInRomaExtradoseSlugs = {
  perfume: "born-in-roma-extradose",
  decant: "born-in-roma-extradose-decant",
} as const;
