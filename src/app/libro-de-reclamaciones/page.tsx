import { SimplePlaceholder } from "@/views/placeholders/SimplePlaceholder";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Libro de reclamaciones",
  description:
    "El formulario oficial se habilitará cuando la tienda esté operativa en Perú.",
  path: "/libro-de-reclamaciones",
});

export default function LibroReclamacionesPage() {
  return (
    <SimplePlaceholder
      title="Libro de reclamaciones"
      description="El formulario oficial se habilitará cuando la tienda esté operativa en Perú."
    />
  );
}
