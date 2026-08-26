import { ButtonLink } from "@/components/ui/Button";
import { SubmitButton } from "@/components/account/SubmitButton";
import { Container } from "@/components/ui/Container";
import { formatBillingAddress, formatShippingAddress } from "@/lib/shipping";
import { formatPrice } from "@/lib/utils";
import { setAdminOrderStatusAction } from "@/services/admin-order.actions";
import {
  nextOrderStatusActions,
  orderStatusLabel,
  type AdminOrder,
} from "@/types/order";

type AdminOrdersViewProps = {
  email: string | null;
  orders: AdminOrder[];
  access: "ok" | "signed-out" | "forbidden" | "setup";
  notice: string | null;
  error: string | null;
};

function formatOrderDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function accessMessage(access: AdminOrdersViewProps["access"]): string {
  if (access === "signed-out") {
    return "Entra en Cuenta con el correo de la tienda para ver y actualizar pedidos.";
  }

  if (access === "setup") {
    return "Falta ejecutar supabase/migrations/20260820140000_admin_orders.sql en el SQL Editor.";
  }

  return "Este correo no administra pedidos. Agrégalo en store_admins con seed-store-admin.sql.";
}

export function AdminOrdersView({
  email,
  orders,
  access,
  notice,
  error,
}: AdminOrdersViewProps) {
  return (
    <main className="flex-1 pb-16 pt-8 sm:pt-12">
      <Container>
        <p className="text-xs uppercase tracking-[0.35em] text-elova-gold">Tienda</p>
        <h1 className="mt-4 font-serif text-[2rem] tracking-[0.04em] text-text-primary sm:text-4xl">
          Pedidos
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary">
          Cuando confirmes el Yape o la transferencia, marca el pedido como pagado.
          Eso descuenta stock. Luego puedes pasarlo a envío.
        </p>

        {email ? (
          <p className="mt-6 text-sm text-text-primary">{email}</p>
        ) : null}

        {notice ? (
          <p className="mt-6 text-sm text-text-secondary" role="status">
            {notice}
          </p>
        ) : null}

        {error ? (
          <p className="mt-6 text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        {access !== "ok" ? (
          <div className="mt-10">
            <p className="text-sm leading-relaxed text-text-secondary">
              {accessMessage(access)}
            </p>
            <div className="mt-6">
              <ButtonLink href="/cuenta" variant="outline">
                Ir a cuenta
              </ButtonLink>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <p className="mt-10 text-sm text-text-secondary">Aún no hay pedidos.</p>
        ) : (
          <ul className="mt-10 space-y-5">
            {orders.map((order) => (
              <AdminOrderCard key={order.id} order={order} />
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
}

function AdminOrderCard({ order }: { order: AdminOrder }) {
  const actions = nextOrderStatusActions(order.status);

  return (
    <li className="border border-elova-border bg-surface p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-sm text-text-primary">
          {orderStatusLabel(order.status)}
          {order.createdAt ? (
            <span className="mt-1 block text-[0.7rem] uppercase tracking-[0.12em] text-text-secondary">
              {formatOrderDate(order.createdAt)}
            </span>
          ) : null}
        </p>
        <p className="text-sm text-text-primary">{formatPrice(order.total)}</p>
      </div>

      {order.customer ? (
        <p className="mt-4 text-sm leading-relaxed text-text-secondary">
          {order.customer.fullName || "Cliente"}
          {order.customer.email ? ` · ${order.customer.email}` : ""}
          {order.customer.phone ? ` · ${order.customer.phone}` : ""}
        </p>
      ) : null}

      {order.shipping ? (
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Envío: {formatShippingAddress(order.shipping)}
        </p>
      ) : null}

      {order.billing ? (
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Facturación: {formatBillingAddress(order.billing)}
        </p>
      ) : null}

      <ul className="mt-4 space-y-2">
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
      </ul>

      {order.notes ? (
        <p className="mt-4 text-sm leading-relaxed text-text-secondary">
          Notas: {order.notes}
        </p>
      ) : null}

      <p className="mt-4 break-all text-[0.7rem] uppercase tracking-[0.12em] text-text-secondary">
        {order.id}
      </p>

      {actions.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-3">
          {actions.map((action) => (
            <form key={action.status} action={setAdminOrderStatusAction}>
              <input type="hidden" name="orderId" value={order.id} />
              <input type="hidden" name="status" value={action.status} />
              <SubmitButton pendingLabel="Guardando…" variant={action.variant} size="sm">
                {action.label}
              </SubmitButton>
            </form>
          ))}
        </div>
      ) : null}
    </li>
  );
}
