import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { socialPlaceholders } from "@/data/home";

export function SocialSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Comunidad"
          title="El universo Fragrance Market"
          description="Espacios reservados para Instagram, TikTok, reels y piezas de perfume. El contenido real se conectará después."
          className="max-w-2xl"
        />

        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {socialPlaceholders.map((item) => (
            <div
              key={item.id}
              className="flex aspect-[3/4] min-w-0 flex-col justify-between border border-dashed border-elova-border bg-surface px-3 py-4 sm:px-4 sm:py-5"
            >
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-elova-gold">
                {item.label}
              </p>
              <p className="text-sm text-text-secondary">{item.caption}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
