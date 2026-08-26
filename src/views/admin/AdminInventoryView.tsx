"use client";

import { useMemo, useState } from "react";

import { SubmitButton } from "@/components/account/SubmitButton";
import { formatPrice, normalizeSearch } from "@/lib/utils";
import { setAdminStockAction } from "@/services/admin.actions";
import type { AdminInventoryItem } from "@/types/admin";

type AdminInventoryViewProps = {
  items: AdminInventoryItem[];
  notice: string | null;
  error: string | null;
  initialAlert: boolean;
  initialQuery: string;
};

function typeLabel(type: string): string {
  if (type === "decant") {
    return "Decant";
  }

  if (type === "set") {
    return "Set";
  }

  return "Perfume";
}

export function AdminInventoryView({
  items,
  notice,
  error,
  initialAlert,
  initialQuery,
}: AdminInventoryViewProps) {
  const [query, setQuery] = useState(initialQuery);
  const [lowOnly, setLowOnly] = useState(initialAlert);

  const filtered = useMemo(() => {
    const needle = normalizeSearch(query);

    return items.filter((item) => {
      if (lowOnly && item.stock > 3) {
        return false;
      }

      if (!needle) {
        return true;
      }

      return normalizeSearch(
        [item.name, item.brand, item.label, item.slug].join(" "),
      ).includes(needle);
    });
  }, [items, lowOnly, query]);

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-text-secondary">Catálogo</p>
      <h1 className="mt-3 font-serif text-3xl tracking-[0.04em] text-text-primary">
        Inventario
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
        Stock real de cada presentación. Al marcar un pedido como pagado, se descuenta solo.
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

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <label className="inline-flex items-center gap-2 text-sm text-text-primary">
          <input
            type="checkbox"
            checked={lowOnly}
            onChange={(event) => setLowOnly(event.target.checked)}
            className="size-4 accent-black"
          />
          Solo stock bajo (3 o menos)
        </label>
        <label className="block w-full max-w-sm text-[0.65rem] uppercase tracking-[0.14em] text-text-secondary">
          Buscar
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Producto, marca o tamaño"
            className="mt-2 h-11 w-full border border-elova-border bg-white px-4 text-sm text-text-primary placeholder:text-text-secondary/70 focus:border-elova-black focus:outline-none"
          />
        </label>
      </div>

      <p className="mt-4 text-xs uppercase tracking-[0.14em] text-text-secondary">
        {filtered.length} de {items.length}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-text-secondary">
          {items.length === 0
            ? "Aún no hay productos en inventario."
            : "Ningún producto coincide con el filtro."}
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto border border-elova-border bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-elova-border text-[0.65rem] uppercase tracking-[0.14em] text-text-secondary">
              <tr>
                <th className="px-4 py-3 font-medium">Producto</th>
                <th className="px-4 py-3 font-medium">Presentación</th>
                <th className="px-4 py-3 font-medium">Precio</th>
                <th className="px-4 py-3 font-medium">Stock</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr
                  key={`${item.productId}-${item.variantId ?? "product"}`}
                  className="border-b border-elova-border last:border-b-0"
                >
                  <td className="px-4 py-4 align-top">
                    <p className="text-text-primary">{item.name}</p>
                    <p className="mt-1 text-[0.7rem] uppercase tracking-[0.12em] text-text-secondary">
                      {item.brand} · {typeLabel(item.type)}
                      {item.published ? "" : " · Oculto"}
                    </p>
                  </td>
                  <td className="px-4 py-4 align-top text-text-secondary">{item.label}</td>
                  <td className="px-4 py-4 align-top text-text-primary">
                    {formatPrice(item.price)}
                  </td>
                  <td className="px-4 py-4 align-top">
                    <form action={setAdminStockAction} className="flex items-center gap-2">
                      <input type="hidden" name="productId" value={item.productId} />
                      <input type="hidden" name="variantId" value={item.variantId ?? ""} />
                      <input type="hidden" name="next" value="/admin/inventario" />
                      <input
                        type="number"
                        name="stock"
                        min={0}
                        step={1}
                        defaultValue={item.stock}
                        aria-label={`Stock de ${item.name} ${item.label}`}
                        className={
                          item.stock === 0
                            ? "h-11 w-20 border border-red-300 bg-red-50 px-3 text-sm text-red-800 focus:border-elova-black focus:outline-none"
                            : item.stock <= 3
                              ? "h-11 w-20 border border-amber-300 bg-amber-50 px-3 text-sm text-amber-900 focus:border-elova-black focus:outline-none"
                              : "h-11 w-20 border border-elova-border bg-white px-3 text-sm text-text-primary focus:border-elova-black focus:outline-none"
                        }
                      />
                      <SubmitButton pendingLabel="…" variant="outline" size="sm">
                        Guardar
                      </SubmitButton>
                    </form>
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
