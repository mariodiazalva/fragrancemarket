"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { isAdminRoute } from "@/lib/admin";

type StoreChromeProps = {
  children: ReactNode;
};

export function StoreChrome({ children }: StoreChromeProps) {
  const pathname = usePathname() ?? "";

  if (isAdminRoute(pathname)) {
    return (
      <div className="flex min-h-full min-w-0 flex-col overflow-x-clip bg-background text-foreground">
        {children}
      </div>
    );
  }

  return (
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
      <ScrollReveal />
      <CartDrawer />
    </div>
  );
}
