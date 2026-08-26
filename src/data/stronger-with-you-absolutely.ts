import type { ProductSize } from "@/types";

export const STRONGER_WITH_YOU_ABSOLUTELY_IMAGE =
  "/images/products/product-stronger-with-you-absolutely.png";

export const strongerWithYouAbsolutely = {
  name: "Stronger With You Absolutely",
  brand: "Emporio Armani",
  description:
    "Una fragancia masculina, cálida y seductora, con un perfil dulce y profundo. Stronger With You Absolutely combina ron, castaña y vainilla con un fondo amaderado y ahumado, creando un aroma intenso, elegante y envolvente. Ideal para noches, citas y ocasiones especiales.",
  gender: "masculine" as const,
  category: "designer" as const,
  images: [STRONGER_WITH_YOU_ABSOLUTELY_IMAGE],
  notes: {
    top: ["Ron", "Elemi"],
    heart: ["Castaña", "Lavanda", "Davana"],
    base: ["Vainilla de Madagascar", "Cedro", "Pachulí"],
  },
  fragranceFamily: ["ámbar", "gourmand", "aromático", "amaderado"],
  occasions: ["cita", "diario", "fiesta", "formal", "noche"],
  intensity: 5 as const,
  intensityScore: 9,
  projection: "Alta",
  longevity: "Muy alta",
  rating: 4.8,
};

export const strongerWithYouAbsolutelyPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 535, stock: 10 },
];

export const strongerWithYouAbsolutelyDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 25, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 37, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 65, stock: 11 },
];

export const strongerWithYouAbsolutelySlugs = {
  perfume: "stronger-with-you-absolutely",
  decant: "stronger-with-you-absolutely-decant",
} as const;
