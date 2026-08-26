import type { ProductSize } from "@/types";

export const AFNAN_9PM_NIGHT_OUT_IMAGE =
  "/images/products/product-9pm-night-out.png";

export const afnan9pmNightOut = {
  name: "9 PM Night Out",
  brand: "Afnan",
  description:
    "Una fragancia masculina, intensa y sofisticada, diseñada para destacar durante la noche. 9 PM Night Out combina acordes especiados y aromáticos con un fondo cálido y amaderado, creando una esencia elegante, seductora y moderna, perfecta para citas, fiestas y ocasiones especiales.",
  gender: "masculine" as const,
  category: "arabian" as const,
  images: [AFNAN_9PM_NIGHT_OUT_IMAGE],
  notes: {
    top: ["Bergamota", "Pimienta negra", "Lavanda"],
    heart: ["Canela", "Salvia", "Acordes aromáticos"],
    base: ["Ámbar", "Vainilla", "Pachulí", "Maderas"],
  },
  fragranceFamily: ["ámbar", "aromático", "especiado", "amaderado"],
  occasions: ["cita", "fiesta", "formal", "noche"],
  intensity: 4 as const,
  intensityScore: 8,
  projection: "Alta",
  longevity: "Alta",
  rating: 4.5,
};

export const afnan9pmNightOutPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 155, stock: 14 },
];

export const afnan9pmNightOutDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 19, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 25, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 37, stock: 11 },
];

export const afnan9pmNightOutSlugs = {
  perfume: "9-pm-night-out",
  decant: "9-pm-night-out-decant",
} as const;
