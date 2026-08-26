"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { SearchAutocomplete } from "@/components/search/SearchAutocomplete";
import { Button } from "@/components/ui/Button";
import {
  catalogQueryToSearchParams,
  sortOptions,
  type CatalogPageConfig,
} from "@/lib/catalog";
import type { CatalogQuery, ProductSort } from "@/types";

type CatalogToolbarProps = {
  pathname: string;
  query: CatalogQuery;
  config: CatalogPageConfig;
  total: number;
  onOpenFilters?: () => void;
};

export function CatalogToolbar({
  pathname,
  query,
  config,
  total,
  onOpenFilters,
}: CatalogToolbarProps) {
  const router = useRouter();
  const [search, setSearch] = useState(query.query ?? "");

  function pushQuery(next: CatalogQuery) {
    const params = catalogQueryToSearchParams(next, config.locked);
    const searchString = params.toString();
    router.push(searchString ? `${pathname}?${searchString}` : pathname);
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <form
        role="search"
        className="w-full min-w-0 lg:max-w-md"
        onSubmit={(event) => {
          event.preventDefault();
          pushQuery({
            ...query,
            ...config.preset,
            query: search.trim() || undefined,
          });
        }}
      >
        <label
          htmlFor="catalog-search"
          className="text-[0.7rem] uppercase tracking-[0.18em] text-text-secondary"
        >
          Buscar
        </label>
        <div className="mt-2">
          <SearchAutocomplete
            id="catalog-search"
            value={search}
            onChange={setSearch}
            placeholder="Nombre o marca"
          />
        </div>
      </form>

      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.16em] text-text-secondary">
            {total} {total === 1 ? "pieza" : "piezas"}
          </p>

          {onOpenFilters ? (
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={onOpenFilters}
            >
              Filtros
            </Button>
          ) : null}
        </div>

        <label className="flex min-w-0 items-center gap-3 text-xs uppercase tracking-[0.16em] text-text-secondary">
          <span className="shrink-0">Orden</span>
          <select
            value={query.sort ?? "recommended"}
            onChange={(event) =>
              pushQuery({
                ...query,
                ...config.preset,
                sort: event.target.value as ProductSort,
              })
            }
            className="h-11 min-w-0 flex-1 border border-elova-border bg-surface px-3 text-base uppercase tracking-[0.08em] text-text-primary focus:border-elova-gold/50 focus:outline-none sm:flex-none sm:text-xs sm:tracking-[0.14em]"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
