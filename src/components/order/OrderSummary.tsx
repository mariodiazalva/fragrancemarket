import { formatPrice } from "@/lib/utils";
import { formatShippingAddress } from "@/lib/shipping";
import { orderStatusLabel, type OrderPaymentSummary } from "@/types/order";

type OrderSummaryProps = {
  order: OrderPaymentSummary;
};

export function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <div className="border border-elova-border bg-surface p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-[0.7rem] uppercase tracking-[0.16em] text-text-secondary">
          Estado
        </p>
        <p className="text-sm text-text-primary">{orderStatusLabel(order.status)}</p>
      </div>

      <ul className="mt-5 space-y-3">
        {order.items.map((item, index) => (
          <li key={`${order.id}-${index}`} className="flex justify-between gap-3 text-sm">
            <span className="min-w-0 text-text-primary">
              {item.name}
              <span className="mt-1 block text-[0.7rem] uppercase tracking-[0.12em] text-text-secondary">
                {item.quantity} × {formatPrice(item.unitPrice)}
              </span>
            </span>
            <span className="shrink-0 text-text-secondary">
              {formatPrice(item.unitPrice * item.quantity)}
            </span>
          </li>
        ))}
        <li className="flex justify-between text-sm">
          <span className="uppercase tracking-[0.14em] text-text-secondary">Envío</span>
          <span className="text-text-secondary">{formatPrice(order.shippingAmount)}</span>
        </li>
        <li className="flex justify-between border-t border-elova-border pt-4 text-sm">
          <span className="uppercase tracking-[0.14em] text-text-secondary">Total</span>
          <span className="text-text-primary">{formatPrice(order.total)}</span>
        </li>
      </ul>

      {order.shipping ? (
        <p className="mt-5 text-sm leading-relaxed text-text-secondary">
          Envío por Shalom a {formatShippingAddress(order.shipping)}
        </p>
      ) : null}

      <p className="mt-5 break-all text-sm text-text-primary">
        Referencia: {order.id}
      </p>
    </div>
  );
}
