import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function RecommenderSection() {
  return (
    <section className="theme-ink border-y border-elova-border bg-elova-graphite py-20 sm:py-24">
      <Container size="narrow" className="text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-elova-gold">
          Guía
        </p>
        <h2 className="mt-5 font-serif text-[1.75rem] font-bold tracking-[-0.02em] text-text-primary sm:text-3xl lg:text-5xl">
          Te ayudamos a encontrarlo.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-text-secondary sm:text-base">
          Cuéntanos qué buscas y encuentra una fragancia que encaje contigo.
        </p>
        <div className="mt-8">
          <ButtonLink href="/encontrar">Encontrar mi perfume</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
