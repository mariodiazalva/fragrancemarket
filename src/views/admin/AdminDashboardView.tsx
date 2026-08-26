import Link from "next/link";

import { formatAdminDate } from "@/lib/admin";
import { formatPrice } from "@/lib/utils";
import type { AdminDashboard } from "@/types/admin";
import { AdminStatusBadge } from "@/views/admin/AdminStatusBadge";

type AdminDashboardViewProps = {
  dashboard: AdminDashboard;
  notice: string | null;
  error: string | null;
};

export function AdminDashboardView({
  dashboard,
  notice,
  error,
}: AdminDashboardViewProps) {
  const { counts, totals, recentOrders } = dashboard;

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-text-secondary">Intranet</p>
      <h1 className="mt-3 font-serif text-3xl tracking-[0.04em] text-text-primary">
        Resumen
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
        Pedidos, clientes e inventario de la tienda, en un solo lugar.
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

      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Por cobrar"
          value={String(counts.pending)}
          hint={formatPrice(totals.pending)}
          href="/admin/pedidos?estado=pending"
        />
        <StatCard
          label="Por enviar"
          value={String(counts.toShip)}
          hint={`${counts.paid} pagados · ${counts.processing} en proceso`}
          href="/admin/pedidos?estado=toship"
        />
        <StatCard
          label="Clientes"
          value={String(counts.customers)}
          hint={`${counts.orders} pedidos en total`}
          href="/admin/clientes"
        />
        <StatCard
          label="Stock bajo"
          value={String(counts.lowStock)}
          hint={`Cobrados ${formatPrice(totals.revenue)}`}
          href="/admin/inventario?alerta=1"
        />
      </div>

      <section className="mt-10 border border-elova-border bg-white">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-elova-border px-5 py-4">
          <div>
            <h2 className="font-serif text-xl text-text-primary">Pedidos recientes</h2>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-text-secondary">
              Los últimos movimientos
            </p>
          </div>
          <Link
            href="/admin/pedidos"
            className="text-xs uppercase tracking-[0.14em] text-text-primary underline-offset-4 hover:underline"
          >
            Ver todos
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="px-5 py-8 text-sm text-text-secondary">Aún no hay pedidos.</p>
        ) : (
          <ul className="divide-y divide-elova-border">
            {recentOrders.map((order) => (
              <li key={order.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm text-text-primary">
                    {order.customer?.fullName || order.customer?.email || "Cliente"}
                  </p>
                  <p className="mt-1 text-[0.7rem] uppercase tracking-[0.12em] text-text-secondary">
                    {formatAdminDate(order.createdAt, true)}
                    {order.itemCount > 0 ? ` · ${order.itemCount} ítems` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <AdminStatusBadge status={order.status} />
                  <p className="text-sm text-text-primary">{formatPrice(order.total)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  href,
}: {
  label: string;
  value: string;
  hint: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="border border-elova-border bg-white px-5 py-4 transition-colors hover:border-elova-black"
    >
      <p className="text-[0.65rem] uppercase tracking-[0.16em] text-text-secondary">{label}</p>
      <p className="mt-3 font-serif text-3xl text-text-primary">{value}</p>
      <p className="mt-2 text-xs text-text-secondary">{hint}</p>
    </Link>
  );
}
