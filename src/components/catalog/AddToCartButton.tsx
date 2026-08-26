"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import type { CartDraft } from "@/types/cart";

type AddToCartButtonProps = {
  draft: CartDraft;
};

export function AddToCartButton({ draft }: AddToCartButtonProps) {
  const { add } = useCart();
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
