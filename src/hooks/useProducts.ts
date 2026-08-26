"use client";

import { useEffect, useState } from "react";

import { getCatalog } from "@/services/product.service";
import type { CatalogQuery, Product } from "@/types";

type UseProductsResult = {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
};

export function useProducts(query?: CatalogQuery): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setIsLoading(true);
        const data = await getCatalog(query);

        if (isMounted) {
          setProducts(data.products);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to load products"));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [query]);

  return { products, isLoading, error };
}
