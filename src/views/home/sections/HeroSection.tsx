import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  return (
    <section className="theme-ink relative min-h-[88svh] overflow-hidden">
      <Image
        src="/images/home/hero-elova-4k.png"
        alt="Tres frascos de perfume sobre una superficie de piedra, iluminación editorial"
        fill
        preload
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-elova-black via-elova-black/60 to-elova-black/25 lg:bg-gradient-to-r lg:from-elova-black lg:via-elova-black/75 lg:to-transparent" />

      <Container className="relative flex min-h-[88svh] items-end pb-16 pt-24 sm:pb-16 lg:items-center lg:pb-20">
        <div className="elova-fade-up max-w-xl">
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-elova-gold sm:text-xs sm:tracking-[0.35em]">
            FRAGRANCE MARKET
          </p>
          <h1 className="mt-5 font-serif text-[2.125rem] font-bold leading-[1.08] tracking-[-0.03em] text-text-primary sm:text-5xl lg:text-6xl">
            Una fragancia
            <br />
            dice más de ti.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-text-secondary sm:text-base">
            Descubre perfumes originales y decants seleccionados para cada
            momento.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/decants" size="lg" fullWidth className="sm:w-auto">
              Descubrir decants
            </ButtonLink>
            <ButtonLink href="/perfumes" variant="outline" size="lg" fullWidth className="sm:w-auto">
              Ver perfumes
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
