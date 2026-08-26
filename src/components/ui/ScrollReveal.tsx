"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

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
    const targets = collectTargets();

    if (targets.length === 0) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let batch = 0;

        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const node = entry.target as HTMLElement;

          if (batch > 0) {
            node.style.setProperty("--reveal-delay", `${batch * 80}ms`);
          }

          node.classList.add("is-visible");
          observer.unobserve(node);
          batch += 1;
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    targets.forEach((node) => {
      if (!node.classList.contains("is-visible")) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
