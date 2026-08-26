import { createPageMetadata } from "@/lib/seo";
import { adminErrorMessage, firstSearchParam } from "@/lib/admin";
import {
  accessFromError,
  getAdminCustomers,
  getAdminPageAccess,
} from "@/services/admin.service";
import { AdminCustomersView } from "@/views/admin/AdminCustomersView";
import { AdminGate } from "@/views/admin/AdminGate";
import type { AdminCustomer } from "@/types/admin";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Clientes",
  description: "Gestión interna de clientes.",
  path: "/admin/clientes",
  noIndex: true,
});

type AdminCustomersPageProps = {
  searchParams: Promise<{
    error?: string | string[];
    ok?: string | string[];
    q?: string | string[];
  }>;
};

export default async function AdminCustomersPage({
  searchParams,
}: AdminCustomersPageProps) {
  const params = await searchParams;
  const { access: initialAccess } = await getAdminPageAccess();
  let access = initialAccess;
  let customers: AdminCustomer[] = [];

  if (access === "ok") {
    try {
      customers = await getAdminCustomers();
    } catch (error) {
      access = accessFromError(error);
    }
  }

  if (access !== "ok") {
    return (
      <AdminGate
        access={access}
        next="/admin/clientes"
        error={adminErrorMessage(firstSearchParam(params.error))}
      />
    );
  }

  return (
    <AdminCustomersView
      customers={customers}
      initialQuery={firstSearchParam(params.q)}
      notice={
        firstSearchParam(params.ok) === "deleted"
          ? "Cliente eliminado. Si tenía pedidos, también se borraron."
          : null
      }
      error={adminErrorMessage(firstSearchParam(params.error))}
    />
  );
}
