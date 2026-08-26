"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import {
  catalogQueryToSearchParams,
  categoryLabels,
  defaultFilterGroups,
  genderLabels,
  occasionLabels,
  styleCategories,
  typeLabels,
  type CatalogFilterGroup,
  type CatalogPageConfig,
  type OccasionSlug,
} from "@/lib/catalog";
import type { CatalogFacets, CatalogQuery } from "@/types";

type CatalogFiltersProps = {
  pathname: string;
  query: CatalogQuery;
  facets: CatalogFacets;
  config: CatalogPageConfig;
};

export function CatalogFilters({
  pathname,
  query,
  facets,
  config,
}: CatalogFiltersProps) {
  const router = useRouter();
  const groups = config.filterGroups ?? defaultFilterGroups;
  const [minPrice, setMinPrice] = useState(query.minPrice?.toString() ?? "");
  const [maxPrice, setMaxPrice] = useState(query.maxPrice?.toString() ?? "");
  const styleOptions = facets.categories.filter((category) =>
    styleCategories.includes(category as (typeof styleCategories)[number]),
  );

  function show(group: CatalogFilterGroup) {
    return groups.includes(group);
  }

  function updateQuery(next: CatalogQuery) {
    const params = catalogQueryToSearchParams(next, config.locked);
    const search = params.toString();
    router.push(search ? `${pathname}?${search}` : pathname);
  }

  function setField<K extends keyof CatalogQuery>(field: K, value: CatalogQuery[K]) {
    updateQuery({
      ...query,
      ...config.preset,
      [field]: value || undefined,
    });
  }

  function applyPrice() {
    updateQuery({
      ...query,
      ...config.preset,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  }

  function clearFilters() {
    setMinPrice("");
    setMaxPrice("");
    updateQuery({
      ...config.preset,
      sort: query.sort,
    });
  }

  return (
    <form
      className="space-y-8"
      onSubmit={(event) => {
        event.preventDefault();
        applyPrice();
      }}
    >
      {show("gender") && !config.locked.includes("gender") && facets.genders.length > 1 ? (
        <FilterGroup legend="Género">
          <ChoiceList
            name="gender"
            value={query.gender}
            options={facets.genders.map((value) => ({
              value,
              label: genderLabels[value],
            }))}
            onChange={(value) => setField("gender", value as CatalogQuery["gender"])}
          />
        </FilterGroup>
      ) : null}

      {show("brand") && facets.brands.length > 0 ? (
        <FilterGroup legend="Marca">
          <ChoiceList
            name="brand"
            value={query.brand}
            options={facets.brands.map((value) => ({ value, label: value }))}
            onChange={(value) => setField("brand", value)}
          />
        </FilterGroup>
      ) : null}

      {show("price") ? (
      <FilterGroup legend="Precio">
        <div className="grid grid-cols-2 gap-2">
          <label className="space-y-2">
            <span className="sr-only">Precio mínimo</span>
            <input
              type="number"
              min={0}
              inputMode="numeric"
              placeholder="Mín."
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              className="h-11 w-full min-w-0 border border-elova-border bg-surface px-3 text-base text-text-primary placeholder:text-text-secondary/70 focus:border-elova-gold/50 focus:outline-none sm:text-sm"
            />
          </label>
          <label className="space-y-2">
            <span className="sr-only">Precio máximo</span>
            <input
              type="number"
              min={0}
              inputMode="numeric"
              placeholder="Máx."
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              className="h-11 w-full min-w-0 border border-elova-border bg-surface px-3 text-base text-text-primary placeholder:text-text-secondary/70 focus:border-elova-gold/50 focus:outline-none sm:text-sm"
            />
          </label>
        </div>
        <Button type="submit" variant="outline" size="sm" fullWidth>
          Aplicar precio
        </Button>
      </FilterGroup>
      ) : null}

      {show("category") && styleOptions.length > 0 ? (
        <FilterGroup legend="Estilo">
          <ChoiceList
            name="category"
            value={query.category}
            options={styleOptions.map((value) => ({
              value,
              label: categoryLabels[value] ?? value,
            }))}
            onChange={(value) =>
              setField("category", value as CatalogQuery["category"])
            }
          />
        </FilterGroup>
      ) : null}

      {show("type") && !config.locked.includes("type") && facets.types.length > 1 ? (
        <FilterGroup legend="Tipo">
          <ChoiceList
            name="type"
            value={query.type}
            options={facets.types.map((value) => ({
              value,
              label: typeLabels[value],
            }))}
            onChange={(value) => setField("type", value as CatalogQuery["type"])}
          />
        </FilterGroup>
      ) : null}

      {show("family") && facets.families.length > 0 ? (
        <FilterGroup legend="Familia olfativa">
          <ChoiceList
            name="family"
            value={query.fragranceFamily}
            options={facets.families.map((value) => ({
              value,
              label: value,
            }))}
            onChange={(value) => setField("fragranceFamily", value)}
          />
        </FilterGroup>
      ) : null}

      {show("occasion") && facets.occasions.length > 0 ? (
        <FilterGroup legend="Ocasión">
          <ChoiceList
            name="occasion"
            value={query.occasion}
            options={facets.occasions.map((value) => ({
              value,
              label: occasionLabels[value as OccasionSlug] ?? value,
            }))}
            onChange={(value) => setField("occasion", value)}
          />
        </FilterGroup>
      ) : null}

      {show("size") && facets.sizes.length > 0 ? (
        <FilterGroup legend="Tamaño">
          <ChoiceList
            name="size"
            value={query.size?.toString()}
            options={facets.sizes.map((value) => ({
              value: String(value),
              label: `${value} ml`,
            }))}
            onChange={(value) =>
              setField("size", value ? Number(value) : undefined)
            }
          />
        </FilterGroup>
      ) : null}

      <Button type="button" variant="ghost" size="sm" fullWidth onClick={clearFilters}>
        Limpiar filtros
      </Button>
    </form>
  );
}

function FilterGroup({
  legend,
  children,
}: {
  legend: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-[0.7rem] uppercase tracking-[0.2em] text-text-secondary">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

function ChoiceList({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value?: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value?: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="flex min-h-11 items-center gap-3 text-sm text-text-primary">
        <input
          type="radio"
          name={name}
          checked={!value}
          onChange={() => onChange(undefined)}
          className="accent-elova-gold"
        />
        Todos
      </label>
      {options.map((option) => (
        <label
          key={option.value}
          className="flex min-h-11 items-center gap-3 text-sm capitalize text-text-primary"
        >
          <input
            type="radio"
            name={name}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="accent-elova-gold"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
