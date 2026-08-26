import type { HomeLinkCard } from "@/types/content";

export const discoverCards: HomeLinkCard[] = [
  {
    id: "decants",
    title: "Decants",
    description: "Prueba antes de elegir.",
    href: "/decants",
    image: "/images/home/discover-decants.png",
    cta: "Ver decants",
  },
  {
    id: "perfumes",
    title: "Perfumes",
    description: "Tu próxima fragancia está aquí.",
    href: "/perfumes",
    image: "/images/home/discover-perfumes-trio.png",
    cta: "Ver perfumes",
  },
  {
    id: "combos",
    title: "Combos",
    description: "Más aromas. Mejor elección.",
    href: "/combos",
    image: "/images/home/discover-combos-collection.png",
    cta: "Próximamente",
  },
];

export const profileCards: HomeLinkCard[] = [
  { id: "frescos", title: "Frescos", href: "/colecciones/frescos" },
  { id: "seductores", title: "Seductores", href: "/colecciones/seductores" },
  { id: "intensos", title: "Intensos", href: "/colecciones/intensos" },
  { id: "elegantes", title: "Elegantes", href: "/colecciones/elegantes" },
];

export const decantSizes = [
  { id: "3ml", volume: "3 ML", text: "Para conocerlo." },
  { id: "5ml", volume: "5 ML", text: "Para probarlo varios días." },
  { id: "10ml", volume: "10 ML", text: "Para disfrutarlo durante más tiempo." },
] as const;

export const collectionCards: HomeLinkCard[] = [
  { id: "hombre", title: "Hombre", href: "/hombre" },
  { id: "mujer", title: "Mujer", href: "/mujer" },
  { id: "unisex", title: "Unisex", href: "/unisex" },
  { id: "disenador", title: "Diseñador", href: "/disenador" },
  { id: "arabes", title: "Árabes", href: "/arabes" },
  { id: "nicho", title: "Nicho", href: "/nicho" },
];

export const occasionCards: HomeLinkCard[] = [
  { id: "diario", title: "Diario", href: "/ocasiones/diario" },
  { id: "cita", title: "Cita", href: "/ocasiones/cita" },
  { id: "fiesta", title: "Fiesta", href: "/ocasiones/fiesta" },
  { id: "formal", title: "Formal", href: "/ocasiones/formal" },
  { id: "noche", title: "Noche", href: "/ocasiones/noche" },
];

export const trustItems = [
  {
    id: "originales",
    title: "Productos originales",
    text: "Cada fragancia se ofrece como pieza original. Si algo no queda claro, te lo confirmamos antes de comprar.",
  },
  {
    id: "envios",
    title: "Envíos a todo el Perú",
    text: "Hacemos envíos a nivel nacional. El plazo y el costo se confirman según tu destino.",
  },
  {
    id: "compra",
    title: "Compra segura",
    text: "Puedes pagar con Yape, Plin o transferencia BCP. Los datos salen al finalizar el pedido; validamos el pago antes de despachar.",
  },
  {
    id: "atencion",
    title: "Atención personalizada",
    text: "Si necesitas orientar una compra o resolver una duda, puedes escribirnos y te respondemos.",
  },
] as const;

export const socialPlaceholders = [
  { id: "instagram", label: "Instagram", caption: "Próximamente" },
  { id: "tiktok", label: "TikTok", caption: "Próximamente" },
  { id: "reels", label: "Reels", caption: "Próximamente" },
  { id: "diario", label: "Diario olfativo", caption: "Contenido de perfumes" },
] as const;
