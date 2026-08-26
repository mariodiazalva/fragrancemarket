import { listFaqs } from "@/data-access/faq";
import { listDemoReviews } from "@/data-access/reviews";
import type { DemoReview, FaqItem } from "@/types/content";

export async function getDemoReviews(): Promise<DemoReview[]> {
  return listDemoReviews();
}

export async function getFaqs(): Promise<FaqItem[]> {
  return listFaqs();
}
