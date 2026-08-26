import { SimplePlaceholder } from "@/views/placeholders/SimplePlaceholder";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Encontrar mi perfume",
  description:
    "Esta guía se construirá en una fase posterior. Por ahora es un punto de entrada listo para el flujo de recomendación.",
  path: "/encontrar",
  noIndex: true,
});

export default function EncontrarPage() {
  return (
    <SimplePlaceholder
      eyebrow="Recomendador"
      title="Encontrar mi perfume"
      description="Esta guía se construirá en una fase posterior. Por ahora es un punto de entrada listo para el flujo de recomendación."
    />
  );
}
