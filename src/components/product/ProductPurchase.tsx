"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { ProductPrice } from "@/components/ui/ProductPrice";
import { useCart } from "@/hooks/useCart";
import { getDefaultSize } from "@/lib/product";
import { formatCatalogPrice } from "@/lib/utils";
import { productToCartDraft } from "@/services/cart.service";
import type { Product, ProductSize } from "@/types";

type ProductPurchaseProps = {
  product: Product;
};

export function ProductPurchase({ product }: ProductPurchaseProps) {
  const router = useRouter();
  const { add } = useCart();
  const defaultSize = getDefaultSize(product);
  const [selectedLabel, setSelectedLabel] = useState(defaultSize.label);
  const [status, setStatus] = useState<"idle" | "adding" | "added" | "buying">(
    "idle",
  );

  const selectedSize = useMemo(
    () => product.sizes.find((size) => size.label === selectedLabel) ?? defaultSize,
    [defaultSize, product.sizes, selectedLabel],
  );

  const isSoldOut = selectedSize.stock <= 0;
  const isPricePending = selectedSize.price <= 0;
  const cannotPurchase = isSoldOut || isPricePending;
  const variantTitle = product.type === "set" ? "Presentación" : "Tamaño";

  async function handleAdd(redirectToCart = false) {
    if (cannotPurchase || status === "adding" || status === "buying") {
      return;
    }

    setStatus(redirectToCart ? "buying" : "adding");
    add(productToCartDraft(product, selectedSize.label), {
      openDrawer: !redirectToCart,
    });

    if (redirectToCart) {
      router.push("/carrito");
      return;
    }

    setStatus("added");
    window.setTimeout(() => setStatus("idle"), 1600);
  }

  return (
    <div className="space-y-6">
      <ProductPrice
        price={selectedSize.price}
        compareAtPrice={selectedSize.compareAtPrice ?? product.compareAtPrice}
        size="lg"
      />

      <fieldset>
        <legend className="text-[0.7rem] uppercase tracking-[0.2em] text-text-secondary">
          {variantTitle}
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <SizeOption
              key={size.label}
              size={size}
              selected={size.label === selectedSize.label}
              onSelect={() => setSelectedLabel(size.label)}
            />
          ))}
        </div>
      </fieldset>

      <p className="text-xs uppercase tracking-[0.16em] text-text-secondary">
        {isPricePending
          ? "Precio por confirmar"
          : isSoldOut
            ? "Agotado en esta presentación"
            : selectedSize.stock <= 5
              ? `Quedan ${selectedSize.stock} unidades`
              : "Disponible"}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="outline"
          size="lg"
          fullWidth
          disabled={cannotPurchase || status === "adding" || status === "buying"}
          onClick={() => handleAdd(false)}
        >
          {status === "added" ? "Agregado" : "Agregar al carrito"}
        </Button>
        <Button
          size="lg"
          fullWidth
          disabled={cannotPurchase || status === "adding" || status === "buying"}
          onClick={() => handleAdd(true)}
        >
          Comprar ahora
        </Button>
      </div>
    </div>
  );
}

function SizeOption({
  size,
  selected,
  onSelect,
}: {
  size: ProductSize;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex min-h-11 min-w-16 flex-col items-center justify-center border px-3 py-2 text-xs uppercase tracking-[0.12em] transition-colors sm:min-w-20 sm:px-4 sm:tracking-[0.16em] ${
        selected
          ? "border-elova-gold bg-elova-gold/10 text-elova-gold"
          : "border-elova-border text-text-primary hover:border-elova-gold/40"
      }`}
    >
      <span>{size.label}</span>
      <span className="mt-0.5 text-[0.65rem] tracking-[0.08em] opacity-80">
        {formatCatalogPrice(size.price)}
      </span>
    </button>
  );
}
