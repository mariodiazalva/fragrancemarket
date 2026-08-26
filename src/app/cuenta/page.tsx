import { redirect } from "next/navigation";

import { createPageMetadata } from "@/lib/seo";
import { orderDetailHref } from "@/lib/order-confirmation";
import {
  getAccountEmail,
  getOrderPaymentSummary,
  getOrdersByEmail,
} from "@/services/order.service";
import { getIsStoreAdmin } from "@/services/admin-order.service";
import { AccountView } from "@/views/account/AccountView";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Cuenta",
  description: "Consulta tus pedidos con el correo de compra o con la referencia.",
  path: "/cuenta",
  noIndex: true,
});

type AccountPageProps = {
  searchParams: Promise<{
    id?: string | string[];
    email?: string | string[];
    error?: string | string[];
  }>;
};

function firstParam(value?: string | string[]): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export default async function CuentaPage({ searchParams }: AccountPageProps) {
  const params = await searchParams;
  const orderId = firstParam(params.id);
  const lookupEmail = firstParam(params.email).toLowerCase();
  const errorFlag = firstParam(params.error);

  const sessionEmail = await getAccountEmail();
  const isAdmin = sessionEmail ? await getIsStoreAdmin() : false;
  const ordersEmail = lookupEmail || (!orderId ? sessionEmail : null);
  const showOrders = Boolean(ordersEmail);

  let orders: Awaited<ReturnType<typeof getOrdersByEmail>> = [];
  let ordersError: string | null = null;

  if (ordersEmail) {
    try {
      orders = await getOrdersByEmail(ordersEmail);
    } catch (error) {
      ordersError = error instanceof Error ? error.message : "No se pudieron leer tus pedidos.";
    }
  }

  let lookupError: string | null = null;

  if (orderId) {
    let order = null;

    try {
      order = await getOrderPaymentSummary(orderId);
    } catch (error) {
      lookupError =
        error instanceof Error ? error.message : "No se pudo consultar el pedido.";
    }

    if (order) {
      redirect(orderDetailHref(order.id, order.status));
    } else if (!lookupError) {
      lookupError = "No encontramos ese pedido. Revisa la referencia o el número de pedido.";
    }
  }

  return (
    <AccountView
      sessionEmail={sessionEmail}
      lookupEmail={lookupEmail}
      ordersEmail={ordersEmail}
      orders={orders}
      showOrders={showOrders}
      orderId={orderId}
      lookupError={lookupError}
      ordersError={ordersError}
      authError={errorFlag || null}
      isAdmin={isAdmin}
    />
  );
}
