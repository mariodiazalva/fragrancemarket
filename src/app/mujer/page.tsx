import { CatalogPage } from "@/views/catalog/CatalogPage";
import { createCatalogMetadata } from "@/lib/seo";

export const metadata = createCatalogMetadata("mujer");

export default async function MujerPage({
  searchParams,
}: PageProps<"/mujer">) {
  return <CatalogPage route="mujer" searchParams={searchParams} />;
}
