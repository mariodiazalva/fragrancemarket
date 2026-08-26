import { CatalogPage } from "@/views/catalog/CatalogPage";
import { createCatalogMetadata } from "@/lib/seo";

export const metadata = createCatalogMetadata("perfumes");

export default async function PerfumesPage({
  searchParams,
}: PageProps<"/perfumes">) {
  return <CatalogPage route="perfumes" searchParams={searchParams} />;
}
