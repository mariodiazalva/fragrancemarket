import { CatalogPage } from "@/views/catalog/CatalogPage";
import { createCatalogMetadata } from "@/lib/seo";

export const metadata = createCatalogMetadata("unisex");

export default async function UnisexPage({
  searchParams,
}: PageProps<"/unisex">) {
  return <CatalogPage route="unisex" searchParams={searchParams} />;
}
