"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { getCartTotals } from "@/lib/cart";
import {
  addItemToCart,
  changeItemVariant,
  clearCart,
  getCartItems,
  getServerCartItems,
  hydrateCart,
  isCartHydrated,
  removeItemFromCart,
  subscribeCart,
  updateItemQuantity,
} from "@/lib/cart-store";
import { readStoredCoupon, writeStoredCoupon } from "@/services/coupon.storage";
import type { CartDraft, CartItem, CartTotals, CartVariant } from "@/types/cart";

type AddToCartOptions = {
  openDrawer?: boolean;
};

type CartContextValue = {
  items: CartItem[];
  totals: CartTotals;
  ready: boolean;
  isOpen: boolean;
  justAdded: boolean;
  add: (draft: CartDraft, options?: AddToCartOptions) => void;
  remove: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  changeVariant: (lineId: string, variant: CartVariant) => void;
  clear: () => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribeCart, getCartItems, getServerCartItems);
  const ready = useSyncExternalStore(subscribeCart, isCartHydrated, () => false);
  const [isOpen, setIsOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [couponCode, setCouponCodeState] = useState("");
  const addedTimer = useRef<number>(0);

  useEffect(() => {
    hydrateCart();
    setCouponCodeState(readStoredCoupon());
  }, []);

  useEffect(() => {
    return () => window.clearTimeout(addedTimer.current);
  }, []);

  const markAdded = useCallback(() => {
    setJustAdded(true);
    window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => {
      setJustAdded(false);
    }, 4000);
  }, []);

  const add = useCallback(
    (draft: CartDraft, options?: AddToCartOptions) => {
      addItemToCart(draft);

      if (options?.openDrawer === false) {
        return;
      }

      setIsOpen(true);
      markAdded();
    },
    [markAdded],
  );

  const remove = useCallback((lineId: string) => {
    removeItemFromCart(lineId);
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    updateItemQuantity(lineId, quantity);
  }, []);

  const changeVariant = useCallback((lineId: string, variant: CartVariant) => {
    changeItemVariant(lineId, variant);
  }, []);

  const clear = useCallback(() => {
    clearCart();
  }, []);

  const setCouponCode = useCallback((next: string) => {
    setCouponCodeState(next);
    writeStoredCoupon(next);
  }, []);

  const openCart = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  const totals = useMemo(() => getCartTotals(items), [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totals,
      ready,
      isOpen,
      justAdded,
      add,
      remove,
      updateQuantity,
      changeVariant,
      clear,
      couponCode,
      setCouponCode,
      openCart,
      closeCart,
    }),
    [
      add,
      changeVariant,
      clear,
      closeCart,
      couponCode,
      isOpen,
      items,
      justAdded,
      openCart,
      ready,
      remove,
      setCouponCode,
      totals,
      updateQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider.");
  }

  return context;
}
