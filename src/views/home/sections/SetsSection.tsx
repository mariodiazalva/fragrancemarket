import { SetCard } from "@/components/sets/SetCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { combosComingSoon, combosComingSoonCopy } from "@/data/combos";
import type { FragranceSet } from "@/types";

type SetsSectionProps = {
  sets: FragranceSet[];
};

export function SetsSection({ sets }: SetsSectionProps) {
  if (combosComingSoon) {
    return (
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Combos"
            title={combosComingSoonCopy.eyebrow}
            description={combosComingSoonCopy.description}
          />
          <div className="mt-10 flex min-h-48 items-center border border-dashed border-elova-border bg-surface px-6 py-10 sm:min-h-56 sm:px-8">
            <p className="max-w-md text-sm leading-relaxed text-text-secondary">
              Los cuatro sets — Date Night, Daily, Signature y Arabian — se
              publicarán aquí cuando estén listos.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Combos"
          title="Sets"
          description="Cuatro selecciones listas para comparar aromas y ahorrar frente a comprarlos sueltos."
        />

        <div className="mt-10 flex w-full min-w-0 gap-3 overflow-x-auto overscroll-x-contain snap-x snap-mandatory no-scrollbar pb-2 sm:gap-4 md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-4">
          {sets.map((set) => (
            <div
              key={set.id}
              className="min-w-[min(18rem,88%)] snap-start sm:min-w-[48%] md:min-w-0"
            >
              <SetCard set={set} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
