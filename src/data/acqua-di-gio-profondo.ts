import type { ProductSize } from "@/types";

export const ACQUA_DI_GIO_PROFONDO_IMAGE =
  "/images/products/product-acqua-di-gio-profondo.png";

export const acquaDiGioProfondo = {
  name: "Acqua di Giò Profondo",
  brand: "Giorgio Armani",
  description:
    "Una fragancia fresca, elegante y profundamente marina que captura la sensación del océano y la naturaleza. Acqua di Giò Profondo combina cítricos y notas marinas con un corazón aromático y un fondo amaderado, creando un aroma limpio, masculino y sofisticado, ideal para el día a día y los días cálidos.",
  gender: "masculine" as const,
  category: "designer" as const,
  images: [ACQUA_DI_GIO_PROFONDO_IMAGE],
  notes: {
    top: ["Notas marinas", "Mandarina verde", "Bergamota"],
    heart: ["Romero", "Ciprés", "Lavanda", "Lentisco"],
    base: ["Almizcle", "Ámbar mineral", "Madera de pachulí"],
  },
  fragranceFamily: ["aromático", "cítrico", "fresco", "amaderado"],
  occasions: ["diario", "cita", "fiesta", "formal"],
  intensity: 4 as const,
  intensityScore: 7,
  projection: "Media-alta",
  longevity: "Alta",
  rating: 4.6,
};

export const acquaDiGioProfondoPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 550, stock: 10 },
];

export const acquaDiGioProfondoDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 35, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 52, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 75, stock: 11 },
];

export const acquaDiGioProfondoSlugs = {
  perfume: "acqua-di-gio-profondo",
  decant: "acqua-di-gio-profondo-decant",
} as const;
