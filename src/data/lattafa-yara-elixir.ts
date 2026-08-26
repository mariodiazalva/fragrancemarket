import type { ProductSize } from "@/types";

export const LATTAFA_YARA_ELIXIR_IMAGE =
  "/images/products/product-yara-elixir.png";

export const lattafaYaraElixir = {
  name: "Yara Elixir",
  brand: "Lattafa",
  description:
    "Una fragancia femenina dulce, cremosa y seductora, con un perfil gourmand y floral. Yara Elixir combina frutas jugosas y flores suaves con acordes cálidos y dulces, creando un aroma envolvente, femenino y moderno, ideal para citas, salidas y ocasiones especiales.",
  gender: "feminine" as const,
  category: "arabian" as const,
  images: [LATTAFA_YARA_ELIXIR_IMAGE],
  notes: {
    top: ["Fresa", "Mandarina", "Grosella negra"],
    heart: ["Jazmín", "Flor de azahar", "Caramelo"],
    base: ["Vainilla", "Sándalo", "Almizcle", "Ámbar"],
  },
  fragranceFamily: ["floral", "gourmand", "ámbar", "frutal", "almizclado"],
  occasions: ["diario", "cita", "fiesta", "formal", "noche"],
  intensity: 4 as const,
  intensityScore: 8,
  projection: "Alta",
  longevity: "Alta",
  rating: 4.7,
};

export const lattafaYaraElixirPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 168, stock: 10 },
];

export const lattafaYaraElixirDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 16, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 19, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 25, stock: 11 },
];

export const lattafaYaraElixirSlugs = {
  perfume: "yara-elixir",
  decant: "yara-elixir-decant",
} as const;
