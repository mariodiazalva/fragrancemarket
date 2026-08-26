import { SetCard } from "@/components/sets/SetCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FragranceSet } from "@/types";

type SetsSectionProps = {
  sets: FragranceSet[];
};

export function SetsSection({ sets }: SetsSectionProps) {
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
