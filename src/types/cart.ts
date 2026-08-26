export type CartVariant = {
  label: string;
  volumeMl: number;
  price: number;
  compareAtPrice?: number;
  stock: number;
};

export type CartItem = {
  lineId: string;
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image?: string;
  sizeLabel: string;
  volumeMl: number;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  variants: CartVariant[];
};

export type CartDraft = {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image?: string;
  sizeLabel: string;
  volumeMl: number;
  price: number;
  compareAtPrice?: number;
  quantity?: number;
  variants: CartVariant[];
};

export type CartTotals = {
  itemCount: number;
  subtotal: number;
  total: number;
};
