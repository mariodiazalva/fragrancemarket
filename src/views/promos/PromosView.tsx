import { ProductGrid } from "@/components/catalog/ProductGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { arabicWeekndPromo, SALE_BADGE_LABEL } from "@/data/promos";
import { breadcrumbJsonLd } from "@/lib/seo";
import type { Product } from "@/types";

type PromosViewProps = {
  products: Product[];
};

export function PromosView({ products }: PromosViewProps) {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Promos", path: "/promos" },
        ])}
      />

      <section className="theme-ink relative overflow-hidden bg-elova-black">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.22),transparent_42%),linear-gradient(180deg,#000_0%,#0a0a0a_100%)]"
        />
        <Container className="relative flex min-h-[52svh] flex-col justify-end pb-14 pt-24 sm:min-h-[58svh] sm:pb-16 lg:justify-center lg:pb-20">
          <div className="elova-fade-up max-w-2xl">
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-elova-gold sm:text-xs sm:tracking-[0.35em]">
              {arabicWeekndPromo.eyebrow}
            </p>
            <h1 className="mt-5 flex flex-wrap items-center gap-3 font-serif text-[2.125rem] font-bold leading-[1.08] tracking-[-0.03em] text-text-primary sm:text-5xl lg:text-6xl">
              {arabicWeekndPromo.title}
              <Badge variant="sale" className="align-middle text-[0.7rem] sm:text-xs">
                {SALE_BADGE_LABEL}
              </Badge>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
              {arabicWeekndPromo.description}
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20 pt-10 sm:pt-14">
        <Container>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-elova-gold">
              Selección
            </p>
            <h2 className="mt-4 font-serif text-[2rem] font-bold tracking-[-0.02em] text-text-primary sm:text-4xl">
              Las cuatro piezas de la semana
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary">
              Yara Elixir, Odyssey Mandarin Sky, Khamrah Qahwa y Afnan 9 PM en
              100 ml. El descuento ya está aplicado en el precio.
            </p>
          </Reveal>

          <div className="mt-10">
            <ProductGrid products={products} />
          </div>
        </Container>
      </section>
    </main>
  );
}
