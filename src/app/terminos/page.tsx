import { SimplePlaceholder } from "@/views/placeholders/SimplePlaceholder";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Términos",
  description:
    "Los términos y condiciones se publicarán cuando el marco legal de Fragrance Market esté listo.",
  path: "/terminos",
});

export default function TerminosPage() {
  return (
    <SimplePlaceholder
      title="Términos"
      description="Los términos y condiciones se publicarán cuando el marco legal de Fragrance Market esté listo."
    />
  );
}
