import { getDemoReviews, getFaqs } from "@/services/content.service";
import { getFeaturedProducts } from "@/services/product.service";
import { getFragranceSets } from "@/services/set.service";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";
import { HomeView } from "@/views/home/HomeView";

export const revalidate = 60;

export const metadata = createPageMetadata({
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

export default async function Home() {
  const [featuredProducts, sets, reviews, faqs] = await Promise.all([
    getFeaturedProducts(8),
    getFragranceSets(),
    getDemoReviews(),
    getFaqs(),
  ]);

  return (
    <HomeView
      featuredProducts={featuredProducts}
      sets={sets}
      reviews={reviews}
      faqs={faqs}
    />
  );
}
