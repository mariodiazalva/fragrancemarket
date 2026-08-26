import { createPageMetadata } from "@/lib/seo";
import { ShippingView } from "@/views/shipping/ShippingView";

export const metadata = createPageMetadata({
  title: "Envíos",
  description:
    "Envíos a todo el Perú por agencia Shalom. Eliges la agencia en el checkout; hoy el flete no se cobra en el total.",
  path: "/envios",
});

export default function EnviosPage() {
  return <ShippingView />;
}
