import {
  addCartItem,
  changeCartVariant,
  clearCartItems,
  getCartTotals,
  removeCartItem,
  updateCartQuantity,
} from "@/lib/cart";
import { localCartStorage, type CartStorage } from "@/services/cart.storage";
import type { CartDraft, CartItem, CartTotals, CartVariant } from "@/types/cart";

const EMPTY_ITEMS: CartItem[] = [];

let storage: CartStorage = localCartStorage;
let items: CartItem[] = EMPTY_ITEMS;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function commit(next: CartItem[]) {
  items = next;
  if (hydrated) {
    storage.write(items);
  }
  emit();
}

export function configureCartStorage(adapter: CartStorage) {
  storage = adapter;
}

export function hydrateCart() {
  if (hydrated) {
    return;
  }

  hydrated = true;
  items = storage.read();
  emit();
}

export function subscribeCart(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getCartItems(): CartItem[] {
  return items;
}

export function getServerCartItems(): CartItem[] {
  return EMPTY_ITEMS;
}

export function isCartHydrated() {
  return hydrated;
}

export function addItemToCart(draft: CartDraft) {
  commit(addCartItem(items, draft));
}

export function removeItemFromCart(lineId: string) {
  commit(removeCartItem(items, lineId));
}

export function updateItemQuantity(lineId: string, quantity: number) {
  commit(updateCartQuantity(items, lineId, quantity));
}

export function changeItemVariant(lineId: string, variant: CartVariant) {
  commit(changeCartVariant(items, lineId, variant));
}

export function clearCart() {
  commit(clearCartItems());
}

export function readCartTotals(): CartTotals {
  return getCartTotals(items);
}
