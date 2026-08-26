import { mockFaqs } from "@/data/faq";
import type { FaqItem } from "@/types/content";

export function listFaqsFromMock(): FaqItem[] {
  return mockFaqs;
}
