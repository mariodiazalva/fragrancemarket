export const ADMIN_PATHS = [
  "/admin",
  "/admin/pedidos",
  "/admin/clientes",
  "/admin/inventario",
] as const;

export type AdminPath = (typeof ADMIN_PATHS)[number];

export type AdminAccess = "ok" | "signed-out" | "forbidden" | "setup";

export type AdminNavItem = {
  href: AdminPath;
  label: string;
};

export const adminNavigation: AdminNavItem[] = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/pedidos", label: "Pedidos" },
  { href: "/admin/clientes", label: "Clientes" },
  { href: "/admin/inventario", label: "Inventario" },
];

export function isAdminPath(value: string): value is AdminPath {
  return (ADMIN_PATHS as readonly string[]).includes(value);
}

export function safeAdminPath(value: string): AdminPath {
  return isAdminPath(value) ? value : "/admin";
}

export function isAdminRoute(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function formatAdminDate(value: string, withTime = false): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "America/Lima",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((part) => part.type === type)?.value ?? "";

  const formatted = `${get("day")}/${get("month")}/${get("year")}`;

  if (!withTime) {
    return formatted;
  }

  return `${formatted} ${get("hour")}:${get("minute")}`;
}

export function firstSearchParam(value?: string | string[]): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export function adminAccessMessage(access: AdminAccess): string {
  if (access === "signed-out") {
    return "Entra con tu usuario y contraseña de administrador para ver pedidos, clientes e inventario.";
  }

  if (access === "setup") {
    return "Falta ejecutar supabase/migrations/20260826150000_admin_intranet.sql en el SQL Editor.";
  }

  return "Este correo no tiene acceso al intranet de la tienda.";
}

export function adminErrorMessage(code: string): string | null {
  if (code === "admin") {
    return "Este correo no tiene acceso al intranet.";
  }

  if (code === "stock") {
    return "No hay stock suficiente para marcar este pedido como pagado.";
  }

  if (code === "missing") {
    return "No encontramos ese pedido o cliente.";
  }

  if (code === "transition") {
    return "Ese cambio de estado no está permitido.";
  }

  if (code === "setup") {
    return "Falta ejecutar supabase/migrations/20260826150000_admin_intranet.sql.";
  }

  if (code === "update") {
    return "No se pudo guardar el cambio.";
  }

  if (code === "credentials") {
    return "Correo o contraseña incorrectos.";
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
