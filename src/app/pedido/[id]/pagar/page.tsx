import { notFound, redirect } from "next/navigation";

import { createPageMetadata } from "@/lib/seo";
import { isOrderAwaitingPayment } from "@/lib/order-confirmation";
import { isPaymentsTestMode } from "@/lib/supabase/env";
import { getOrderPaymentSummary } from "@/services/order.service";
import { PayOrderView } from "@/views/order/PayOrderView";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Pagar pedido",
  description: "Paga tu pedido con Yape, Plin o transferencia BCP.",
  path: "/pedido",
  noIndex: true,
});

type PayOrderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PayOrderPage({ params }: PayOrderPageProps) {
  const { id } = await params;
  const order = await getOrderPaymentSummary(id);

  if (!order) {
    notFound();
  }

  if (!isOrderAwaitingPayment(order.status)) {
    redirect(`/pedido/confirmado?id=${encodeURIComponent(order.id)}`);
  }

  return <PayOrderView order={order} testMode={isPaymentsTestMode()} />;
}
