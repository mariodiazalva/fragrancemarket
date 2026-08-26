import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { combosComingSoon } from "@/data/combos";
import { typeLabels } from "@/lib/catalog";
import { getProductHref } from "@/lib/product";
import {
  breadcrumbJsonLd,
  createProductMetadata,
  productJsonLd,
} from "@/lib/seo";
import {
  getMatchingFullBottle,
  getProductBySlug,
  getProductSlugs,
  getRelatedProducts,
} from "@/services/product.service";
import { getFragranceSetBySlug } from "@/services/set.service";
import { ProductView } from "@/views/product/ProductView";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || (combosComingSoon && product.type === "set")) {
    return { title: "Producto", robots: { index: false, follow: false } };
  }

  return createProductMetadata(product);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || (combosComingSoon && product.type === "set")) {
    notFound();
  }

  const [related, fullBottle, fragranceSet] = await Promise.all([
    getRelatedProducts(product),
    getMatchingFullBottle(product),
    getFragranceSetBySlug(product.slug),
  ]);

  const catalogPath =
    product.type === "perfume"
      ? "/perfumes"
      : product.type === "decant"
        ? "/decants"
        : "/combos";

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: typeLabels[product.type], path: catalogPath },
          { name: product.name, path: getProductHref(product.slug) },
        ])}
      />
      <JsonLd data={productJsonLd(product)} />
      <ProductView
        product={product}
        related={related}
        fullBottle={fullBottle}
        fragranceSet={fragranceSet}
      />
    </>
  );
}
