import { CatalogPage } from "@/views/catalog/CatalogPage";
import { createCatalogMetadata } from "@/lib/seo";

export const metadata = createCatalogMetadata("arabes");

export default async function ArabesPage({
  searchParams,
}: PageProps<"/arabes">) {
  return <CatalogPage route="arabes" searchParams={searchParams} />;
}
