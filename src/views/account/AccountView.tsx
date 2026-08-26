import Link from "next/link";

import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { orderDetailHref } from "@/lib/order-confirmation";
import { formatPrice } from "@/lib/utils";
import { signOutAction } from "@/services/auth.actions";
import { orderStatusLabel, type OrderListItem } from "@/types/order";

type AccountViewProps = {
  sessionEmail: string | null;
  lookupEmail: string;
  ordersEmail: string | null;
  orders: OrderListItem[];
  showOrders: boolean;
  orderId: string;
  lookupError: string | null;
  ordersError: string | null;
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
  if (code === "enlace") {
    return "El enlace no es válido o ya se usó.";
  }

  return "No se pudo entrar con ese enlace.";
}

export function AccountView({
  sessionEmail,
  lookupEmail,
  ordersEmail,
  orders,
  showOrders,
  orderId,
  lookupError,
  ordersError,
  authError,
  isAdmin,
}: AccountViewProps) {
  const emailInputValue = lookupEmail || sessionEmail || "";

  return (
    <main className="flex-1 pb-16 pt-8 sm:pt-12">
      <Container size="narrow" className="elova-fade-up">
        <p className="text-xs uppercase tracking-[0.35em] text-elova-gold">Cuenta</p>
        <h1 className="mt-4 font-serif text-[2rem] tracking-[0.04em] text-text-primary sm:text-4xl">
          Consulta tu pedido
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-text-secondary">
          Escribe el correo con el que compraste para ver tus pedidos pendientes o
          hechos. Si tienes la referencia o el número de pedido, consulta solo ese.
        </p>

        {sessionEmail ? (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border border-elova-border bg-surface px-4 py-3">
            <p className="text-sm text-text-primary">{sessionEmail}</p>
            <div className="flex flex-wrap gap-3">
              {isAdmin ? (
                <ButtonLink href="/admin" variant="outline" size="sm">
                  Intranet
                </ButtonLink>
              ) : null}
              <form action={signOutAction}>
                <Button type="submit" variant="outline" size="sm">
                  Salir
                </Button>
              </form>
            </div>
          </div>
        ) : null}

        {authError ? (
          <p className="mt-6 text-sm text-red-700" role="alert">
            {authErrorMessage(authError)}
          </p>
        ) : null}

        <form action="/cuenta" method="get" className="mt-10 space-y-5">
          <Input
            label="Correo"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={emailInputValue}
            required
            hint="El mismo correo que usaste en el checkout."
          />
          <Button type="submit">Ver pedidos</Button>
        </form>

        {showOrders ? (
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
                      href={orderDetailHref(item.id, item.status)}
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
            label="Referencia o número de pedido"
            name="id"
            defaultValue={orderId}
            autoComplete="off"
            spellCheck={false}
            required
            hint="Es el código que te mostramos al registrar el pedido."
          />
          <Button type="submit" variant="outline">
            Consultar pedido
          </Button>
        </form>

        {lookupError ? (
          <p className="mt-8 text-sm text-red-700" role="alert">
            {lookupError}
          </p>
        ) : null}
      </Container>
    </main>
  );
}
