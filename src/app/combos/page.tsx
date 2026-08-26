import { getFragranceSets } from "@/services/set.service";
import { CombosExperience } from "@/views/combos/CombosExperience";
import { createCatalogMetadata } from "@/lib/seo";

export const metadata = createCatalogMetadata("combos");

export const revalidate = 60;

export default async function CombosPage() {
  const sets = await getFragranceSets();
  return <CombosExperience sets={sets} />;
}
