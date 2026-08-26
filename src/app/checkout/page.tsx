import { CheckoutView } from "@/views/checkout/CheckoutView";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Checkout",
  description: "Registra tus datos, elige una agencia Shalom y continúa a Yape, Plin o transferencia BCP.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return <CheckoutView />;
}
