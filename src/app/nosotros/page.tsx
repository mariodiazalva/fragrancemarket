import { SimplePlaceholder } from "@/views/placeholders/SimplePlaceholder";
import { SITE_DESCRIPTION } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Nosotros",
  description: SITE_DESCRIPTION,
  path: "/nosotros",
});

export default function NosotrosPage() {
  return (
    <SimplePlaceholder
      eyebrow="Casa"
      title="Nosotros"
      description={SITE_DESCRIPTION}
    />
  );
}
