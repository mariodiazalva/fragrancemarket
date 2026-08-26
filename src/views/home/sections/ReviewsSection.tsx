import { Container } from "@/components/ui/Container";
import { Rating } from "@/components/ui/Rating";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { DemoReview } from "@/types";

type ReviewsSectionProps = {
  reviews: DemoReview[];
};

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Opiniones"
          title="Lo que dicen quienes ya compraron"
          description="Comentarios de clientes que probaron decants y frascos antes de decidir su próximo perfume."
        />

        <div className="mt-8 flex w-full min-w-0 gap-3 overflow-x-auto overscroll-x-contain snap-x snap-mandatory no-scrollbar pb-2 sm:gap-4 md:grid md:grid-cols-3 md:overflow-visible">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="min-w-[min(18rem,85%)] snap-start border border-elova-border bg-surface p-4 sm:min-w-[48%] sm:p-5 md:min-w-0"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-text-secondary">
                {review.author}
              </p>
              <div className="mt-3">
                <Rating value={review.rating} size="sm" />
              </div>
              <h3 className="mt-4 font-serif text-xl tracking-[0.03em] text-text-primary">
                {review.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {review.body}
              </p>
              <p className="mt-4 text-[0.65rem] uppercase tracking-[0.16em] text-text-secondary">
                Sobre {review.productName}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
