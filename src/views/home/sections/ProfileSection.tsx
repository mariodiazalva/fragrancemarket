import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profileCards } from "@/data/home";

export function ProfileSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Familias"
          title="Busca por perfil"
          description="Cuatro direcciones para orientar la búsqueda."
        />

        <div className="reveal-stagger mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {profileCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group flex min-h-32 flex-col justify-end border border-elova-border bg-surface px-3 py-5 transition-[border-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-elova-gold/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-h-36 sm:px-5 sm:py-6"
            >
              <span className="text-[0.6rem] uppercase tracking-[0.16em] text-elova-gold sm:text-[0.65rem] sm:tracking-[0.22em]">
                Perfil
              </span>
              <h3 className="mt-3 font-serif text-xl tracking-[0.04em] text-text-primary transition-colors group-hover:text-elova-gold sm:text-2xl sm:tracking-[0.06em] lg:text-3xl">
                {card.title}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
