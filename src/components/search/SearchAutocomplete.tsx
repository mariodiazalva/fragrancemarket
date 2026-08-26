"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";

import { SearchIcon } from "@/components/layout/icons";
import { typeLabels } from "@/lib/catalog";
import { getProductHref } from "@/lib/product";
import { cn } from "@/lib/utils";
import type { ProductSearchSuggestion } from "@/types";

const MIN_QUERY_LENGTH = 2;

type SearchAutocompleteProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onSelect?: (suggestion: ProductSearchSuggestion) => void;
  placeholder?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  showIcon?: boolean;
  placement?: "inline" | "overlay";
};

function isSuggestionList(
  value: unknown,
): value is ProductSearchSuggestion[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        typeof item.slug === "string",
    )
  );
}

export function SearchAutocomplete({
  id,
  value,
  onChange,
  onSelect,
  placeholder,
  inputRef,
  showIcon = false,
  placement = "overlay",
}: SearchAutocompleteProps) {
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [suggestions, setSuggestions] = useState<ProductSearchSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const trimmed = value.trim();
  const canSearch = trimmed.length >= MIN_QUERY_LENGTH;
  const showPanel = open && canSearch;
  const activeSuggestion = activeIndex >= 0 ? suggestions[activeIndex] : undefined;

  useEffect(() => {
    if (!canSearch) {
      setSuggestions([]);
      setLoading(false);
      setActiveIndex(-1);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams({ q: trimmed });
        const response = await fetch(`/api/catalog/search?${params.toString()}`, {
          signal: controller.signal,
        });
        const data: unknown = response.ok ? await response.json() : [];
        const next = isSuggestionList(data) ? data : [];

        setSuggestions(next);
        setActiveIndex(-1);
        setOpen(true);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setSuggestions([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 200);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [canSearch, trimmed]);

  useEffect(() => {
    if (!showPanel) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) {
        return;
      }

      setOpen(false);
      setActiveIndex(-1);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [showPanel]);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape" && showPanel) {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (!showPanel || suggestions.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % suggestions.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        index <= 0 ? suggestions.length - 1 : index - 1,
      );
      return;
    }

    if (event.key === "Enter" && activeSuggestion) {
      event.preventDefault();
      onSelect?.(activeSuggestion);
      router.push(getProductHref(activeSuggestion.slug));
    }
  }

  const listClassName =
    placement === "inline"
      ? "mt-3 max-h-[min(24rem,70vh)] overflow-y-auto border-t border-elova-border"
      : "elova-fade-in absolute inset-x-0 top-full z-[60] mt-1 max-h-[min(24rem,70vh)] overflow-y-auto border border-elova-border bg-surface shadow-[0_12px_32px_rgba(38,34,32,0.08)]";

  return (
    <div ref={rootRef} className={cn("relative", placement === "overlay" && "z-20")}>
      <div className="relative">
        {showIcon ? (
          <SearchIcon className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
        ) : null}
        <input
          ref={inputRef}
          id={id}
          type="search"
          role="combobox"
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (canSearch) {
              setOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-activedescendant={
            activeSuggestion ? `${listId}-${activeSuggestion.id}` : undefined
          }
          className={cn(
            "h-11 w-full min-w-0 border-0 border-b border-elova-border bg-transparent pr-4 text-base text-text-primary placeholder:text-text-secondary/70 focus:border-elova-gold/50 focus:outline-none sm:text-sm",
            showIcon ? "pl-8" : undefined,
          )}
        />
      </div>

      {showPanel ? (
        <div className={listClassName} id={listId} role="listbox">
          {loading && suggestions.length === 0 ? (
            <p className="px-3 py-4 text-sm text-text-secondary">Buscando…</p>
          ) : suggestions.length === 0 ? (
            <p className="px-3 py-4 text-sm text-text-secondary">
              No encontramos coincidencias para “{trimmed}”.
            </p>
          ) : (
            <ul>
              {suggestions.map((suggestion, index) => {
                const href = getProductHref(suggestion.slug);
                const active = index === activeIndex;

                return (
                  <li key={suggestion.id} role="presentation">
                    <Link
                      id={`${listId}-${suggestion.id}`}
                      role="option"
                      href={href}
                      aria-selected={active}
                      onClick={() => onSelect?.(suggestion)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 transition-colors duration-200",
                        active
                          ? "bg-elova-gold/10"
                          : "hover:bg-elova-gold/10",
                      )}
                    >
                      <span className="relative size-12 shrink-0 overflow-hidden bg-surface-elevated sm:size-14">
                        {suggestion.image ? (
                          <Image
                            src={suggestion.image}
                            alt=""
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-[linear-gradient(160deg,var(--elova-cream)_0%,var(--elova-cream-deep)_100%)]"
                          />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[0.6rem] uppercase tracking-[0.16em] text-text-secondary">
                          {suggestion.brand}
                        </span>
                        <span className="mt-0.5 block truncate font-serif text-base leading-tight tracking-[0.03em] text-text-primary sm:text-lg">
                          {suggestion.name}
                        </span>
                      </span>
                      <span className="shrink-0 text-[0.6rem] uppercase tracking-[0.14em] text-text-secondary">
                        {typeLabels[suggestion.type] ?? suggestion.type}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {suggestions.length > 0 ? (
            <button
              type="submit"
              className="w-full border-t border-elova-border px-3 py-3 text-left text-[0.7rem] uppercase tracking-[0.16em] text-text-secondary transition-colors duration-200 hover:text-elova-gold"
            >
              Ver todos los resultados
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
