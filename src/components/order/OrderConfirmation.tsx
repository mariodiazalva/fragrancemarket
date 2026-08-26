import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { PaymentInstructions } from "@/components/order/PaymentInstructions";
import { storePaymentDetails } from "@/data/payments";
import {
  billingAddressLines,
  customerFirstName,
  formatPhoneDisplay,
  orderItemCount,
  orderSubtotal,
  shippingAddressLines,
  shippingMapEmbedUrl,
  shippingMethodLabel,
  shortOrderNumber,
} from "@/lib/order-confirmation";
import { getProductHref } from "@/lib/product";
import { formatPrice } from "@/lib/utils";
import type { OrderPaymentSummary } from "@/types/order";

export type OrderConfirmationPhase = "pay" | "thanks" | "notified" | "paid" | "summary";

type OrderConfirmationProps = {
  order: OrderPaymentSummary;
  phase: OrderConfirmationPhase;
  hidePaymentDetails?: boolean;
  actions?: ReactNode;
  footer?: ReactNode;
};

export function OrderConfirmation({
  order,
  phase,
  hidePaymentDetails = false,
  actions,
  footer,
}: OrderConfirmationProps) {
  const firstName = customerFirstName(order.customer);
  const orderRef = shortOrderNumber(order.id);
  const itemCount = orderItemCount(order.items);
  const subtotal = orderSubtotal(order);
  const isThankYou =
    phase === "notified" ||
    phase === "paid" ||
    phase === "summary" ||
    order.status === "paid";
  const showPayment =
    !hidePaymentDetails && (phase === "pay" || phase === "thanks");
  const addressLines = order.shipping
    ? shippingAddressLines(order.shipping, order.customer)
    : [];
  const billingLines = order.billing
    ? billingAddressLines(order.billing, order.customer)
    : [];

  const statusCard = (
    <div className="mt-6 rounded-xl border border-elova-border bg-elova-cream p-5 sm:p-6">
      <h2 className="font-serif text-xl tracking-[-0.02em] text-text-primary">
        {cardTitle(phase, order.status)}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {cardCopy(phase, order.status)}
      </p>
      {showPayment ? (
        <div className="mt-6">
          <PaymentInstructions amount={order.total} reference={order.id} />
        </div>
      ) : null}
    </div>
  );

  return (
    <main className="flex-1 bg-elova-cream-deep">
      <div className="mx-auto grid min-h-full max-w-container-wide lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
        <section className="bg-elova-cream px-4 py-10 sm:px-8 lg:px-12 lg:py-14">
          <div className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-12 shrink-0 items-center justify-center rounded-full bg-elova-black text-elova-white"
            >
              <svg viewBox="0 0 24 24" className="size-6" fill="none">
                <path
                  d="M6.5 12.5l3.4 3.4 7.6-7.8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="min-w-0">
              <p className="text-sm text-text-secondary">Confirmación Nº {orderRef}</p>
              <h1 className="mt-1 font-serif text-[1.75rem] leading-tight tracking-[-0.02em] text-text-primary sm:text-4xl">
                {headingForPhase(phase, order.status, firstName)}
              </h1>
            </div>
          </div>

          {isThankYou ? (
            <>
              {statusCard}
              {actions ? <div className="mt-6">{actions}</div> : null}
            </>
          ) : null}

          {order.shipping ? (
            <div className="relative mt-8 overflow-hidden rounded-xl border border-elova-border bg-surface-elevated">
              <iframe
                title={`Mapa de envío a ${order.shipping.city}`}
                src={shippingMapEmbedUrl(order.shipping)}
                className="h-56 w-full border-0 grayscale-[0.35] contrast-[1.05] sm:h-64"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute bottom-4 left-4 max-w-[min(100%-2rem,22rem)] rounded-lg bg-elova-cream px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                <p className="text-xs leading-relaxed text-text-primary">
                  {order.shipping.line}
                </p>
                <p className="mt-0.5 text-[0.7rem] text-text-secondary">
                  {[order.shipping.district, order.shipping.city, order.shipping.department]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            </div>
          ) : null}

          {isThankYou ? null : statusCard}

          <div className="mt-10">
            <h2 className="font-serif text-xl tracking-[-0.02em] text-text-primary">
              Detalles del pedido
            </h2>
            <div className="mt-5 grid gap-8 rounded-xl border border-elova-border bg-elova-cream p-5 sm:grid-cols-2 sm:p-6">
              <DetailBlock title="Información de contacto">
                {order.customer?.email ? (
                  <p>{order.customer.email}</p>
                ) : (
                  <p>Referencia {orderRef}</p>
                )}
                {order.customer?.phone ? (
                  <p>{formatPhoneDisplay(order.customer.phone)}</p>
                ) : null}
              </DetailBlock>

              {hidePaymentDetails ? null : (
                <DetailBlock title="Métodos de pago">
                  <p>Yape / Plin / {storePaymentDetails.bankName}</p>
                  <p>{formatPrice(order.total)}</p>
                </DetailBlock>
              )}

              {order.shipping ? (
                <DetailBlock title="Dirección de envío">
                  {addressLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </DetailBlock>
              ) : null}

              {billingLines.length > 0 ? (
                <DetailBlock title="Dirección de facturación">
                  {billingLines.map((line) => (
                    <p key={`billing-${line}`}>{line}</p>
                  ))}
                </DetailBlock>
              ) : null}

              <DetailBlock title="Método de envío">
                <p>{shippingMethodLabel(order.shipping)}</p>
                {order.shipping?.line ? <p>{order.shipping.line}</p> : null}
              </DetailBlock>
            </div>
          </div>

          {isThankYou ? (
            footer ? <div className="mt-10">{footer}</div> : null
          ) : actions || footer ? (
            <div className="mt-10 space-y-6">
              {actions}
              {footer}
            </div>
          ) : null}
        </section>

        <aside className="border-t border-elova-border bg-elova-cream-deep px-4 py-10 sm:px-8 lg:border-l lg:border-t-0 lg:px-8 lg:py-14">
          <div className="lg:sticky lg:top-24">
            <ul className="space-y-5">
            {order.items.map((item, index) => (
              <li
                key={`${order.id}-${item.productId ?? item.name}-${index}`}
                className="flex items-start gap-3"
              >
                <div className="relative shrink-0 pr-1.5 pt-1.5">
                  <div className="relative size-16 overflow-hidden rounded-lg border border-elova-border bg-elova-cream sm:size-[4.5rem]">
                    {item.image ? (
                      item.slug ? (
                        <Link href={getProductHref(item.slug)} className="absolute inset-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="72px"
                            className="object-cover"
                          />
                        </Link>
                      ) : (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="72px"
                          className="object-cover"
                        />
                      )
                    ) : (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(160deg,var(--elova-cream)_0%,var(--elova-cream-deep)_100%)]"
                      />
                    )}
                  </div>
                  <span className="absolute right-0 top-0 flex min-w-5 items-center justify-center rounded-full bg-elova-black px-1.5 py-0.5 text-[0.65rem] text-elova-white">
                    {item.quantity}
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-sm leading-snug text-text-primary">{item.name}</p>
                  {item.sizeLabel ? (
                    <p className="mt-1 text-xs text-text-secondary">{item.sizeLabel}</p>
                  ) : null}
                </div>
                <p className="shrink-0 pt-0.5 text-sm text-text-primary">
                  {formatPrice(item.unitPrice * item.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-3 border-t border-elova-border pt-5 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-text-secondary">
                Subtotal · {itemCount} {itemCount === 1 ? "artículo" : "artículos"}
              </span>
              <span className="text-text-primary">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-text-secondary">Envío</span>
              <span className="text-text-primary">{formatPrice(order.shippingAmount)}</span>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-elova-border pt-4">
              <span className="text-base text-text-primary">Total</span>
              <p className="text-right">
                <span className="mr-2 text-xs uppercase tracking-[0.14em] text-text-secondary">
                  {order.currency}
                </span>
                <span className="text-xl font-medium text-text-primary">
                  {formatPrice(order.total)}
                </span>
              </p>
            </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function headingForPhase(
  phase: OrderConfirmationPhase,
  status: string,
  firstName: string,
): string {
  if (phase === "summary") {
    return status === "cancelled" ? "Pedido cancelado" : "Pedido confirmado";
  }

  if (phase === "notified" || phase === "paid") {
    return "¡Gracias por confirmar!";
  }

  return firstName ? `¡Gracias, ${firstName}!` : "¡Gracias!";
}

function cardTitle(phase: OrderConfirmationPhase, status: string): string {
  if (phase === "summary") {
    return status === "cancelled" ? "Pedido cancelado" : "Pedido confirmado";
  }

  if (status === "paid" || phase === "paid" || phase === "notified") {
    return "Agradecemos tu confianza";
  }

  return "Tu pedido está confirmado";
}

function cardCopy(phase: OrderConfirmationPhase, status: string): string {
  if (phase === "summary") {
    switch (status) {
      case "processing":
        return "El pedido está en proceso de envío.";
      case "shipped":
        return "El pedido ya fue enviado.";
      case "delivered":
        return "El pedido fue entregado.";
      case "cancelled":
        return "Este pedido está cancelado.";
      default:
        return "El pago está confirmado. Aquí tienes el resumen de tu pedido.";
    }
  }

  if (status === "paid" || phase === "paid") {
    return "El pedido quedó marcado como pagado. Te avisamos cuando pase a envío.";
  }

  if (phase === "notified") {
    return "Recibimos tu aviso de pago. Validamos Yape, Plin o la transferencia y te confirmamos antes de despachar.";
  }

  return "El pedido quedó registrado. Paga el monto exacto y envía el comprobante para que lo validemos.";
}

function DetailBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <h3 className="text-sm font-medium text-text-primary">{title}</h3>
      <div className="mt-2 space-y-1 text-sm leading-relaxed text-text-secondary">
        {children}
      </div>
    </div>
  );
}
