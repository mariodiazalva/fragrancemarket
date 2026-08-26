import { intensityLabels, getProductIntensity } from "@/lib/product";
import type { Product } from "@/types";

type ProductDetailsProps = {
  product: Product;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  const intensity = getProductIntensity(product);
  const intensityScore = product.intensityScore;
  const intensityMax = intensityScore ? 10 : 5;
  const intensityFilled = intensityScore ?? intensity;

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-[0.7rem] uppercase tracking-[0.2em] text-text-secondary">
          Descripción
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-primary sm:text-base">
          {product.description}
        </p>
      </section>

      <section>
        <h2 className="text-[0.7rem] uppercase tracking-[0.2em] text-text-secondary">
          Familia olfativa
        </h2>
        <p className="mt-3 text-sm capitalize text-text-primary">
          {product.fragranceFamily.join(" · ")}
        </p>
      </section>

      <section>
        <h2 className="text-[0.7rem] uppercase tracking-[0.2em] text-text-secondary">
          Notas olfativas
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-3">
          <NoteColumn title="Salida" notes={product.notes.top} />
          <NoteColumn title="Corazón" notes={product.notes.heart} />
          <NoteColumn title="Fondo" notes={product.notes.base} />
        </dl>
      </section>

      <section>
        <h2 className="text-[0.7rem] uppercase tracking-[0.2em] text-text-secondary">
          Ocasiones
        </h2>
        <p className="mt-3 text-sm capitalize text-text-primary">
          {product.occasions.join(" · ")}
        </p>
      </section>

      <section>
        <h2 className="text-[0.7rem] uppercase tracking-[0.2em] text-text-secondary">
          Intensidad
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <div className="flex gap-1" aria-hidden="true">
            {Array.from({ length: intensityMax }, (_, index) => (
              <span
                key={index}
                className={`h-1.5 ${intensityScore ? "w-3 sm:w-4" : "w-6 sm:w-8"} ${
                  index < intensityFilled ? "bg-elova-gold" : "bg-elova-border"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-text-primary">
            {intensityScore
              ? `${intensityScore}/10`
              : intensityLabels[intensity]}
          </p>
        </div>
      </section>

      {product.projection || product.longevity ? (
        <section className="grid gap-4 sm:grid-cols-2">
          {product.projection ? (
            <div>
              <h2 className="text-[0.7rem] uppercase tracking-[0.2em] text-text-secondary">
                Proyección
              </h2>
              <p className="mt-3 text-sm text-text-primary">{product.projection}</p>
            </div>
          ) : null}
          {product.longevity ? (
            <div>
              <h2 className="text-[0.7rem] uppercase tracking-[0.2em] text-text-secondary">
                Duración
              </h2>
              <p className="mt-3 text-sm text-text-primary">{product.longevity}</p>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}

function NoteColumn({ title, notes }: { title: string; notes: string[] }) {
  return (
    <div className="border-t border-elova-border pt-3">
      <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-elova-gold">
        {title}
      </dt>
      <dd className="mt-2 text-sm leading-relaxed text-text-primary">
        {notes.join(", ")}
      </dd>
    </div>
  );
}
