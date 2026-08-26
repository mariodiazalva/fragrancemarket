import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { OrderConfirmation } from "@/components/order/OrderConfirmation";
import { createPageMetadata } from "@/lib/seo";
import { getOrderPaymentSummary } from "@/services/order.service";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Pedido confirmado",
  description: "Tu pedido quedó registrado. El pago se valida con Yape, Plin o transferencia.",
  path: "/pedido/confirmado",
  noIndex: true,
});

type ConfirmedPageProps = {
  searchParams: Promise<{
    id?: string | string[];
    paid?: string | string[];
    notified?: string | string[];
  }>;
};

export default async function OrderConfirmedPage({ searchParams }: ConfirmedPageProps) {
  const params = await searchParams;
  const orderId = Array.isArray(params.id) ? params.id[0] : params.id;
  const paidFlag = Array.isArray(params.paid) ? params.paid[0] : params.paid;
  const notifiedFlag = Array.isArray(params.notified) ? params.notified[0] : params.notified;
  const paid = paidFlag === "1";
  const notified = !paid && notifiedFlag === "1";
  let order = null;

  if (orderId) {
    try {
      order = await getOrderPaymentSummary(orderId);
    } catch {
      order = null;
    }
  }

  if (!order) {
    return (
      <main className="flex-1 pb-16 pt-8 sm:pt-12">
        <Container size="narrow">
          <p className="text-xs uppercase tracking-[0.35em] text-elova-gold">Compra</p>
          <h1 className="mt-4 font-serif text-[2rem] tracking-[0.04em] text-text-primary sm:text-4xl">
            {paid ? "Pedido pagado" : notified ? "Pago por validar" : "Pedido registrado"}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            {orderId
              ? "No encontramos ese pedido. Revisa la referencia o vuelve a consultarlo en tu cuenta."
              : "Guardamos tu pedido como pendiente. En el siguiente paso verás el QR de Yape y los números de cuenta."}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/cuenta" variant="outline">
              Consultar pedido
            </ButtonLink>
            <ButtonLink href="/perfumes" variant="outline">
              Seguir viendo
            </ButtonLink>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <OrderConfirmation
      order={order}
      phase={paid || order.status === "paid" ? "paid" : notified ? "notified" : "thanks"}
      actions={
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {!paid && order.status === "pending" ? (
            <ButtonLink href={`/pedido/${order.id}/pagar`} variant={notified ? "outline" : "primary"}>
              {notified ? "Ver datos de pago" : "Ir al pago"}
            </ButtonLink>
          ) : null}
          <ButtonLink href={`/cuenta?id=${order.id}`} variant={paid || order.status === "paid" ? "primary" : "outline"}>
            Consultar pedido
          </ButtonLink>
          <ButtonLink href="/perfumes" variant="outline">
            Seguir viendo
          </ButtonLink>
        </div>
      }
    />
  );
}
