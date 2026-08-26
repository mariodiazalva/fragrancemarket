import type { ProductSize } from "@/types";

export const LATTAFA_YARA_TOUS_IMAGE = "/images/products/product-yara-tous.png";

export const lattafaYaraTous = {
  name: "Yara Tous",
  brand: "Lattafa",
  description:
    "Una fragancia femenina tropical, dulce y luminosa que combina frutas exóticas con flores delicadas y un fondo cremoso y cálido. Yara Tous transmite una sensación juvenil, alegre y sensual, perfecta para días cálidos, salidas casuales y citas.",
  gender: "feminine" as const,
  category: "arabian" as const,
  images: [LATTAFA_YARA_TOUS_IMAGE],
  notes: {
    top: ["Mango", "Coco", "Maracuyá"],
    heart: ["Jazmín", "Heliotropo", "Flor de azahar"],
    base: ["Vainilla", "Almizcle", "Cashmeran"],
  },
  fragranceFamily: ["frutal", "floral", "tropical", "gourmand", "ámbar"],
  occasions: ["diario", "cita", "fiesta", "noche"],
  intensity: 4 as const,
  intensityScore: 7,
  projection: "Media-alta",
  longevity: "Alta",
  rating: 4.6,
};

export const lattafaYaraTousPerfumeSizes: ProductSize[] = [
  { label: "100 ml", volumeMl: 100, price: 128, stock: 10 },
];

export const lattafaYaraTousDecantSizes: ProductSize[] = [
  { label: "3 ml", volumeMl: 3, price: 15, stock: 22 },
  { label: "5 ml", volumeMl: 5, price: 17, stock: 18 },
  { label: "10 ml", volumeMl: 10, price: 21, stock: 11 },
];

export const lattafaYaraTousSlugs = {
  perfume: "yara-tous",
  decant: "yara-tous-decant",
} as const;
