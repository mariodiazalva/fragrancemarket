import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { occasionCards } from "@/data/home";

export function OccasionsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Momentos"
          title="Por ocasión"
          description="Elige según el día que tienes por delante."
        />

        <div className="mt-10 flex w-full min-w-0 gap-3 overflow-x-auto overscroll-x-contain snap-x snap-mandatory no-scrollbar pb-2 md:grid md:grid-cols-5 md:overflow-visible">
          {occasionCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="flex min-h-28 min-w-[min(9.5rem,42%)] snap-start items-end border border-elova-border px-4 py-4 text-text-primary transition-colors duration-200 hover:border-elova-gold/40 hover:text-elova-gold sm:min-w-[30%] md:min-w-0"
            >
              <span className="font-serif text-xl tracking-[0.04em] sm:text-2xl sm:tracking-[0.08em]">
                {card.title}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
