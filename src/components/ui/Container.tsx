import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerSize = "default" | "narrow" | "wide";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className">;

const sizeClasses: Record<ContainerSize, string> = {
  default: "max-w-container",
  narrow: "max-w-container-narrow",
  wide: "max-w-container-wide",
};

export function Container<T extends ElementType = "div">({
  as,
  children,
  size = "default",
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
