import { cn } from "@/lib/utils";

type RatingProps = {
  value: number;
  max?: number;
  size?: "sm" | "md";
  showValue?: boolean;
  className?: string;
};

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={cn(
        "size-full shrink-0",
        filled ? "fill-elova-gold text-elova-gold" : "fill-transparent text-elova-border",
      )}
    >
      <path
        stroke="currentColor"
        strokeWidth="1"
        d="M10 1.75l2.34 4.74 5.23.76-3.79 3.69.89 5.2L10 13.98l-4.67 2.16.89-5.2-3.79-3.69 5.23-.76L10 1.75z"
      />
    </svg>
  );
}

export function Rating({
  value,
  max = 5,
  size = "md",
  showValue = false,
  className,
}: RatingProps) {
  const normalizedValue = Math.max(0, Math.min(max, value));
  const roundedValue = Math.round(normalizedValue * 2) / 2;
  const starSize = size === "sm" ? "size-3.5" : "size-4";

  return (
    <div
      className={cn("inline-flex items-center gap-2", className)}
      aria-label={`Valoración ${normalizedValue.toFixed(1)} de ${max}`}
      role="img"
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, index) => (
          <span key={index} className={starSize}>
            <StarIcon filled={index + 1 <= roundedValue} />
          </span>
        ))}
      </div>

      {showValue ? (
        <span className="text-xs tracking-[0.08em] text-text-secondary">
          {normalizedValue.toFixed(1)}
        </span>
      ) : null}
    </div>
  );
}
