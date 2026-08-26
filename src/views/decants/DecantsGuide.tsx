import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { decantExplain, decantSizeGuides } from "@/data/decants";

type DecantsGuideProps = {
  activeSize?: number;
};

export function DecantsGuide({ activeSize }: DecantsGuideProps) {
  return (
    <div className="theme-ink border-b border-elova-border bg-elova-graphite">
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Antes de elegir"
            title="Entiende el decant"
            description="Qué es, por qué pedirlo y cómo acertar con el tamaño."
          />

          <div className="reveal-stagger mt-10 grid gap-8 md:grid-cols-3">
            {decantExplain.map((item) => (
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

      <section className="pb-16 sm:pb-20">
        <Container>
          <SectionHeading
            title="Tamaños"
            description="Tres medidas. Elige la que encaje con lo que quieres probar."
          />

          <div className="reveal-stagger mt-10 grid gap-3 md:grid-cols-3">
            {decantSizeGuides.map((size) => {
              const href =
                activeSize === size.volumeMl
                  ? "/decants#catalogo"
                  : `/decants?size=${size.volumeMl}#catalogo`;
              const selected = activeSize === size.volumeMl;

              return (
                <Link
                  key={size.id}
                  href={href}
                  className={`block border px-6 py-8 transition-colors ${
                    selected
                      ? "border-elova-gold bg-elova-gold/10"
                      : "border-elova-border hover:border-elova-gold/40"
                  }`}
                >
                  <p className="font-serif text-4xl tracking-[0.08em] text-text-primary sm:text-5xl">
                    {size.label}
                  </p>
                  <p className="mt-4 text-sm text-text-secondary">{size.text}</p>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
