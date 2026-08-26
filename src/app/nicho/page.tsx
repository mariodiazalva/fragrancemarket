import { CatalogPage } from "@/views/catalog/CatalogPage";
import { createCatalogMetadata } from "@/lib/seo";

export const metadata = createCatalogMetadata("nicho");

export default async function NichoPage({
  searchParams,
}: PageProps<"/nicho">) {
  return <CatalogPage route="nicho" searchParams={searchParams} />;
}
