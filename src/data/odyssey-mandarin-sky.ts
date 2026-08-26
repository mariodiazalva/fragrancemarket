import type { ProductSize } from "@/types";

export const ODYSSEY_MANDARIN_SKY_IMAGE =
  "/images/products/product-odyssey-mandarin-sky.png";

export const odysseyMandarinSky = {
  name: "Odyssey Mandarin Sky",
  brand: "Armaf",
  description:
    "Una fragancia masculina dulce, cítrica y moderna que combina la frescura de la mandarina con un corazón gourmand y un fondo cálido y amaderado. Odyssey Mandarin Sky ofrece un aroma llamativo, juvenil y seductor, ideal para el día a día, citas y salidas nocturnas.",
  gender: "masculine" as const,
  category: "arabian" as const,
  images: [ODYSSEY_MANDARIN_SKY_IMAGE],
  notes: {
    top: ["Mandarina", "Naranja", "Azafrán"],
    heart: ["Caramelo", "Haba tonka", "Cumarina"],
    base: ["Vetiver", "Cedro", "Ambroxan"],
  },
  fragranceFamily: ["cítrico", "frutal", "ámbar", "gourmand", "amaderado"],
  occasions: ["diario", "cita", "fiesta", "noche"],
  intensity: 4 as const,
  intensityScore: 8,
  projection: "Alta",
  longevity: "Alta",
  rating: 4.6,
};

export const odysseyMandarinSkyPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 155, stock: 10 },
];

export const odysseyMandarinSkyDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 15, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 18, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 24, stock: 11 },
];

export const odysseyMandarinSkySlugs = {
  perfume: "odyssey-mandarin-sky",
  decant: "odyssey-mandarin-sky-decant",
} as const;
