import { arabicWeekndPromo } from "@/data/promos";
import { createPageMetadata } from "@/lib/seo";
import { getPromoProducts } from "@/services/product.service";
import { PromosView } from "@/views/promos/PromosView";

export const metadata = createPageMetadata({
  title: `${arabicWeekndPromo.name} · Promos`,
  description: arabicWeekndPromo.description,
  path: "/promos",
});

export const revalidate = 60;

export default async function PromosPage() {
  const products = await getPromoProducts();
  return <PromosView products={products} />;
}
