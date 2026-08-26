import type { MetadataRoute } from "next";

import { getProductHref } from "@/lib/product";
import { absoluteUrl, INDEXABLE_PATHS } from "@/lib/seo";
import { getProductSlugs } from "@/services/product.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productSlugs = await getProductSlugs();
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = INDEXABLE_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const products: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: absoluteUrl(getProductHref(slug)),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...pages, ...products];
}
