import { ProductGrid } from "@/components/catalog/ProductGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { catalogPages, parseCatalogParams } from "@/lib/catalog";
import { breadcrumbJsonLd } from "@/lib/seo";
import { getCatalog } from "@/services/product.service";
import { CatalogView } from "@/views/catalog/CatalogView";
import { DecantsGuide } from "@/views/decants/DecantsGuide";
import { DecantsHero } from "@/views/decants/DecantsHero";

type DecantsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function DecantsExperience({ searchParams }: DecantsPageProps) {
  const params = await searchParams;
  const config = catalogPages.decants;
  const parsed = parseCatalogParams(params);
  const query = {
    ...parsed,
    ...config.preset,
    sort: parsed.sort ?? "recommended",
  };
  const result = await getCatalog(query, { facetFilters: config.preset });

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: config.title, path: "/decants" },
        ])}
      />
      <DecantsHero />
      <DecantsGuide activeSize={query.size} />
      <div id="catalogo">
        <CatalogView
          as="div"
          hideHeader
          pathname="/decants"
          config={config}
          query={query}
          facets={result.facets}
          total={result.total}
        >
          <h2 className="sr-only">Catálogo de decants</h2>
          <ProductGrid products={result.products} headingLevel="h3" />
        </CatalogView>
      </div>
    </main>
  );
}
