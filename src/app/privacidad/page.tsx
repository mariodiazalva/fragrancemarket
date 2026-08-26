import { SimplePlaceholder } from "@/views/placeholders/SimplePlaceholder";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacidad",
  description:
    "La política de privacidad se añadirá antes de recolectar datos de clientes.",
  path: "/privacidad",
});

export default function PrivacidadPage() {
  return (
    <SimplePlaceholder
      title="Privacidad"
      description="La política de privacidad se añadirá antes de recolectar datos de clientes."
    />
  );
}
