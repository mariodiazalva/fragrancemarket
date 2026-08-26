import { createPageMetadata } from "@/lib/seo";
import { adminErrorMessage, firstSearchParam } from "@/lib/admin";
import {
  accessFromError,
  getAdminDashboard,
  getAdminPageAccess,
} from "@/services/admin.service";
import { AdminDashboardView } from "@/views/admin/AdminDashboardView";
import { AdminGate } from "@/views/admin/AdminGate";
import type { AdminDashboard } from "@/types/admin";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Intranet",
  description: "Gestión interna de la tienda.",
  path: "/admin",
  noIndex: true,
});

const emptyDashboard: AdminDashboard = {
  counts: {
    orders: 0,
    customers: 0,
    pending: 0,
    paid: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    toShip: 0,
    lowStock: 0,
  },
  totals: { pending: 0, revenue: 0 },
  recentOrders: [],
};

type AdminHomePageProps = {
  searchParams: Promise<{
    error?: string | string[];
    ok?: string | string[];
  }>;
};

export default async function AdminHomePage({ searchParams }: AdminHomePageProps) {
  const params = await searchParams;
  const { access: initialAccess } = await getAdminPageAccess();
  let access = initialAccess;
  let dashboard = emptyDashboard;

  if (access === "ok") {
    try {
      dashboard = await getAdminDashboard();
    } catch (error) {
      access = accessFromError(error);
    }
  }

  if (access !== "ok") {
    return (
      <AdminGate
        access={access}
        next="/admin"
        error={adminErrorMessage(firstSearchParam(params.error))}
      />
    );
  }

  return (
    <AdminDashboardView
      dashboard={dashboard}
      notice={
        firstSearchParam(params.ok) === "1" ? "Cambio guardado." : null
      }
      error={adminErrorMessage(firstSearchParam(params.error))}
    />
  );
}
