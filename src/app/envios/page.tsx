import { createPageMetadata } from "@/lib/seo";
import { ShippingView } from "@/views/shipping/ShippingView";

export const metadata = createPageMetadata({
  title: "Envíos",
  description:
    "Recojo gratis en Trujillo, delivery local según zona y envíos a todo el Perú por agencia Shalom. Eliges el método en el checkout.",
  path: "/envios",
});

export default function EnviosPage() {
  return <ShippingView />;
}
