import type { CartDraft, CartItem, CartTotals, CartVariant } from "@/types/cart";

export function createLineId(productId: string, sizeLabel: string): string {
  return `${productId}::${sizeLabel}`;
}

export function addCartItem(items: CartItem[], draft: CartDraft): CartItem[] {
  const sizeLabel = draft.sizeLabel;
  const lineId = createLineId(draft.productId, sizeLabel);
  const incomingQty = Math.max(1, draft.quantity ?? 1);
  const variant = draft.variants.find((item) => item.label === sizeLabel);
  const stock = variant?.stock ?? Number.POSITIVE_INFINITY;

  const existing = items.find((item) => item.lineId === lineId);

  if (existing) {
    return items.map((item) =>
      item.lineId === lineId
        ? {
            ...item,
            quantity: Math.min(item.quantity + incomingQty, stock),
          }
        : item,
    );
  }

  return [
    ...items,
    {
      lineId,
      productId: draft.productId,
      slug: draft.slug,
      name: draft.name,
      brand: draft.brand,
      image: draft.image,
      sizeLabel,
      volumeMl: draft.volumeMl,
      price: draft.price,
      compareAtPrice: draft.compareAtPrice,
      quantity: Math.min(incomingQty, stock),
      variants: draft.variants,
    },
  ];
}

export function removeCartItem(items: CartItem[], lineId: string): CartItem[] {
  return items.filter((item) => item.lineId !== lineId);
}

export function updateCartQuantity(
  items: CartItem[],
  lineId: string,
  quantity: number,
): CartItem[] {
  if (quantity <= 0) {
    return removeCartItem(items, lineId);
  }

  return items.map((item) => {
    if (item.lineId !== lineId) {
      return item;
    }

    const variant = item.variants.find((option) => option.label === item.sizeLabel);
    const stock = variant?.stock ?? quantity;

    return {
      ...item,
      quantity: Math.min(quantity, stock),
    };
  });
}

export function changeCartVariant(
  items: CartItem[],
  lineId: string,
  variant: CartVariant,
): CartItem[] {
  const current = items.find((item) => item.lineId === lineId);

  if (!current || current.sizeLabel === variant.label) {
    return items;
  }

  const withoutCurrent = removeCartItem(items, lineId);

  return addCartItem(withoutCurrent, {
    productId: current.productId,
    slug: current.slug,
    name: current.name,
    brand: current.brand,
    image: current.image,
    sizeLabel: variant.label,
    volumeMl: variant.volumeMl,
    price: variant.price,
    compareAtPrice: variant.compareAtPrice,
    quantity: Math.min(current.quantity, variant.stock),
    variants: current.variants,
  });
}

export function clearCartItems(): CartItem[] {
  return [];
}

export function getCartTotals(items: CartItem[]): CartTotals {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    itemCount,
    subtotal,
    total: subtotal,
  };
}
