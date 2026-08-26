import type { DemoReview } from "@/types/content";

type NamedRelation = { name: string } | { name: string }[] | null;

export type ReviewQueryRow = {
  id: string;
  author_name: string;
  rating: number;
  title: string | null;
  body: string;
  is_demo: boolean;
  products: { name: string } | { name: string }[] | null;
};

function productName(value: NamedRelation): string {
  if (!value) {
    return "";
  }

  if (Array.isArray(value)) {
    return value[0]?.name ?? "";
  }

  return value.name;
}

export function mapReviewRow(row: ReviewQueryRow): DemoReview {
  return {
    id: row.id,
    author: row.author_name,
    rating: row.rating,
    title: row.title ?? "",
    body: row.body,
    productName: productName(row.products),
    isDemo: true,
  };
}
