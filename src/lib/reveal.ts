const REVEAL_CLASS = "is-visible";

function viewportBottom() {
  const visual = window.visualViewport;
  const height = visual?.height ?? window.innerHeight;
  const offset = visual?.offsetTop ?? 0;
  return offset + height;
}

export function isInRevealRange(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  const topLimit = (window.visualViewport?.offsetTop ?? 0) + 64;
  const bottomLimit = viewportBottom() - 48;

  return rect.top < bottomLimit && rect.bottom > topLimit;
}

export function observeReveal(
  nodes: HTMLElement[],
  onVisible: (node: HTMLElement) => void,
) {
  const pending = new Set(nodes.filter((node) => !node.classList.contains(REVEAL_CLASS)));

  if (pending.size === 0) {
    return () => {};
  }

  let observer: IntersectionObserver | undefined;

  const reveal = (node: HTMLElement) => {
    if (!pending.has(node)) {
      return;
    }

    pending.delete(node);
    onVisible(node);
    observer?.unobserve(node);
  };

  const flush = () => {
    pending.forEach((node) => {
      if (isInRevealRange(node)) {
        reveal(node);
      }
    });
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    pending.forEach((node) => reveal(node));
    return () => {};
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          reveal(entry.target as HTMLElement);
        }
      }
    },
    {
      threshold: 0,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  pending.forEach((node) => observer?.observe(node));

  const frame = window.requestAnimationFrame(flush);
  document.addEventListener("scroll", flush, { passive: true, capture: true });
  window.addEventListener("resize", flush, { passive: true });
  window.addEventListener("orientationchange", flush);
  window.visualViewport?.addEventListener("resize", flush);
  window.visualViewport?.addEventListener("scroll", flush);

  return () => {
    window.cancelAnimationFrame(frame);
    observer?.disconnect();
    document.removeEventListener("scroll", flush, true);
    window.removeEventListener("resize", flush);
    window.removeEventListener("orientationchange", flush);
    window.visualViewport?.removeEventListener("resize", flush);
    window.visualViewport?.removeEventListener("scroll", flush);
  };
}
