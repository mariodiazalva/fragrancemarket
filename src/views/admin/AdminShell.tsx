"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { adminNavigation } from "@/lib/admin";
import { cn } from "@/lib/utils";
import { signOutAdminAction } from "@/services/auth.actions";

type AdminShellProps = {
  email: string | null;
  children: ReactNode;
};

export function AdminShell({ email, children }: AdminShellProps) {
  const pathname = usePathname() ?? "/admin";

  return (
    <div className="flex min-h-full min-w-0 flex-col bg-[#f4f4f4] lg:flex-row">
      <aside className="theme-ink shrink-0 border-b border-elova-border bg-elova-black lg:flex lg:w-64 lg:flex-col lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-4 px-5 py-4 lg:block lg:px-6 lg:py-6">
          <Link href="/admin" className="block min-w-0">
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-white">
              Fragrance Market
            </p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-text-secondary">
              Intranet
            </p>
          </Link>
          <Link
            href="/"
            className="text-[0.65rem] uppercase tracking-[0.14em] text-text-secondary hover:text-white lg:mt-4 lg:inline-block"
          >
            Ver tienda
          </Link>
        </div>

        <nav
          aria-label="Intranet"
          className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:overflow-visible lg:px-3 lg:pb-0"
        >
          {adminNavigation.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 px-3 py-2 text-[0.7rem] uppercase tracking-[0.16em] transition-colors",
                  active
                    ? "bg-white text-black"
                    : "text-text-secondary hover:bg-white/10 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden border-t border-elova-border px-6 py-5 lg:block">
          {email ? (
            <>
              <p className="truncate text-xs text-white">{email}</p>
              <form action={signOutAdminAction} className="mt-4">
                <Button type="submit" variant="outline" size="sm">
                  Salir
                </Button>
              </form>
            </>
          ) : (
            <p className="text-xs text-text-secondary">Solo acceso de administrador.</p>
          )}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {email ? (
          <div className="flex items-center justify-between gap-3 border-b border-elova-border bg-white px-4 py-3 lg:hidden">
            <p className="truncate text-xs text-text-primary">{email}</p>
            <form action={signOutAdminAction}>
              <Button type="submit" variant="outline" size="sm">
                Salir
              </Button>
            </form>
          </div>
        ) : null}

        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </div>
    </div>
  );
}
