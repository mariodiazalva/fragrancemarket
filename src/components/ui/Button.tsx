import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import type { ButtonSize, ButtonVariant } from "@/lib/tokens";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-elova-gold bg-elova-gold text-accent-foreground hover:bg-transparent hover:text-elova-gold",
  secondary:
    "border border-elova-border bg-surface text-text-primary hover:border-elova-gold hover:bg-elova-gold hover:text-accent-foreground",
  ghost:
    "border border-transparent bg-transparent text-text-primary hover:bg-surface hover:text-elova-gold",
  outline:
    "border border-elova-gold bg-transparent text-elova-gold hover:bg-elova-gold hover:text-accent-foreground",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-3 text-[0.65rem] tracking-[0.08em] sm:px-4 sm:text-xs sm:tracking-[0.1em]",
  md: "min-h-11 px-5 text-xs tracking-[0.1em] sm:px-6 sm:tracking-[0.12em]",
  lg: "min-h-12 px-5 text-sm tracking-[0.1em] sm:px-8 sm:tracking-[0.12em]",
};

const sharedClasses =
  "inline-flex items-center justify-center gap-2 rounded-none text-center font-medium uppercase leading-tight transition-[color,background-color,border-color,opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none motion-reduce:active:scale-100";

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        sharedClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full min-w-0",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  onClick,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        sharedClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full min-w-0",
        className,
      )}
    >
      {children}
    </Link>
  );
}
