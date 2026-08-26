import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { discoverCards } from "@/data/home";

export function DiscoverSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Empieza aquí"
          title="Descubre Fragrance Market"
          description="Tres caminos para encontrar una fragancia, sin prisa y sin comprar a ciegas."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {discoverCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="theme-ink group relative block min-h-72 overflow-hidden border border-elova-border bg-surface transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-elova-gold/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              {card.image ? (
                <Image
                  src={card.image}
                  alt={`Composición editorial de ${card.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-elova-black via-elova-black/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-serif text-3xl font-bold tracking-[-0.02em] text-text-primary">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">{card.description}</p>
                <span className="mt-4 inline-block text-[0.7rem] uppercase tracking-[0.18em] text-elova-gold">
                  {card.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
