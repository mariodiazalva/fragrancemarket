import type { ProductSize } from "@/types";

export const ODYSSEY_AQUA_IMAGE = "/images/products/product-odyssey-aqua.png";

export const odysseyAqua = {
  name: "Odyssey Aqua",
  brand: "Armaf",
  description:
    "Una fragancia fresca, cítrica y aromática con un carácter limpio y masculino. Odyssey Aqua combina notas refrescantes con un fondo amaderado que la convierte en una opción versátil, ideal para el día a día, días calurosos y ocasiones donde buscas transmitir frescura y elegancia.",
  gender: "masculine" as const,
  category: "arabian" as const,
  images: [ODYSSEY_AQUA_IMAGE],
  notes: {
    top: ["Limón", "Mandarina", "Bergamota"],
    heart: ["Lavanda", "Geranio", "Menta"],
    base: ["Cedro", "Pachulí", "Sándalo", "Almizcle"],
  },
  fragranceFamily: ["cítrico", "aromático", "fresco", "amaderado"],
  occasions: ["diario", "cita", "fiesta", "formal"],
  intensity: 4 as const,
  intensityScore: 7,
  projection: "Media-alta",
  longevity: "Alta",
  rating: 4.7,
};

export const odysseyAquaPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 170, stock: 12 },
];

export const odysseyAquaDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 15, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 18, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 25, stock: 11 },
];

export const odysseyAquaSlugs = {
  perfume: "odyssey-aqua",
  decant: "odyssey-aqua-decant",
} as const;
