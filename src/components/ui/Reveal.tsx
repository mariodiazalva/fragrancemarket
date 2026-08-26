"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { observeReveal } from "@/lib/reveal";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    return observeReveal([node], (target) => {
      target.classList.add("is-visible");
    });
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
