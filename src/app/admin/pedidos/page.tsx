import { createPageMetadata } from "@/lib/seo";
import { getAccountEmail } from "@/services/order.service";
import { getAdminOrders } from "@/services/admin-order.service";
import { AdminOrdersView } from "@/views/admin/AdminOrdersView";

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
    sent?: string | string[];
  }>;
};

function firstParam(value?: string | string[]): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

function errorMessage(code: string): string | null {
  if (code === "admin") {
    return "Este correo no puede actualizar pedidos.";
  }

  if (code === "stock") {
    return "No hay stock suficiente para marcar este pedido como pagado.";
  }

  if (code === "missing") {
    return "No encontramos ese pedido.";
  }

  if (code === "transition") {
    return "Ese cambio de estado no está permitido.";
  }

  if (code === "setup") {
    return "Falta ejecutar supabase/migrations/20260820140000_admin_orders.sql.";
  }

  if (code === "update") {
    return "No se pudo actualizar el pedido.";
  }

  if (code === "invalid") {
    return "Ese correo no es válido.";
  }

  if (code === "smtp") {
    return "Con el SMTP de prueba, el enlace solo llega al correo de tu cuenta de Supabase.";
  }

  if (code === "wait") {
    return "Espera un minuto antes de pedir otro enlace.";
  }

  if (code === "quota") {
    return "El SMTP de prueba de Supabase solo deja 2 correos por hora.";
  }

  if (code === "enlace") {
    return "El enlace no es válido o ya se usó.";
  }

  if (code === "send") {
    return "No se pudo enviar el enlace. Inténtalo de nuevo.";
  }

  return null;
}

export default async function AdminOrdersPage({ searchParams }: AdminOrdersPageProps) {
  const params = await searchParams;
  const email = await getAccountEmail();
  let orders: Awaited<ReturnType<typeof getAdminOrders>> = [];
  let access: "ok" | "signed-out" | "forbidden" | "setup" = "ok";

  if (!email) {
    access = "signed-out";
  } else {
    try {
      orders = await getAdminOrders();
    } catch (error) {
      const message = error instanceof Error ? error.message : "";

      if (/not_admin/i.test(message)) {
        access = "forbidden";
      } else if (/aún no está activa/i.test(message)) {
        access = "setup";
      } else if (/not_authenticated/i.test(message)) {
        access = "signed-out";
      } else {
        access = "forbidden";
      }
    }
  }

  return (
    <AdminOrdersView
      email={email}
      orders={orders}
      access={access}
      notice={
        firstParam(params.ok) === "1"
          ? "Estado actualizado. El cliente lo ve en Cuenta."
          : firstParam(params.sent) === "1"
            ? "Si el correo es de la tienda, te enviamos un enlace para entrar. Revisa también no deseados."
            : null
      }
      error={errorMessage(firstParam(params.error))}
    />
  );
}
