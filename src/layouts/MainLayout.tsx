import type { ReactNode } from "react";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartProvider";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <CartProvider>
      <div className="flex min-h-full min-w-0 flex-col overflow-x-clip bg-background text-foreground">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-elova-black focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>

        <div className="sticky top-0 z-50">
          <AnnouncementBar />
          <Header />
        </div>

        <div id="contenido" className="flex flex-1 flex-col">
          {children}
        </div>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
