type NamedRelation = { name: string } | { name: string }[] | null;
type SluggedRelation = { slug: string } | { slug: string }[] | null;

export type ProductQueryRow = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  type: string;
  gender: string;
  price: number | string;
  compare_at_price: number | string | null;
  stock: number;
  fragrance_family: string[] | null;
  occasions: string[] | null;
  intensity: number | null;
  seo_title?: string | null;
  seo_description?: string | null;
  rating: number | string | null;
  rating_count: number | null;
  featured: boolean;
  bestseller: boolean;
  created_at: string;
  updated_at: string;
  brands: NamedRelation;
  categories: SluggedRelation;
  product_variants:
    | {
        label: string;
        volume_ml: number;
        price: number | string;
        compare_at_price: number | string | null;
        stock: number;
        sku: string | null;
        sort_order: number | null;
      }[]
    | null;
  product_images:
    | {
        url: string;
        alt: string | null;
        position: number | null;
      }[]
    | null;
  product_notes?:
    | {
        stage: string;
        position: number | null;
        fragrance_notes: NamedRelation;
      }[]
    | null;
};
