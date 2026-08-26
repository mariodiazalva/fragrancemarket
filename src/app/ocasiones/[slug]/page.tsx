import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  isOccasionSlug,
  occasionPages,
  occasionSlugs,
} from "@/lib/catalog";
import { createPageMetadata } from "@/lib/seo";
import { CatalogListing } from "@/views/catalog/CatalogPage";

export const revalidate = 60;

type OccasionPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export function generateStaticParams() {
  return occasionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: OccasionPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isOccasionSlug(slug)) {
    return { title: "Ocasión", robots: { index: false, follow: false } };
  }

  const config = occasionPages[slug];
  return createPageMetadata({
    title: config.title,
    description: config.description,
    path: `/ocasiones/${slug}`,
  });
}

export default async function OccasionPage({
  params,
  searchParams,
}: OccasionPageProps) {
  const { slug } = await params;

  if (!isOccasionSlug(slug)) {
    notFound();
  }

  return (
    <CatalogListing
      pathname={`/ocasiones/${slug}`}
      config={occasionPages[slug]}
      searchParams={searchParams}
    />
  );
}
