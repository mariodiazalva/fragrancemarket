"use client";

import { useMemo, useState } from "react";

import { SubmitButton } from "@/components/account/SubmitButton";
import { formatBillingAddress, formatShippingAddress } from "@/lib/shipping";
import { formatAdminDate } from "@/lib/admin";
import { formatPrice, normalizeSearch } from "@/lib/utils";
import { deleteAdminOrderAction, setAdminOrderStatusAction } from "@/services/admin.actions";
import {
  nextOrderStatusActions,
  type AdminOrder,
} from "@/types/order";
import { AdminDeleteForm } from "@/views/admin/AdminDeleteForm";
import { AdminStatusBadge } from "@/views/admin/AdminStatusBadge";

const STATUS_FILTERS = [
  { id: "", label: "Todos" },
  { id: "pending", label: "Por cobrar" },
  { id: "toship", label: "Por enviar" },
  { id: "paid", label: "Pagados" },
  { id: "processing", label: "En envío" },
  { id: "shipped", label: "Enviados" },
  { id: "delivered", label: "Entregados" },
  { id: "cancelled", label: "Cancelados" },
] as const;

type AdminOrdersViewProps = {
  orders: AdminOrder[];
  notice: string | null;
  error: string | null;
  initialStatus: string;
  initialQuery: string;
};

export function AdminOrdersView({
  orders,
  notice,
  error,
  initialStatus,
  initialQuery,
}: AdminOrdersViewProps) {
  const [status, setStatus] = useState(initialStatus);
  const [query, setQuery] = useState(initialQuery);
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const needle = normalizeSearch(query);

    return orders.filter((order) => {
      if (status === "toship") {
        if (order.status !== "paid" && order.status !== "processing") {
          return false;
        }
      } else if (status && order.status !== status) {
        return false;
      }

      if (!needle) {
        return true;
      }

      const haystack = normalizeSearch(
        [
          order.customer?.fullName,
          order.customer?.email,
          order.customer?.phone,
          order.id,
          order.notes,
          ...order.items.map((item) => item.name),
        ]
          .filter(Boolean)
          .join(" "),
      );

      return haystack.includes(needle);
    });
  }, [orders, query, status]);

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-text-secondary">Operación</p>
      <h1 className="mt-3 font-serif text-3xl tracking-[0.04em] text-text-primary">
        Pedidos
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
        Confirma el Yape o la transferencia, descuenta stock y pasa el pedido a envío.
      </p>

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

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.id || "all"}
              type="button"
              onClick={() => setStatus(filter.id)}
              className={
                status === filter.id
                  ? "border border-elova-black bg-elova-black px-3 py-2 text-[0.65rem] uppercase tracking-[0.14em] text-white"
                  : "border border-elova-border bg-white px-3 py-2 text-[0.65rem] uppercase tracking-[0.14em] text-text-secondary hover:border-elova-black hover:text-text-primary"
              }
            >
              {filter.label}
            </button>
          ))}
        </div>
        <label className="block w-full max-w-sm text-[0.65rem] uppercase tracking-[0.14em] text-text-secondary">
          Buscar
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Nombre, correo o producto"
            className="mt-2 h-11 w-full border border-elova-border bg-white px-4 text-sm text-text-primary placeholder:text-text-secondary/70 focus:border-elova-black focus:outline-none"
          />
        </label>
      </div>

      <p className="mt-4 text-xs uppercase tracking-[0.14em] text-text-secondary">
        {filtered.length} de {orders.length}
      </p>

      {orders.length === 0 ? (
        <p className="mt-8 text-sm text-text-secondary">Aún no hay pedidos.</p>
      ) : filtered.length === 0 ? (
        <p className="mt-8 text-sm text-text-secondary">Ningún pedido coincide con el filtro.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {filtered.map((order) => (
            <AdminOrderRow
              key={order.id}
              order={order}
              open={openId === order.id}
              onToggle={() => setOpenId((current) => (current === order.id ? null : order.id))}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function AdminOrderRow({
  order,
  open,
  onToggle,
}: {
  order: AdminOrder;
  open: boolean;
  onToggle: () => void;
}) {
  const actions = nextOrderStatusActions(order.status);
  const detailsId = `pedido-${order.id}`;

  return (
    <li className="border border-elova-border bg-white">
      <div className="flex items-stretch">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={detailsId}
          className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-3 px-5 py-4 text-left"
        >
          <div className="min-w-0">
            <p className="truncate text-sm text-text-primary">
              {order.customer?.fullName || order.customer?.email || "Cliente"}
            </p>
            <p className="mt-1 text-[0.7rem] uppercase tracking-[0.12em] text-text-secondary">
              {formatAdminDate(order.createdAt, true)}
              {order.customer?.phone ? ` · ${order.customer.phone}` : ""}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <AdminStatusBadge status={order.status} />
            <p className="text-sm text-text-primary">{formatPrice(order.total)}</p>
          </div>
        </button>
        <div className="flex items-center border-l border-elova-border px-3">
          <AdminDeleteForm
            action={deleteAdminOrderAction}
            confirmMessage="¿Eliminar este pedido? Si ya estaba pagado, el stock vuelve al inventario."
            fields={{ orderId: order.id, next: "/admin/pedidos" }}
          />
        </div>
      </div>

      {open ? (
        <div id={detailsId} className="border-t border-elova-border px-5 py-5">
          {order.customer?.email ? (
            <p className="text-sm text-text-secondary">{order.customer.email}</p>
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
                  <input type="hidden" name="next" value="/admin/pedidos" />
                  <SubmitButton pendingLabel="Guardando…" variant={action.variant} size="sm">
                    {action.label}
                  </SubmitButton>
                </form>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}
