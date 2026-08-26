import { ProductGrid } from "@/components/catalog/ProductGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  catalogPages,
  parseCatalogParams,
  type CatalogPageConfig,
  type CatalogRouteId,
} from "@/lib/catalog";
import { breadcrumbJsonLd } from "@/lib/seo";
import { getCatalog } from "@/services/product.service";
import { CatalogView } from "@/views/catalog/CatalogView";

type CatalogListingProps = {
  pathname: string;
  config: CatalogPageConfig;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

type CatalogPageProps = {
  route: CatalogRouteId;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function CatalogListing({
  pathname,
  config,
  searchParams,
}: CatalogListingProps) {
  const params = await searchParams;
  const parsed = parseCatalogParams(params);
  const query = {
    ...parsed,
    ...config.preset,
    sort: parsed.sort ?? "recommended",
  };
  const result = await getCatalog(query, { facetFilters: config.preset });

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: config.title, path: pathname },
        ])}
      />
      <CatalogView
        pathname={pathname}
        config={config}
        query={query}
        facets={result.facets}
        total={result.total}
      >
        <ProductGrid products={result.products} />
      </CatalogView>
    </>
  );
}

export async function CatalogPage({ route, searchParams }: CatalogPageProps) {
  return (
    <CatalogListing
      pathname={`/${route}`}
      config={catalogPages[route]}
      searchParams={searchParams}
    />
  );
}
