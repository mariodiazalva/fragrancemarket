import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import {
  getCollectionSlugs,
  getFragranceCollectionBySlug,
} from "@/services/collection.service";
import { CollectionView } from "@/views/collection/CollectionView";

export const revalidate = 60;

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getFragranceCollectionBySlug(slug);

  if (!collection) {
    return { title: "Colección", robots: { index: false, follow: false } };
  }

  return createPageMetadata({
    title: collection.name,
    description: collection.description || `Colección ${collection.name} en Fragrance Market.`,
    path: `/colecciones/${collection.slug}`,
  });
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = await getFragranceCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: collection.name, path: `/colecciones/${collection.slug}` },
        ])}
      />
      <CollectionView collection={collection} />
    </>
  );
}
