"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

export type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
};

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className={cn("divide-y divide-elova-border border-y border-elova-border", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `accordion-panel-${item.id}`;
        const buttonId = `accordion-button-${item.id}`;

        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="min-w-0 text-sm tracking-[0.02em] text-text-primary sm:text-base">
                  {item.title}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-elova-gold transition-transform duration-200 motion-reduce:transition-none",
                    isOpen && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5"
            >
              <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">
                {item.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
