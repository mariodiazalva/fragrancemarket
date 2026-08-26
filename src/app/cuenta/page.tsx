import { createPageMetadata } from "@/lib/seo";
import { getAccountEmail, getMyOrders, getOrderPaymentSummary } from "@/services/order.service";
import { getIsStoreAdmin } from "@/services/admin-order.service";
import { AccountView } from "@/views/account/AccountView";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Cuenta",
  description: "Consulta tus pedidos con un enlace al correo o con la referencia de compra.",
  path: "/cuenta",
  noIndex: true,
});

type AccountPageProps = {
  searchParams: Promise<{
    id?: string | string[];
    sent?: string | string[];
    error?: string | string[];
  }>;
};

export default async function CuentaPage({ searchParams }: AccountPageProps) {
  const params = await searchParams;
  const orderId = (Array.isArray(params.id) ? params.id[0] : params.id)?.trim() ?? "";
  const sentFlag = Array.isArray(params.sent) ? params.sent[0] : params.sent;
  const errorFlag = Array.isArray(params.error) ? params.error[0] : params.error;

  const email = await getAccountEmail();
  const isAdmin = email ? await getIsStoreAdmin() : false;
  let orders: Awaited<ReturnType<typeof getMyOrders>> = [];
  let ordersError: string | null = null;

  try {
    orders = email ? await getMyOrders() : [];
  } catch (error) {
    ordersError = error instanceof Error ? error.message : "No se pudieron leer tus pedidos.";
  }

  let order = null;
  let lookupError: string | null = null;

  if (orderId) {
    try {
      order = await getOrderPaymentSummary(orderId);

      if (!order) {
        lookupError = lookupError ?? "No encontramos ese pedido. Revisa la referencia.";
      }
    } catch (error) {
      lookupError =
        error instanceof Error ? error.message : "No se pudo consultar el pedido.";
    }
  }

  return (
    <AccountView
      email={email}
      orders={orders}
      orderId={orderId}
      order={order}
      lookupError={lookupError}
      ordersError={ordersError}
      magicSent={sentFlag === "1"}
      authError={errorFlag ?? null}
      isAdmin={isAdmin}
    />
  );
}
