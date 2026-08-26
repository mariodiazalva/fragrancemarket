import { DecantsExperience } from "@/views/decants/DecantsPage";
import { createCatalogMetadata } from "@/lib/seo";

export const metadata = createCatalogMetadata("decants");

export default async function DecantsPage({
  searchParams,
}: PageProps<"/decants">) {
  return <DecantsExperience searchParams={searchParams} />;
}
