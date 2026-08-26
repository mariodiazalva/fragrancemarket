import { CartView } from "@/views/cart/CartView";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Carrito",
  description: "Revisa las piezas que elegiste antes de continuar la compra.",
  path: "/carrito",
  noIndex: true,
});

export default function CarritoPage() {
  return <CartView />;
}
