import Link from "next/link";

import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { OrderSummary } from "@/components/order/OrderSummary";
import { formatPrice } from "@/lib/utils";
import { SubmitButton } from "@/components/account/SubmitButton";
import { requestMagicLinkAction, signOutAction } from "@/services/auth.actions";
import { orderStatusLabel, type OrderListItem, type OrderPaymentSummary } from "@/types/order";

type AccountViewProps = {
  email: string | null;
  orders: OrderListItem[];
  orderId: string;
  order: OrderPaymentSummary | null;
  lookupError: string | null;
  ordersError: string | null;
  magicSent: boolean;
  authError: string | null;
  isAdmin: boolean;
};

function formatOrderDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("es-PE", { dateStyle: "medium" }).format(date);
}

function authErrorMessage(code: string): string {
  if (code === "invalid") {
    return "Supabase no acepta este correo (direcciones de prueba como admin@gmail.com). Usa el email con el que entras a supabase.com.";
  }

  if (code === "smtp") {
    return "Con el SMTP de prueba, el enlace solo llega al correo de tu cuenta de Supabase. Usa ese email o configura un SMTP propio.";
  }

  if (code === "enlace") {
    return "El enlace no es válido o ya se usó. Pide uno nuevo.";
  }

  if (code === "wait") {
    return "Espera un minuto antes de pedir otro enlace. El primero sigue válido; revisa también no deseados.";
  }

  if (code === "quota") {
    return "El SMTP de prueba de Supabase solo deja 2 correos por hora. No pidas otro ahora: espera una hora y vuelve a intentarlo. Revisa también spam por si uno sí salió.";
  }

  return "No se pudo enviar el enlace. Inténtalo de nuevo.";
}

export function AccountView({
  email,
  orders,
  orderId,
  order,
  lookupError,
  ordersError,
  magicSent,
  authError,
  isAdmin,
}: AccountViewProps) {
  return (
    <main className="flex-1 pb-16 pt-8 sm:pt-12">
      <Container size="narrow">
        <p className="text-xs uppercase tracking-[0.35em] text-elova-gold">Cuenta</p>
        <h1 className="mt-4 font-serif text-[2rem] tracking-[0.04em] text-text-primary sm:text-4xl">
          {email ? "Tus pedidos" : "Consulta tu pedido"}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-text-secondary">
          {email
            ? "Pedidos asociados a este correo. También puedes consultar uno con su referencia."
            : "Te enviamos un enlace al correo para ver tus pedidos, sin contraseña. También puedes consultar uno con la referencia del checkout."}
        </p>

        {email ? (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border border-elova-border bg-surface px-4 py-3">
            <p className="text-sm text-text-primary">{email}</p>
            <div className="flex flex-wrap gap-3">
              {isAdmin ? (
                <ButtonLink href="/admin/pedidos" variant="outline" size="sm">
                  Pedidos de la tienda
                </ButtonLink>
              ) : null}
              <form action={signOutAction}>
                <Button type="submit" variant="outline" size="sm">
                  Salir
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <form action={requestMagicLinkAction} className="mt-10 space-y-5">
            <Input
              label="Correo"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <SubmitButton pendingLabel="Enviando…">Enviar enlace</SubmitButton>
          </form>
        )}

        {magicSent && !email ? (
          <p className="mt-6 text-sm text-text-secondary" role="status">
            Si el correo es válido, te enviamos un enlace para entrar. Revisa también
            la carpeta de no deseados.
          </p>
        ) : null}

        {authError ? (
          <p className="mt-6 text-sm text-red-700" role="alert">
            {authErrorMessage(authError)}
          </p>
        ) : null}

        {email ? (
          <section className="mt-12">
            <h2 className="text-[0.7rem] uppercase tracking-[0.16em] text-text-secondary">
              Pedidos
            </h2>
            {ordersError ? (
              <p className="mt-4 text-sm text-red-700" role="alert">
                {ordersError}
              </p>
            ) : orders.length === 0 ? (
              <p className="mt-4 text-sm text-text-secondary">
                Aún no hay pedidos con este correo.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {orders.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/cuenta?id=${item.id}`}
                      className="flex flex-wrap items-baseline justify-between gap-3 border border-elova-border bg-surface px-4 py-3 text-sm transition-colors hover:border-elova-gold/40"
                    >
                      <span className="text-text-primary">
                        {orderStatusLabel(item.status)}
                        {item.createdAt ? (
                          <span className="mt-1 block text-[0.7rem] uppercase tracking-[0.12em] text-text-secondary">
                            {formatOrderDate(item.createdAt)}
                          </span>
                        ) : null}
                      </span>
                      <span className="text-text-secondary">{formatPrice(item.total)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : null}

        <form action="/cuenta" method="get" className="mt-12 space-y-5">
          <Input
            label="Referencia"
            name="id"
            defaultValue={orderId}
            autoComplete="off"
            spellCheck={false}
            required
            hint="Es el código que te mostramos al registrar el pedido."
          />
          <Button type="submit" variant="outline">
            Consultar referencia
          </Button>
        </form>

        {lookupError ? (
          <p className="mt-8 text-sm text-red-700" role="alert">
            {lookupError}
          </p>
        ) : null}

        {order ? (
          <div className="mt-10 space-y-6">
            <OrderSummary order={order} />
            <div className="flex flex-col gap-3 sm:flex-row">
              {order.status === "pending" ? (
                <ButtonLink href={`/pedido/${order.id}/pagar`}>Ir al pago</ButtonLink>
              ) : null}
              <ButtonLink href="/perfumes" variant="outline">
                Seguir viendo
              </ButtonLink>
            </div>
          </div>
        ) : null}
      </Container>
    </main>
  );
}
