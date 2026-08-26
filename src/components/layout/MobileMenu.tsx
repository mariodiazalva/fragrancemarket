"use client";

import Link from "next/link";
import { useEffect, useId, useRef, type CSSProperties } from "react";

import { CloseIcon, UserIcon } from "@/components/layout/icons";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { headerActions, type NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  items: NavItem[];
  activeHref?: string;
  onClose: () => void;
  isItemActive: (item: NavItem) => boolean;
};

export function MobileMenu({
  open,
  items,
  onClose,
  isItemActive,
}: MobileMenuProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const accountAction = headerActions.find((action) => action.showInMobileMenu);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] xl:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Cerrar menú"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-elova-black/70 transition-opacity duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <nav
        id="mobile-menu"
        data-open={open ? "true" : "false"}
        aria-labelledby={titleId}
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "mobile-nav absolute inset-y-0 left-0 flex w-full max-w-[22rem] flex-col border-r border-elova-border bg-elova-cream pt-[env(safe-area-inset-top)] transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-elova-border px-4 py-4 sm:px-5">
          <SiteLogo onNavigate={onClose} />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="inline-flex size-12 items-center justify-center text-text-primary transition-opacity duration-200 hover:opacity-70"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <p id={titleId} className="sr-only">
          Navegación principal
        </p>

        <ul className="flex flex-1 flex-col overflow-y-auto px-5 py-4">
          {items.map((item, index) => {
            const active = isItemActive(item);

            return (
              <li key={item.id} style={{ "--i": index } as CSSProperties}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-14 touch-manipulation items-center border-b border-elova-border-subtle font-serif text-2xl font-bold tracking-[-0.02em] transition-colors duration-200",
                    active
                      ? "text-elova-gold"
                      : "text-text-primary hover:text-elova-gold",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {accountAction?.href ? (
          <div className="border-t border-elova-border px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <Link
              href={accountAction.href}
              onClick={onClose}
              className="inline-flex min-h-12 items-center gap-3 text-xs uppercase tracking-[0.18em] text-text-secondary transition-colors duration-200 hover:text-elova-gold"
            >
              <UserIcon className="size-5" />
              {accountAction.label}
            </Link>
          </div>
        ) : null}
      </nav>
    </div>
  );
}
