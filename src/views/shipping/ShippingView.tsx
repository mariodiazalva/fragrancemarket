import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { STORE_PICKUP } from "@/lib/shipping";
import { SHALOM_SHIPPING_AMOUNT } from "@/lib/shipping-quote";
import { formatPrice } from "@/lib/utils";

const shippingNotes = [
  {
    title: "Recojo en local",
    text: `Puedes recoger en ${STORE_PICKUP.line} — ${STORE_PICKUP.city}. El recojo es gratis. En el checkout aparece el mapa al elegir esta opción.`,
  },
  {
    title: "Delivery en Trujillo",
    text: `Si el pedido va a domicilio en Trujillo, el delivery es ${formatPrice(5)} en zona céntrica, ${formatPrice(8)} en distritos intermedios (La Esperanza, El Porvenir, Moche) y ${formatPrice(10)} en zonas alejadas (Huanchaco, Salaverry, Laredo y alrededores).`,
  },
  {
    title: "Shalom",
    text: `Los envíos a todo el Perú salen por agencia Shalom. En el checkout eliges departamento, ciudad y la agencia donde recoger. El flete es ${formatPrice(SHALOM_SHIPPING_AMOUNT)}.`,
  },
  {
    title: "Plazo",
    text: "El recojo y el delivery en Trujillo se coordinan al confirmar el pago. El tiempo de Shalom depende de la agencia de destino.",
  },
] as const;

export function ShippingView() {
  return (
    <main className="flex-1 pb-16 pt-8 sm:pt-12">
      <Container size="narrow" className="elova-fade-up">
        <p className="text-xs uppercase tracking-[0.35em] text-elova-gold">Compra</p>
        <h1 className="mt-4 font-serif text-[2rem] tracking-[0.04em] text-text-primary sm:text-4xl sm:tracking-[0.06em] lg:text-5xl">
          Envíos
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-text-secondary">
          Recojo gratis en Trujillo, delivery local según zona, o Shalom a todo el
          Perú por {formatPrice(SHALOM_SHIPPING_AMOUNT)}. Eliges el método en el
          checkout y el costo entra en el total.
        </p>

        <ul className="mt-10 space-y-8">
          {shippingNotes.map((note) => (
            <li key={note.title}>
              <h2 className="text-[0.7rem] uppercase tracking-[0.16em] text-elova-gold">
                {note.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{note.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/perfumes">Ver perfumes</ButtonLink>
          <ButtonLink href="/contacto" variant="outline">
            Contacto
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
