"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { CatalogToolbar } from "@/components/catalog/CatalogToolbar";
import { CloseIcon } from "@/components/layout/icons";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { CatalogPageConfig } from "@/lib/catalog";
import { countActiveFilters } from "@/lib/catalog";
import type { CatalogFacets, CatalogQuery } from "@/types";

type CatalogViewProps = {
  pathname: string;
  config: CatalogPageConfig;
  query: CatalogQuery;
  facets: CatalogFacets;
  total: number;
  children: ReactNode;
  hideHeader?: boolean;
  as?: "main" | "div";
};

export function CatalogView({
  pathname,
  config,
  query,
  facets,
  total,
  children,
  hideHeader = false,
  as = "main",
}: CatalogViewProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeFilters = countActiveFilters(query, config.locked);

  useEffect(() => {
    if (!filtersOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFiltersOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [filtersOpen]);

  const Wrapper = as;
  const catalogBody = (
    <div className="mt-8 grid min-w-0 gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="hidden lg:block">
        <CatalogFilters
          pathname={pathname}
          query={query}
          facets={facets}
          config={config}
        />
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );

  const filtersOverlay = (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <button
        type="button"
        aria-label="Cerrar filtros"
        onClick={() => setFiltersOpen(false)}
        className="absolute inset-0 bg-elova-black/70"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="catalog-filters-title"
        className="absolute inset-x-0 bottom-0 flex max-h-[88svh] w-full flex-col border-t border-elova-border bg-elova-cream"
      >
        <div className="flex items-center justify-between border-b border-elova-border px-4 py-3 sm:px-5">
          <p
            id="catalog-filters-title"
            className="text-xs uppercase tracking-[0.2em] text-text-primary"
          >
            Filtros
          </p>
          <button
            type="button"
            aria-label="Cerrar filtros"
            onClick={() => setFiltersOpen(false)}
            className="inline-flex size-11 items-center justify-center text-text-primary hover:text-elova-gold"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>
        <div className="overflow-y-auto px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-5">
          <CatalogFilters
            pathname={pathname}
            query={query}
            facets={facets}
            config={config}
          />
        </div>
      </div>
    </div>
  );

  return (
    <Wrapper className={as === "main" ? "pb-20 pt-10 sm:pt-14" : "pb-20 pt-6"}>
      <Container>
        {hideHeader ? null : (
          <div className="elova-fade-up">
            <p className="text-xs uppercase tracking-[0.35em] text-elova-gold">
              Catálogo
            </p>
            <h1 className="mt-4 font-serif text-[2rem] font-bold tracking-[-0.02em] text-text-primary sm:text-4xl lg:text-5xl">
              {config.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary">
              {config.description}
            </p>
          </div>
        )}

        <div className={hideHeader ? "relative z-20" : "relative z-20 mt-10"}>
          <CatalogToolbar
            pathname={pathname}
            query={query}
            config={config}
            total={total}
            onOpenFilters={() => setFiltersOpen(true)}
          />
        </div>

        {activeFilters > 0 ? (
          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-elova-gold">
            {activeFilters} {activeFilters === 1 ? "filtro activo" : "filtros activos"}
          </p>
        ) : null}

        {hideHeader ? catalogBody : <Reveal>{catalogBody}</Reveal>}
      </Container>

      {filtersOpen ? createPortal(filtersOverlay, document.body) : null}
    </Wrapper>
  );
}
