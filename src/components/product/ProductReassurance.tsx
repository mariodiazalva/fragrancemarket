import { productReassurance } from "@/data/product-page";

export function ProductReassurance() {
  return (
    <section className="grid gap-6 border-y border-elova-border py-8 sm:grid-cols-2 lg:grid-cols-4">
      {productReassurance.map((item) => (
        <article key={item.id}>
          <h2 className="text-[0.7rem] uppercase tracking-[0.18em] text-text-primary">
            {item.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {item.text}
          </p>
        </article>
      ))}
    </section>
  );
}
