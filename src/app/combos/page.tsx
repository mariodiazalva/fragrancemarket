import { getFragranceSets } from "@/services/set.service";
import { combosComingSoon, combosComingSoonCopy } from "@/data/combos";
import { CombosExperience } from "@/views/combos/CombosExperience";
import { SimplePlaceholder } from "@/views/placeholders/SimplePlaceholder";
import { createCatalogMetadata, createPageMetadata } from "@/lib/seo";

export const metadata = combosComingSoon
  ? createPageMetadata({
      title: combosComingSoonCopy.title,
      description: combosComingSoonCopy.description,
      path: "/combos",
      noIndex: true,
    })
  : createCatalogMetadata("combos");

export const revalidate = 60;

export default async function CombosPage() {
  if (combosComingSoon) {
    return (
      <SimplePlaceholder
        eyebrow={combosComingSoonCopy.eyebrow}
        title={combosComingSoonCopy.title}
        description={combosComingSoonCopy.description}
      />
    );
  }

  const sets = await getFragranceSets();
  return <CombosExperience sets={sets} />;
}
