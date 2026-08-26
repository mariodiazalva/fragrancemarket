import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { decantSizes } from "@/data/home";

export function DecantsGuideSection() {
  return (
    <section className="theme-ink border-y border-elova-border bg-elova-graphite py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Decants"
          title="Prueba el tamaño justo"
          description="Tres medidas para conocer una fragancia en la piel, con calma."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {decantSizes.map((size) => (
            <article key={size.id} className="border-t border-elova-gold/30 pt-6">
              <p className="font-serif text-4xl tracking-[0.08em] text-text-primary sm:text-5xl">
                {size.volume}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {size.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <ButtonLink href="/decants">Explorar decants</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
