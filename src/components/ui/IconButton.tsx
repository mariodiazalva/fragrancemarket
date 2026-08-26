import type { ButtonHTMLAttributes, ReactNode } from "react";

import type { ButtonSize, ButtonVariant } from "@/lib/tokens";
import { cn } from "@/lib/utils";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  label: string;
  variant?: Extract<ButtonVariant, "ghost" | "outline" | "secondary">;
  size?: ButtonSize;
};

const variantClasses: Record<
  NonNullable<IconButtonProps["variant"]>,
  string
> = {
  ghost:
    "border border-transparent bg-transparent text-text-primary hover:bg-surface hover:text-elova-gold",
  outline:
    "border border-elova-border bg-transparent text-text-primary hover:border-elova-gold/50",
  secondary:
    "border border-elova-border bg-surface text-text-primary hover:border-elova-gold/40",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "size-11 [&_svg]:size-4",
  md: "size-11 [&_svg]:size-5",
  lg: "size-12 [&_svg]:size-5",
};

export function IconButton({
  children,
  label,
  variant = "ghost",
  size = "md",
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center rounded-none transition-[color,background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none motion-reduce:active:scale-100",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
