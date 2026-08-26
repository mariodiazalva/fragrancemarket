import { CatalogPage } from "@/views/catalog/CatalogPage";
import { createCatalogMetadata } from "@/lib/seo";

export const metadata = createCatalogMetadata("hombre");

export default async function HombrePage({
  searchParams,
}: PageProps<"/hombre">) {
  return <CatalogPage route="hombre" searchParams={searchParams} />;
}
