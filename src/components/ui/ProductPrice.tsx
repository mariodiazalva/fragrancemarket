import { cn, formatPrice } from "@/lib/utils";

type ProductPriceProps = {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  locale?: string;
  currency?: string;
};

const sizeClasses = {
  sm: {
    current: "text-sm",
    compare: "text-xs",
  },
  md: {
    current: "text-base",
    compare: "text-sm",
  },
  lg: {
    current: "text-lg",
    compare: "text-sm",
  },
} as const;

export function ProductPrice({
  price,
  compareAtPrice,
  size = "md",
  className,
  locale,
  currency,
}: ProductPriceProps) {
  const hasDiscount =
    compareAtPrice !== undefined && compareAtPrice > price;
  const styles = sizeClasses[size];

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      <span
        className={cn(
          "font-medium tracking-[0.04em] text-text-primary",
          styles.current,
        )}
      >
        {formatPrice(price, locale, currency)}
      </span>

      {hasDiscount ? (
        <span
          className={cn(
            "text-text-secondary line-through",
            styles.compare,
          )}
        >
          {formatPrice(compareAtPrice, locale, currency)}
        </span>
      ) : null}
    </div>
  );
}
