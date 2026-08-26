import type { ReactNode } from "react";

import { CartProvider } from "@/components/cart/CartProvider";
import { StoreChrome } from "@/layouts/StoreChrome";

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <CartProvider>
      <StoreChrome>{children}</StoreChrome>
    </CartProvider>
  );
}
