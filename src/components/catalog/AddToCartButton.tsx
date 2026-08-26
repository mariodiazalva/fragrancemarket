"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { productToCartDraft } from "@/services/cart.service";
import type { Product } from "@/types";

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { add } = useCart();
  const draft = productToCartDraft(product);
  const selected = draft.variants.find((variant) => variant.label === draft.sizeLabel);
  const soldOut = (selected?.stock ?? 0) <= 0;

  return (
    <Button
      variant="outline"
      size="sm"
      fullWidth
      disabled={soldOut}
      onClick={() => add(draft)}
    >
      {soldOut ? (
        "Agotado"
      ) : (
        <>
          <span className="sm:hidden">Agregar</span>
          <span className="hidden sm:inline">Agregar al carrito</span>
        </>
      )}
    </Button>
  );
}
