import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { decantHero } from "@/data/decants";

export function DecantsHero() {
  return (
    <section className="theme-ink relative min-h-[70svh] overflow-hidden">
      <Image
        src={decantHero.image}
        alt="Viales de decant sobre un fondo oscuro"
        fill
        preload
        sizes="100vw"
        className="elova-hero-media object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-elova-black via-elova-black/65 to-elova-black/30" />

      <Container className="relative flex min-h-[70svh] items-end pb-14 pt-24 lg:items-center lg:pb-20">
        <div className="elova-fade-up max-w-xl">
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-elova-gold sm:text-xs sm:tracking-[0.35em]">
            {decantHero.eyebrow}
          </p>
          <h1 className="mt-5 font-serif text-[2.125rem] font-bold leading-[1.08] tracking-[-0.03em] text-text-primary sm:text-5xl lg:text-6xl">
            {decantHero.title}
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-text-secondary sm:text-base">
            {decantHero.text}
          </p>
        </div>
      </Container>
    </section>
  );
}
