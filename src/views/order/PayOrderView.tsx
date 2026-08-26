"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { OrderConfirmation } from "@/components/order/OrderConfirmation";
import { Button, ButtonLink } from "@/components/ui/Button";
import type { OrderPaymentSummary } from "@/types/order";

type PayOrderViewProps = {
  order: OrderPaymentSummary;
  testMode: boolean;
};

export function PayOrderView({ order, testMode }: PayOrderViewProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const isPending = order.status === "pending";
  const alreadyPaid = order.status === "paid";

  async function onMarkPaid() {
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch(`/api/orders/${order.id}/pay`, {
        method: "POST",
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "No se pudo confirmar el pago.");
      }

      router.push(`/pedido/confirmado?id=${order.id}&paid=1`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo confirmar el pago.");
      setSubmitting(false);
    }
  }

  return (
    <OrderConfirmation
      order={order}
      phase={alreadyPaid ? "paid" : "pay"}
      actions={
        <div className="space-y-4">
          {error ? (
            <p className="text-sm text-red-700" role="alert">
              {error}
            </p>
          ) : null}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {isPending ? (
              <ButtonLink href={`/pedido/confirmado?id=${order.id}&notified=1`}>
                He realizado el pago
              </ButtonLink>
            ) : alreadyPaid ? (
              <ButtonLink href={`/pedido/confirmado?id=${order.id}&paid=1`}>
                Ver confirmación
              </ButtonLink>
            ) : (
              <ButtonLink href={`/cuenta?id=${order.id}`}>Consultar pedido</ButtonLink>
            )}
            <ButtonLink href="/perfumes" variant="outline">
              Seguir viendo
            </ButtonLink>
          </div>
        </div>
      }
      footer={
        !isPending || !testMode ? null : (
          <div className="rounded-xl border border-elova-border p-4">
            <p className="text-[0.7rem] leading-relaxed tracking-normal text-text-secondary">
              Solo para pruebas locales: marca el pedido como pagado y descuenta
              stock. No uses esto en producción.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={onMarkPaid}
              disabled={submitting}
            >
              {submitting ? "Confirmando…" : "Marcar como pagado (prueba)"}
            </Button>
          </div>
        )
      }
    />
  );
}
