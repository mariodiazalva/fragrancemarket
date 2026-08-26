import type { HTMLAttributes } from "react";

import type { DividerVariant } from "@/lib/tokens";
import { cn } from "@/lib/utils";

type DividerProps = HTMLAttributes<HTMLHRElement> & {
  variant?: DividerVariant;
  orientation?: "horizontal" | "vertical";
};

const variantClasses: Record<DividerVariant, string> = {
  default: "border-elova-border",
  gold: "border-elova-gold/35",
  subtle: "border-elova-border-subtle",
};

export function Divider({
  variant = "default",
  orientation = "horizontal",
  className,
  ...props
}: DividerProps) {
  return (
    <hr
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "border-0 border-solid",
        orientation === "horizontal"
          ? "w-full border-t"
          : "inline-block h-full min-h-4 border-l",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
