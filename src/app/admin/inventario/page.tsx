import { createPageMetadata } from "@/lib/seo";
import { adminErrorMessage, firstSearchParam } from "@/lib/admin";
import {
  accessFromError,
  getAdminInventory,
  getAdminPageAccess,
} from "@/services/admin.service";
import { AdminGate } from "@/views/admin/AdminGate";
import { AdminInventoryView } from "@/views/admin/AdminInventoryView";
import type { AdminInventoryItem } from "@/types/admin";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Inventario",
  description: "Gestión interna de inventario.",
  path: "/admin/inventario",
  noIndex: true,
});

type AdminInventoryPageProps = {
  searchParams: Promise<{
    error?: string | string[];
    ok?: string | string[];
    alerta?: string | string[];
    q?: string | string[];
  }>;
};

export default async function AdminInventoryPage({
  searchParams,
}: AdminInventoryPageProps) {
  const params = await searchParams;
  const { access: initialAccess } = await getAdminPageAccess();
  let access = initialAccess;
  let items: AdminInventoryItem[] = [];

  if (access === "ok") {
    try {
      items = await getAdminInventory();
    } catch (error) {
      access = accessFromError(error);
    }
  }

  if (access !== "ok") {
    return (
      <AdminGate
        access={access}
        next="/admin/inventario"
        error={adminErrorMessage(firstSearchParam(params.error))}
      />
    );
  }

  return (
    <AdminInventoryView
      items={items}
      initialAlert={firstSearchParam(params.alerta) === "1"}
      initialQuery={firstSearchParam(params.q)}
      notice={
        firstSearchParam(params.ok) === "1" ? "Stock actualizado." : null
      }
      error={adminErrorMessage(firstSearchParam(params.error))}
    />
  );
}
