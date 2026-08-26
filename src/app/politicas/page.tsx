import { SimplePlaceholder } from "@/views/placeholders/SimplePlaceholder";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Políticas",
  description:
    "El texto legal se cargará cuando las políticas de la tienda estén definidas.",
  path: "/politicas",
});

export default function PoliticasPage() {
  return (
    <SimplePlaceholder
      title="Políticas"
      description="El texto legal se cargará cuando las políticas de la tienda estén definidas."
    />
  );
}
