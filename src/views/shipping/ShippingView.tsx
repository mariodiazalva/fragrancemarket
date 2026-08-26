import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { formatPrice } from "@/lib/utils";

const shippingNotes = [
  {
    title: "Shalom",
    text: "Los envíos son por agencia Shalom a todo el Perú. En el checkout escribes distrito y ciudad, ves las agencias disponibles y eliges dónde recoger el pedido.",
  },
  {
    title: "Costo",
    text: `Por ahora el envío aparece como ${formatPrice(0)}. El importe se actualizará cuando el flete esté definido; no adelantamos una tarifa que aún no existe.`,
  },
  {
    title: "Plazo",
    text: "El tiempo de llegada depende de la agencia de destino. Si tu zona no aparece en el listado, confirma la agencia más cercana al (01) 500 7878.",
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
          Enviamos a nivel nacional por Shalom. Eliges la agencia en el
          checkout; hoy el flete no se cobra en el total.
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
