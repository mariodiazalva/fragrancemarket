import { cn } from "@/lib/utils";

type QuantityStepperProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  label?: string;
};

export function QuantityStepper({
  value,
  min = 0,
  max = Number.POSITIVE_INFINITY,
  onChange,
  label = "Cantidad",
}: QuantityStepperProps) {
  return (
    <div className="inline-flex shrink-0 items-center border border-elova-border">
      <button
        type="button"
        aria-label={`Quitar una unidad de ${label}`}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className={cn(
          "inline-flex size-11 items-center justify-center text-lg text-text-primary transition-colors",
          "hover:bg-surface-elevated hover:text-elova-gold disabled:pointer-events-none disabled:opacity-30",
        )}
      >
        −
      </button>
      <span
        aria-live="polite"
        className="min-w-10 text-center text-sm tabular-nums text-text-primary"
      >
        {value}
      </span>
      <button
        type="button"
        aria-label={`Agregar una unidad de ${label}`}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className={cn(
          "inline-flex size-11 items-center justify-center text-lg text-text-primary transition-colors",
          "hover:bg-surface-elevated hover:text-elova-gold disabled:pointer-events-none disabled:opacity-30",
        )}
      >
        +
      </button>
    </div>
  );
}
