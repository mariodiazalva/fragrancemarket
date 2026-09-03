import type { ProductSize } from "@/types";

export const AFNAN_9_PM_IMAGE = "/images/products/product-9-pm.png";

export const afnan9pm = {
  name: "9 PM",
  brand: "Afnan",
  description:
    "Una fragancia masculina dulce, cálida y seductora, con un carácter juvenil y envolvente. Afnan 9 PM combina frutas frescas con canela, vainilla y haba tonka, creando un aroma adictivo y de gran presencia. Ideal para citas, fiestas y noches en las que quieres destacar.",
  gender: "masculine" as const,
  category: "arabian" as const,
  images: [AFNAN_9_PM_IMAGE],
  notes: {
    top: ["Bergamota", "Lavanda", "Canela", "Manzana"],
    heart: ["Muguet", "Flor de azahar"],
    base: ["Vainilla", "Haba tonka", "Ámbar", "Pachulí"],
  },
  fragranceFamily: ["ámbar", "aromático", "frutal", "gourmand", "especiado"],
  occasions: ["cita", "fiesta", "noche", "formal", "diario"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Alta",
  longevity: "Muy alta",
  rating: 4.7,
};

export const afnan9pmPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 165, stock: 10 },
];

export const afnan9pmDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 15, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 23, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 30, stock: 11 },
];

export const afnan9pmSlugs = {
  perfume: "9-pm",
  decant: "9-pm-decant",
} as const;
