import { SetCard } from "@/components/sets/SetCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { combosExplain } from "@/data/combos";
import { breadcrumbJsonLd } from "@/lib/seo";
import type { FragranceSet } from "@/types";
import { CombosHero } from "@/views/combos/CombosHero";

type CombosExperienceProps = {
  sets: FragranceSet[];
};

export function CombosExperience({ sets }: CombosExperienceProps) {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Sets", path: "/combos" },
        ])}
      />
      <CombosHero />

      <section className="theme-ink border-b border-elova-border bg-elova-graphite py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="La idea"
            title="Más aromas. Una sola compra."
            description="Los sets están pensados para comparar decants y subir el pedido sin armarlo pieza por pieza."
          />
          <div className="reveal-stagger mt-10 grid gap-8 md:grid-cols-3">
            {combosExplain.map((item) => (
              <article key={item.id} className="border-t border-elova-gold/30 pt-5">
                <h3 className="text-xs uppercase tracking-[0.18em] text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            title="Los cuatro sets"
            description="Date Night, Daily, Signature y Arabian. Cada uno lista lo que incluye y lo que ahorras."
          />
          <div className="reveal-stagger mt-10 grid gap-4 md:grid-cols-2">
            {sets.map((set) => (
              <SetCard key={set.id} set={set} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
