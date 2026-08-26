import type { CartItem, CartVariant } from "@/types/cart";

export const CART_STORAGE_KEY = "elova.cart.v1";

export type CartStorage = {
  read: () => CartItem[];
  write: (items: CartItem[]) => void;
};

function canUseBrowserStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function isCartVariant(value: unknown): value is CartVariant {
  if (!value || typeof value !== "object") {
    return false;
  }

  const variant = value as CartVariant;

  return (
    typeof variant.label === "string" &&
    typeof variant.volumeMl === "number" &&
    typeof variant.price === "number" &&
    typeof variant.stock === "number"
  );
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as CartItem;

  return (
    typeof item.lineId === "string" &&
    typeof item.productId === "string" &&
    typeof item.slug === "string" &&
    typeof item.name === "string" &&
    typeof item.brand === "string" &&
    typeof item.sizeLabel === "string" &&
    typeof item.volumeMl === "number" &&
    typeof item.price === "number" &&
    typeof item.quantity === "number" &&
    Array.isArray(item.variants) &&
    item.variants.every(isCartVariant)
  );
}

export function parseCartItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isCartItem);
}

export const localCartStorage: CartStorage = {
  read() {
    if (!canUseBrowserStorage()) {
      return [];
    }

    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      return raw ? parseCartItems(JSON.parse(raw)) : [];
    } catch {
      return [];
    }
  },
  write(items) {
    if (!canUseBrowserStorage()) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  },
};
