"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { observeReveal } from "@/lib/reveal";

function collectTargets() {
  const nodes = new Set<HTMLElement>();
  const root = document.getElementById("contenido");

  if (root) {
    root.querySelectorAll<HTMLElement>("main > section ~ *").forEach((node) => {
      if (node.classList.contains("reveal")) {
        return;
      }

      nodes.add(node);
    });

    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node) => {
      nodes.add(node);
    });
  }

  const footer = document.querySelector<HTMLElement>("footer.site-footer");

  if (footer) {
    nodes.add(footer);
  }

  return [...nodes];
}

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      return;
    }

    const targets = collectTargets();

    if (targets.length === 0) {
      return;
    }

    let batch = 0;

    return observeReveal(targets, (node) => {
      if (batch > 0) {
        node.style.setProperty("--reveal-delay", `${Math.min(batch, 4) * 70}ms`);
      }

      node.classList.add("is-visible");
      batch += 1;
    });
  }, [pathname]);

  return null;
}
