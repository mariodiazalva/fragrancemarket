import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { collectionCards } from "@/data/home";

export function CollectionsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Archivo"
          title="Colecciones"
          description="Entra por género, origen o estilo."
        />

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
          {collectionCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group flex min-h-24 items-end border border-elova-border px-3 py-4 transition-[border-color,background-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-elova-gold/40 hover:bg-surface motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-h-28 sm:px-5 sm:py-5"
            >
              <h3 className="font-serif text-xl tracking-[0.04em] text-text-primary transition-colors group-hover:text-elova-gold sm:text-2xl sm:tracking-[0.08em]">
                {card.title}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
