import type { HTMLAttributes, ReactNode } from "react";

import type { BadgeVariant } from "@/lib/tokens";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-elova-border bg-surface text-text-primary",
  gold: "border-elova-gold/20 bg-elova-gold text-accent-foreground",
  outline: "border-elova-border bg-transparent text-text-secondary",
  muted: "border-transparent bg-surface-elevated text-text-secondary",
};

export function Badge({
  children,
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center rounded-full border px-2 py-1 text-[0.6rem] font-medium uppercase tracking-[0.12em] sm:px-2.5 sm:text-[0.65rem] sm:tracking-[0.18em]",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
