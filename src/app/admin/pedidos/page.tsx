import { createPageMetadata } from "@/lib/seo";
import { adminErrorMessage, firstSearchParam } from "@/lib/admin";
import {
  accessFromError,
  getAdminOrders,
  getAdminPageAccess,
} from "@/services/admin.service";
import { AdminGate } from "@/views/admin/AdminGate";
import { AdminOrdersView } from "@/views/admin/AdminOrdersView";
import type { AdminOrder } from "@/types/order";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Pedidos",
  description: "Gestión interna de pedidos.",
  path: "/admin/pedidos",
  noIndex: true,
});

type AdminOrdersPageProps = {
  searchParams: Promise<{
    error?: string | string[];
    ok?: string | string[];
    estado?: string | string[];
    q?: string | string[];
  }>;
};

export default async function AdminOrdersPage({ searchParams }: AdminOrdersPageProps) {
  const params = await searchParams;
  const { access: initialAccess } = await getAdminPageAccess();
  let access = initialAccess;
  let orders: AdminOrder[] = [];

  if (access === "ok") {
    try {
      orders = await getAdminOrders();
    } catch (error) {
      access = accessFromError(error);
    }
  }

  if (access !== "ok") {
    return (
      <AdminGate
        access={access}
        next="/admin/pedidos"
        error={adminErrorMessage(firstSearchParam(params.error))}
      />
    );
  }

  return (
    <AdminOrdersView
      orders={orders}
      initialStatus={firstSearchParam(params.estado)}
      initialQuery={firstSearchParam(params.q)}
      notice={
        firstSearchParam(params.ok) === "1"
          ? "Estado actualizado. El cliente lo ve en Cuenta."
          : firstSearchParam(params.ok) === "deleted"
            ? "Pedido eliminado."
            : null
      }
      error={adminErrorMessage(firstSearchParam(params.error))}
    />
  );
}
