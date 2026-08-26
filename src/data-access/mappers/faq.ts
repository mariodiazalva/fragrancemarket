import type { FaqItem } from "@/types/content";

export type FaqQueryRow = {
  id: string;
  question: string;
  answer: string;
};

export function mapFaqRow(row: FaqQueryRow): FaqItem {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
  };
}
