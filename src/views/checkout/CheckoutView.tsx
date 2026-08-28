"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { LocalDeliveryFields } from "@/components/checkout/LocalDeliveryFields";
import { PickupLocation } from "@/components/checkout/PickupLocation";
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
import {
  STORE_PICKUP,
  peruDepartments,
  type PeruDepartment,
  type ShippingAddress,
} from "@/lib/shipping";
import {
  SHALOM_SHIPPING_AMOUNT,
  type ShippingMethod,
} from "@/lib/shipping-quote";
import {
  TRUJILLO_CITY,
  TRUJILLO_DEPARTMENT,
  quoteTrujilloDelivery,
} from "@/lib/trujillo-delivery";
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
  const [method, setMethod] = useState<ShippingMethod | "">("");
  const [department, setDepartment] = useState<PeruDepartment | "">("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [agencyId, setAgencyId] = useState("");
  const [localDistrict, setLocalDistrict] = useState("");
  const [deliveryLine, setDeliveryLine] = useState("");
  const [billingLine, setBillingLine] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const cities = department ? listShalomCities(department) : [];
  const districts = department ? listShalomDistricts(department, city) : [];
  const localQuote = useMemo(
    () => quoteTrujilloDelivery(localDistrict, deliveryLine || billingLine),
    [billingLine, deliveryLine, localDistrict],
  );

  const shippingAmount = useMemo(() => {
    if (method === "pickup") {
      return 0;
    }

    if (method === "shalom") {
      return SHALOM_SHIPPING_AMOUNT;
    }

    if (method === "local") {
      return localQuote?.amount ?? null;
    }

    return null;
  }, [localQuote, method]);

  const payableTotal =
    shippingAmount === null ? totals.subtotal : totals.subtotal + shippingAmount;

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

  function chooseMethod(next: ShippingMethod) {
    setMethod(next);
    setError(null);

    if (next === "local" && !deliveryLine.trim() && billingLine.trim()) {
      setDeliveryLine(billingLine);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    let shipping: ShippingAddress;

    if (method === "pickup") {
      shipping = {
        line: STORE_PICKUP.line,
        district: STORE_PICKUP.district,
        city: STORE_PICKUP.city,
        department: STORE_PICKUP.department,
        carrier: "Pickup",
      };
    } else if (method === "local") {
      const line = (deliveryLine.trim() || billingLine.trim());

      if (!localQuote || line.length < 5) {
        setError("Completa el distrito y la dirección de entrega en Trujillo.");
        return;
      }

      shipping = {
        line,
        district: localDistrict,
        city: TRUJILLO_CITY,
        department: TRUJILLO_DEPARTMENT,
        carrier: "Local",
      };
    } else if (method === "shalom") {
      const agency = findShalomAgency(agencyId);

      if (!agency) {
        setError("Elige una agencia Shalom para el envío.");
        return;
      }

      shipping = {
        line: shippingLineForAgency(agency),
        district: district || agency.district,
        city: city || agency.city,
        department: department || agency.region,
        carrier: "Shalom",
        agencyId: agency.id,
      };
    } else {
      setError("Elige un método de envío.");
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
          shipping,
          billing: {
            line: billingLine,
            district: shipping.district,
            city: shipping.city,
            department: shipping.department,
            dni,
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
      <Container className="elova-fade-up">
        <p className="text-xs uppercase tracking-[0.35em] text-elova-gold">Compra</p>
        <h1 className="mt-4 font-serif text-[2rem] tracking-[0.04em] text-text-primary sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary">
          Deja tus datos de facturación y elige cómo recibir el pedido: recojo en
          local, delivery en Trujillo o agencia Shalom a todo el Perú. En el
          siguiente paso te mostramos Yape, Plin y transferencia BCP.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <form className="space-y-8" onSubmit={onSubmit}>
            <fieldset className="space-y-5">
              <legend className="font-serif text-xl tracking-[-0.02em] text-text-primary">
                Facturación
              </legend>
              <p className="text-sm leading-relaxed text-text-secondary">
                Estos datos salen en la factura. El envío lo eliges aparte.
              </p>
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
            <Input
              label="Dirección de facturación (obligatorio)"
              name="billingLine"
              autoComplete="street-address"
              required
              minLength={5}
              maxLength={160}
              hint="Calle, número y referencia de tu domicilio."
              value={billingLine}
              onChange={(event) => setBillingLine(event.target.value)}
            />
            </fieldset>

            <fieldset className="space-y-5">
              <legend className="font-serif text-xl tracking-[-0.02em] text-text-primary">
                Envío
              </legend>
              <p className="text-sm leading-relaxed text-text-secondary">
                Recojo gratis en Trujillo, delivery local según zona, o Shalom a
                todo el Perú por {formatPrice(SHALOM_SHIPPING_AMOUNT)}.
              </p>

              <div className="space-y-3">
                <PickupLocation
                  selected={method === "pickup"}
                  onSelect={() => chooseMethod("pickup")}
                />
                <LocalDeliveryFields
                  selected={method === "local"}
                  onSelect={() => chooseMethod("local")}
                  district={localDistrict}
                  deliveryLine={deliveryLine}
                  quote={localQuote}
                  onDistrictChange={setLocalDistrict}
                  onDeliveryLineChange={setDeliveryLine}
                />
                <div
                  className={[
                    "border",
                    method === "shalom"
                      ? "border-elova-gold bg-surface-elevated"
                      : "border-elova-border bg-surface",
                  ].join(" ")}
                >
                  <label className="flex cursor-pointer gap-3 px-3 py-3 text-sm leading-relaxed">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="shalom"
                      required
                      checked={method === "shalom"}
                      onChange={() => chooseMethod("shalom")}
                      className="mt-1 shrink-0 accent-elova-gold"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-text-primary">Agencia Shalom</span>
                        <span className="text-[0.7rem] uppercase tracking-[0.12em] text-elova-gold">
                          {formatPrice(SHALOM_SHIPPING_AMOUNT)}
                        </span>
                      </span>
                      <span className="mt-1 block text-text-secondary">
                        Envío a todo el Perú. Eliges la agencia donde recoger el pedido.
                      </span>
                    </span>
                  </label>

                  {method === "shalom" ? (
                    <div className="space-y-4 border-t border-elova-border px-3 py-4">
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
                    </div>
                  ) : null}
                </div>
              </div>
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
            </fieldset>
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
                <span className="text-text-secondary">
                  {shippingAmount === null
                    ? "—"
                    : shippingAmount === 0
                      ? "Gratis"
                      : formatPrice(shippingAmount)}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="uppercase tracking-[0.14em] text-text-secondary">Total</span>
                <span className="text-text-primary">{formatPrice(payableTotal)}</span>
              </div>
              <p className="text-[0.7rem] leading-relaxed tracking-normal text-text-secondary">
                El envío entra en el total según el método que elijas.{" "}
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
