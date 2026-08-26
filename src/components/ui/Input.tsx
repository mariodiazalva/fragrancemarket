import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
  endAdornment?: ReactNode;
};

export function Input({
  label,
  hint,
  error,
  id,
  className,
  containerClassName,
  endAdornment,
  ...props
}: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={cn("flex w-full flex-col gap-2", containerClassName)}>
      <label
        htmlFor={inputId}
        className="text-xs font-medium uppercase tracking-[0.14em] text-text-secondary"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={
            [hintId, errorId].filter(Boolean).join(" ") || undefined
          }
          className={cn(
            "h-11 w-full min-w-0 border border-elova-border bg-surface px-4 text-base text-text-primary placeholder:text-text-secondary/70 transition-colors duration-200 sm:text-sm",
            "focus:border-elova-gold/50 focus:bg-surface-elevated focus:outline-none",
            error && "border-red-400/70",
            endAdornment ? "pr-11" : undefined,
            className,
          )}
          {...props}
        />

        {endAdornment ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-text-secondary">
            {endAdornment}
          </div>
        ) : null}
      </div>

      {hint ? (
        <p id={hintId} className="text-xs leading-relaxed text-text-secondary">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="text-xs text-red-300/90">
          {error}
        </p>
      ) : null}
    </div>
  );
}
