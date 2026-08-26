"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { formatAdminDate } from "@/lib/admin";
import { formatPrice, normalizeSearch } from "@/lib/utils";
import { deleteAdminCustomerAction } from "@/services/admin.actions";
import type { AdminCustomer } from "@/types/admin";
import { AdminDeleteForm } from "@/views/admin/AdminDeleteForm";
import { AdminStatusBadge } from "@/views/admin/AdminStatusBadge";

type AdminCustomersViewProps = {
  customers: AdminCustomer[];
  initialQuery: string;
  notice: string | null;
  error: string | null;
};

export function AdminCustomersView({
  customers,
  initialQuery,
  notice,
  error,
}: AdminCustomersViewProps) {
  const [query, setQuery] = useState(initialQuery);

  const filtered = useMemo(() => {
    const needle = normalizeSearch(query);

    if (!needle) {
      return customers;
    }

    return customers.filter((customer) =>
      normalizeSearch(
        [customer.fullName, customer.email, customer.phone].filter(Boolean).join(" "),
      ).includes(needle),
    );
  }, [customers, query]);

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-text-secondary">Agenda</p>
      <h1 className="mt-3 font-serif text-3xl tracking-[0.04em] text-text-primary">
        Clientes
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
        Compradores registrados con sus pedidos y el último estado.
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

      <label className="mt-8 block w-full max-w-sm text-[0.65rem] uppercase tracking-[0.14em] text-text-secondary">
        Buscar
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Nombre, correo o teléfono"
          className="mt-2 h-11 w-full border border-elova-border bg-white px-4 text-sm text-text-primary placeholder:text-text-secondary/70 focus:border-elova-black focus:outline-none"
        />
      </label>

      <p className="mt-4 text-xs uppercase tracking-[0.14em] text-text-secondary">
        {filtered.length} de {customers.length}
      </p>

      {customers.length === 0 ? (
        <p className="mt-8 text-sm text-text-secondary">Aún no hay clientes.</p>
      ) : filtered.length === 0 ? (
        <p className="mt-8 text-sm text-text-secondary">Ningún cliente coincide con la búsqueda.</p>
      ) : (
        <div className="mt-6 overflow-x-auto border border-elova-border bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-elova-border text-[0.65rem] uppercase tracking-[0.14em] text-text-secondary">
              <tr>
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium">Contacto</th>
                <th className="px-4 py-3 font-medium">Pedidos</th>
                <th className="px-4 py-3 font-medium">Cobrado</th>
                <th className="px-4 py-3 font-medium">Último</th>
                <th className="px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                <tr key={customer.id} className="border-b border-elova-border last:border-b-0">
                  <td className="px-4 py-4 align-top">
                    <p className="text-text-primary">{customer.fullName || "Sin nombre"}</p>
                    <p className="mt-1 text-[0.7rem] uppercase tracking-[0.12em] text-text-secondary">
                      Desde {formatAdminDate(customer.createdAt) || "—"}
                    </p>
                  </td>
                  <td className="px-4 py-4 align-top text-text-secondary">
                    <p>{customer.email}</p>
                    {customer.phone ? <p className="mt-1">{customer.phone}</p> : null}
                  </td>
                  <td className="px-4 py-4 align-top">
                    <Link
                      href={`/admin/pedidos?q=${encodeURIComponent(customer.email)}`}
                      className="text-text-primary underline-offset-4 hover:underline"
                    >
                      {customer.orderCount}
                    </Link>
                  </td>
                  <td className="px-4 py-4 align-top text-text-primary">
                    {formatPrice(customer.totalSpent)}
                  </td>
                  <td className="px-4 py-4 align-top">
                    {customer.lastStatus ? (
                      <div className="space-y-2">
                        <AdminStatusBadge status={customer.lastStatus} />
                        <p className="text-[0.7rem] uppercase tracking-[0.12em] text-text-secondary">
                          {formatAdminDate(customer.lastOrderAt, true)}
                        </p>
                      </div>
                    ) : (
                      <span className="text-text-secondary">Sin pedidos</span>
                    )}
                  </td>
                  <td className="px-4 py-4 align-top">
                    <AdminDeleteForm
                      action={deleteAdminCustomerAction}
                      confirmMessage={
                        customer.orderCount > 0
                          ? `¿Eliminar a ${customer.fullName || customer.email}? También se borrarán ${customer.orderCount} pedido(s).`
                          : `¿Eliminar a ${customer.fullName || customer.email}?`
                      }
                      fields={{ customerId: customer.id, next: "/admin/clientes" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
