import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FaqItem } from "@/types";

type FaqSectionProps = {
  items: FaqItem[];
};

export function FaqSection({ items }: FaqSectionProps) {
  return (
    <section id="preguntas" className="py-16 sm:py-20 lg:py-24">
      <Container size="narrow">
        <SectionHeading
          title="Preguntas frecuentes"
          description="Respuestas cortas, sin promesas que no podamos sostener después."
        />
        <div className="mt-10">
          <Accordion
            items={items.map((item) => ({
              id: item.id,
              title: item.question,
              content: item.answer,
            }))}
          />
        </div>
      </Container>
    </section>
  );
}
