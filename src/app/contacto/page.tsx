import { SimplePlaceholder } from "@/views/placeholders/SimplePlaceholder";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contacto",
  description:
    "El canal de atención se publicará cuando WhatsApp y el correo de Fragrance Market estén listos.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <SimplePlaceholder
      title="Contacto"
      description="El canal de atención se publicará cuando WhatsApp y el correo de Fragrance Market estén listos."
    />
  );
}
