import { Container } from "@/components/ui/Container";
import { trustItems } from "@/data/home";

export function TrustSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="reveal-stagger grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <article key={item.id} className="border-t border-elova-border pt-5">
              <h2 className="text-xs uppercase tracking-[0.18em] text-text-primary">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
