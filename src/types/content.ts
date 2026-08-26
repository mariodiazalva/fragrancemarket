import type { Product } from "./product";

export type SetItem = {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  sizeLabel: string;
  individualPrice: number;
};

export type FragranceSet = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number;
  image: string;
  items: SetItem[];
};

export type DemoReview = {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  productName: string;
  isDemo: true;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type HomeLinkCard = {
  id: string;
  title: string;
  description?: string;
  href: string;
  image?: string;
  cta?: string;
};

export type FragranceCollection = {
  id: string;
  name: string;
  slug: string;
  description: string;
  products: Product[];
};
