import type { FaqItem } from "@/types/content";

/** Local FAQ. Used when Supabase is not configured. */

export const mockFaqs: FaqItem[] = [
  {
    id: "originales",
    question: "¿Los perfumes son originales?",
    answer:
      "Fragrance Market trabaja con fragancias originales. Si tienes una duda concreta sobre un producto, escríbenos antes de comprar y te confirmamos el origen de esa pieza.",
  },
  {
    id: "decant",
    question: "¿Qué es un decant?",
    answer:
      "Un decant es una porción más pequeña de una fragancia, pasada a un vial. Sirve para conocer un perfume en la piel durante varios días, sin comprar el frasco completo.",
  },
  {
    id: "tamanos",
    question: "¿Qué tamaños tienen?",
    answer:
      "Los decants están pensados en 3 ml, 5 ml y 10 ml. Los frascos completos varían según cada casa. El tamaño disponible aparece en la ficha del producto.",
  },
  {
    id: "envio-plazo",
    question: "¿Cuánto demora el envío?",
    answer:
      "El plazo depende del destino y del método elegido. Te lo confirmamos al momento de la compra, antes de pagar.",
  },
  {
    id: "envio-peru",
    question: "¿Hacen envíos a todo el Perú?",
    answer:
      "Sí, hacemos envíos a nivel nacional por agencia Shalom. En el checkout filtras por distrito y ciudad y eliges la agencia donde recoger el pedido.",
  },
  {
    id: "elegir",
    question: "¿Cómo puedo elegir mi perfume?",
    answer:
      "Puedes empezar por un decant, explorar por perfil u ocasión, o usar el recomendador para acotar la búsqueda.",
  },
  {
    id: "pagos",
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos Yape, Plin y transferencia BCP. El QR y los números de cuenta aparecen al finalizar el pedido. El pedido queda pendiente hasta que validemos el pago.",
  },
];
