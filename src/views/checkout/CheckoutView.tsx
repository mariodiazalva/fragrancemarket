"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { ShalomAgencyPicker } from "@/components/checkout/ShalomAgencyPicker";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { useCart } from "@/hooks/useCart";
import {
  filterShalomAgencies,
  findShalomAgency,
  listShalomCities,
  listShalomDistricts,
  shippingLineForAgency,
  type ShalomAgency,
} from "@/lib/shalom";
import { peruDepartments, type PeruDepartment } from "@/lib/shipping";
import { formatPrice } from "@/lib/utils";

const selectClassName =
  "h-11 w-full min-w-0 border border-elova-border bg-surface px-4 text-base text-text-primary focus:border-elova-gold/50 focus:bg-surface-elevated focus:outline-none sm:text-sm";

export function CheckoutView() {
  const router = useRouter();
  const { items, totals, clear, ready } = useCart();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState<PeruDepartment | "">("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [agencyId, setAgencyId] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const cities = department ? listShalomCities(department) : [];
  const districts = department ? listShalomDistricts(department, city) : [];

  useEffect(() => {
    if (!agencyId) {
      return;
    }

    const stillVisible = filterShalomAgencies(district, city, department).some(
      (agency) => agency.id === agencyId,
    );

    if (!stillVisible) {
      setAgencyId("");
    }
  }, [agencyId, city, department, district]);

  useEffect(() => {
    if (!department) {
      return;
    }

    const options = listShalomCities(department);

    if (options.length === 1) {
      setCity(options[0]);
    }
  }, [department]);

  useEffect(() => {
    if (!department || !city) {
      return;
    }

    const options = listShalomDistricts(department, city);

    if (options.length === 1) {
      setDistrict(options[0]);
    }
  }, [city, department]);

  if (ready && items.length === 0) {
    return (
      <main className="flex-1 pb-16 pt-8 sm:pt-12">
        <Container size="narrow">
          <p className="text-xs uppercase tracking-[0.35em] text-elova-gold">Compra</p>
          <h1 className="mt-4 font-serif text-[2rem] tracking-[0.04em] text-text-primary sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-4 text-sm text-text-secondary">
            Tu carrito está vacío. Agrega una pieza antes de continuar.
          </p>
          <div className="mt-8">
            <ButtonLink href="/perfumes" variant="outline">
              Ver perfumes
            </ButtonLink>
          </div>
        </Container>
      </main>
    );
  }

  function selectAgency(agency: ShalomAgency) {
    setAgencyId(agency.id);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const agency = findShalomAgency(agencyId);

    if (!agency) {
      setError("Elige una agencia Shalom para el envío.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: `${firstName.trim()} ${lastName.trim()}`.trim(),
          email,
          phone,
          dni,
          notes,
          shipping: {
            line: shippingLineForAgency(agency),
            district: district || agency.district,
            city: city || agency.city,
            department: department || agency.region,
            carrier: "Shalom",
            agencyId: agency.id,
          },
          items: items.map((item) => ({
            productId: item.productId,
            sizeLabel: item.sizeLabel,
            quantity: item.quantity,
          })),
        }),
      });
      const payload = (await response.json()) as { orderId?: string; error?: string };

      if (!response.ok || !payload.orderId) {
        throw new Error(payload.error ?? "No se pudo registrar el pedido.");
      }

      clear();
      router.push(`/pedido/${payload.orderId}/pagar`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo registrar el pedido.");
      setSubmitting(false);
    }
  }

  return (
    <main className="flex-1 pb-16 pt-8 sm:pt-12">
      <Container>
        <p className="text-xs uppercase tracking-[0.35em] text-elova-gold">Compra</p>
        <h1 className="mt-4 font-serif text-[2rem] tracking-[0.04em] text-text-primary sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary">
          Deja tus datos y elige una agencia Shalom. En el siguiente paso te
          mostramos Yape, Plin y transferencia BCP. El envío a todo el Perú
          queda en {formatPrice(0)} hasta definir el flete.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <form className="space-y-5" onSubmit={onSubmit}>
            <Input
              label="Nombres (obligatorio)"
              name="firstName"
              autoComplete="given-name"
              required
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <Input
              label="Apellidos (obligatorio)"
              name="lastName"
              autoComplete="family-name"
              required
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
            <Input
              label="Número de DNI (obligatorio)"
              name="dni"
              inputMode="numeric"
              autoComplete="off"
              required
              minLength={8}
              maxLength={9}
              pattern="[0-9]{8,9}"
              value={dni}
              onChange={(event) => setDni(event.target.value.replace(/\D/g, "").slice(0, 9))}
            />
            <Input
              label="Número de teléfono (obligatorio)"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <Input
              label="Correo"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <div className="flex w-full flex-col gap-2">
              <label
                htmlFor="department"
                className="text-xs font-medium uppercase tracking-[0.14em] text-text-secondary"
              >
                Departamento
              </label>
              <select
                id="department"
                name="department"
                required
                value={department}
                onChange={(event) => {
                  setDepartment(event.target.value as PeruDepartment | "");
                  setCity("");
                  setDistrict("");
                }}
                className={selectClassName}
              >
                <option value="">Elige un departamento</option>
                {peruDepartments.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex w-full flex-col gap-2">
              <label
                htmlFor="city"
                className="text-xs font-medium uppercase tracking-[0.14em] text-text-secondary"
              >
                Ciudad
              </label>
              <select
                id="city"
                name="city"
                required
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                  setDistrict("");
                }}
                className={selectClassName}
              >
                <option value="">
                  {!department
                    ? "Elige un departamento primero"
                    : cities.length === 0
                      ? "No hay ciudades listadas"
                      : "Elige una ciudad"}
                </option>
                {cities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex w-full flex-col gap-2">
              <label
                htmlFor="district"
                className="text-xs font-medium uppercase tracking-[0.14em] text-text-secondary"
              >
                Distrito
              </label>
              <select
                id="district"
                name="district"
                required
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                className={selectClassName}
              >
                <option value="">
                  {!city
                    ? "Elige una ciudad primero"
                    : districts.length === 0
                      ? "No hay distritos listados"
                      : "Elige un distrito"}
                </option>
                {districts.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <ShalomAgencyPicker
              department={department}
              district={district}
              city={city}
              selectedId={agencyId}
              onSelect={selectAgency}
            />
            <div className="flex w-full flex-col gap-2">
              <label
                htmlFor="notes"
                className="text-xs font-medium uppercase tracking-[0.14em] text-text-secondary"
              >
                Notas
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="w-full min-w-0 border border-elova-border bg-surface px-4 py-3 text-base text-text-primary placeholder:text-text-secondary/70 focus:border-elova-gold/50 focus:outline-none sm:text-sm"
              />
            </div>
            {error ? (
              <p className="text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit" fullWidth disabled={submitting || !ready}>
              {submitting ? "Registrando…" : "Continuar al pago"}
            </Button>
          </form>

          <aside className="h-fit border border-elova-border bg-surface p-5">
            <h2 className="text-[0.7rem] uppercase tracking-[0.16em] text-text-secondary">
              Pedido
            </h2>
            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li key={item.lineId} className="flex justify-between gap-3 text-sm">
                  <span className="min-w-0 text-text-primary">
                    {item.name}
                    <span className="mt-1 block text-[0.7rem] uppercase tracking-[0.12em] text-text-secondary">
                      {item.sizeLabel} · {item.quantity}
                    </span>
                  </span>
                  <span className="shrink-0 text-text-secondary">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-3 border-t border-elova-border pt-4 text-sm">
              <div className="flex justify-between gap-3">
                <span className="uppercase tracking-[0.14em] text-text-secondary">Subtotal</span>
                <span className="text-text-secondary">{formatPrice(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="uppercase tracking-[0.14em] text-text-secondary">Envío</span>
                <span className="text-text-secondary">{formatPrice(0)}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="uppercase tracking-[0.14em] text-text-secondary">Total</span>
                <span className="text-text-primary">{formatPrice(totals.total)}</span>
              </div>
              <p className="text-[0.7rem] leading-relaxed tracking-normal text-text-secondary">
                Envío por agencia Shalom. El flete queda en {formatPrice(0)} hasta
                confirmarlo.{" "}
                <Link href="/envios" className="text-elova-gold hover:underline">
                  Envíos
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
