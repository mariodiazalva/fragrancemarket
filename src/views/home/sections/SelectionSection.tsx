import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function SelectionSection() {
  return (
    <section className="theme-ink relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <Image
        src="/images/home/selection-elova.png"
        alt="Selección editorial de una fragancia sobre fondo oscuro"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-elova-black/70" />

      <Container className="relative">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.4em] text-elova-gold">
            Edición
          </p>
          <h2 className="mt-5 font-serif text-4xl font-bold tracking-[-0.03em] text-text-primary sm:text-5xl lg:text-6xl">
            The Selection
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-text-secondary sm:text-base">
            Para quienes buscan algo extraordinario.
          </p>
          <div className="mt-8">
            <ButtonLink href="/nicho" variant="outline">
              Ver la selección
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
