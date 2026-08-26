import { CatalogPage } from "@/views/catalog/CatalogPage";
import { createCatalogMetadata } from "@/lib/seo";

export const metadata = createCatalogMetadata("disenador");

export default async function DisenadorPage({
  searchParams,
}: PageProps<"/disenador">) {
  return <CatalogPage route="disenador" searchParams={searchParams} />;
}
