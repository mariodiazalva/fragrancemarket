"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import {
  BagIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/layout/icons";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { SearchAutocomplete } from "@/components/search/SearchAutocomplete";
import { Container } from "@/components/ui/Container";
import { useCart } from "@/hooks/useCart";
import {
  headerActions,
  isNavItemActive,
  mainNavigation,
  mobileNavigation,
  type HeaderAction,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

type HeaderInnerProps = {
  pathname: string;
};

const actionIcons: Record<string, typeof SearchIcon> = {
  search: SearchIcon,
  account: UserIcon,
  cart: BagIcon,
};

export function Header() {
  const pathname = usePathname() ?? "";

  return <HeaderInner key={pathname} pathname={pathname} />;
}

function HeaderInner({ pathname }: HeaderInnerProps) {
  const router = useRouter();
  const searchTitleId = useId();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { totals, ready, isOpen, openCart } = useCart();
  const cartCount = ready ? totals.itemCount : 0;
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    searchInputRef.current?.focus();

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [searchOpen]);

  const closeOverlays = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const toggleMenu = () => {
    setSearchOpen(false);
    setMenuOpen((open) => !open);
  };

  const toggleSearch = () => {
    setMenuOpen(false);
    setSearchOpen((open) => !open);
  };

  const renderAction = (action: HeaderAction, opts?: { mobile?: boolean }) => {
    if (opts?.mobile && action.hideOnMobile) {
      return null;
    }

    const Icon = actionIcons[action.id] ?? SearchIcon;
    const className = cn(
      "relative inline-flex size-11 items-center justify-center text-text-primary transition-opacity duration-200 hover:opacity-70",
      action.id === "search" && searchOpen && "text-elova-gold",
    );

    if (action.type === "cart") {
      return (
        <button
          key={action.id}
          type="button"
          aria-label={action.label}
          aria-expanded={isOpen}
          aria-controls="cart-drawer"
          title={action.label}
          onClick={() => {
            closeOverlays();
            openCart();
          }}
          className={className}
        >
          <Icon className="size-5" />
          {action.showBadge && cartCount > 0 ? (
            <span
              key={cartCount}
              className="cart-badge-pop absolute right-1.5 top-1.5 min-w-4 rounded-full bg-elova-gold px-1 text-center text-[0.6rem] leading-4 text-accent-foreground"
            >
              {cartCount}
            </span>
          ) : null}
        </button>
      );
    }

    if (action.type === "search") {
      return (
        <button
          key={action.id}
          type="button"
          aria-label={action.label}
          aria-expanded={searchOpen}
          aria-controls="header-search"
          title={action.label}
          onClick={toggleSearch}
          className={className}
        >
          <Icon className="size-5" />
        </button>
      );
    }

    if (!action.href) {
      return null;
    }

    return (
      <Link
        key={action.id}
        href={action.href}
        aria-label={action.label}
        title={action.label}
        className={className}
      >
        <Icon className="size-5" />
        {action.showBadge && cartCount > 0 ? (
          <span className="absolute right-1.5 top-1.5 min-w-4 rounded-full bg-elova-gold px-1 text-center text-[0.6rem] leading-4 text-accent-foreground">
            {cartCount}
          </span>
        ) : null}
      </Link>
    );
  };

  return (
    <header className="theme-ink border-b border-elova-border bg-elova-black">
      <Container size="wide" className="relative">
        <div className="flex h-16 min-w-0 items-center xl:hidden">
          <button
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
            className="inline-flex size-11 shrink-0 items-center justify-center text-text-primary transition-opacity duration-200 hover:opacity-70"
          >
            <MenuIcon className="size-5" />
          </button>

          <div className="flex min-w-0 flex-1 justify-center px-1">
            <SiteLogo onNavigate={closeOverlays} />
          </div>

          <div className="flex shrink-0 items-center">
            {headerActions.map((action) =>
              renderAction(action, { mobile: true }),
            )}
          </div>
        </div>

        <div className="hidden h-[4.5rem] min-w-0 items-center gap-4 xl:flex 2xl:gap-6">
          <SiteLogo />

          <nav aria-label="Principal" className="flex min-w-0 flex-1 justify-center">
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 2xl:gap-x-6">
              {mainNavigation.map((item) => {
                const active = isNavItemActive(pathname, item);

                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative py-2 text-[0.7rem] uppercase tracking-[0.18em] transition-colors duration-200",
                        active
                          ? "text-elova-gold"
                          : "text-text-secondary hover:text-text-primary",
                        "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-elova-gold after:transition-transform after:duration-200 after:content-['']",
                        active
                          ? "after:scale-x-100"
                          : "after:scale-x-0 hover:after:scale-x-100",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center">
            {headerActions.map((action) => renderAction(action))}
          </div>
        </div>
      </Container>

      <div
        id="header-search"
        hidden={!searchOpen}
        className="border-t border-elova-border bg-elova-graphite"
      >
        <Container size="wide" className="py-4">
          <form
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              const nextQuery = searchQuery.trim();
              const catalogPaths = [
                "/perfumes",
                "/decants",
                "/hombre",
                "/mujer",
                "/unisex",
                "/arabes",
                "/combos",
              ];
              const base = catalogPaths.includes(pathname)
                ? pathname
                : "/perfumes";
              router.push(
                nextQuery ? `${base}?q=${encodeURIComponent(nextQuery)}` : base,
              );
              setSearchOpen(false);
            }}
          >
            <label htmlFor={searchTitleId} className="sr-only">
              Buscar
            </label>
            <SearchAutocomplete
              id={searchTitleId}
              value={searchQuery}
              onChange={setSearchQuery}
              onSelect={() => {
                setSearchQuery("");
                setSearchOpen(false);
              }}
              inputRef={searchInputRef}
              showIcon
              placeholder="Buscar fragancias, decants o marcas"
            />
          </form>
        </Container>
      </div>

      <MobileMenu
        open={menuOpen}
        items={mobileNavigation}
        onClose={() => setMenuOpen(false)}
        isItemActive={(item) => isNavItemActive(pathname, item)}
      />
    </header>
  );
}
