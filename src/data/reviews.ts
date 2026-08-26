import type { DemoReview } from "@/types/content";

/** Demo-only reviews. Used when Supabase is not configured. Never present as real testimonials. */
export const mockReviews: DemoReview[] = [
  {
    id: "review-demo-1",
    author: "Ana M.",
    rating: 5,
    title: "El decant me evitó una compra a ciegas",
    body: "Pedí 5 ml antes del frasco. La persistencia y el secado coincidieron con lo que buscaba.",
    productName: "Odyssey Aqua",
    isDemo: true,
  },
  {
    id: "review-demo-2",
    author: "Diego R.",
    rating: 4,
    title: "Bien para decidir entre dos ouds",
    body: "El set Arabian me sirvió para comparar. Me quedé con uno y dejé el otro.",
    productName: "Born in Roma Uomo Intense",
    isDemo: true,
  },
  {
    id: "review-demo-3",
    author: "Lucía V.",
    rating: 5,
    title: "Llegó ordenado y fácil de probar",
    body: "Los viales venían identificados. Usé el de 3 ml en la oficina durante una semana.",
    productName: "Acqua di Giò Profondo",
    isDemo: true,
  },
];
