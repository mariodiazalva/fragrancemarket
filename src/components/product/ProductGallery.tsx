"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const gallery = images.length > 0 ? images : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = gallery[activeIndex];

  return (
    <div className="space-y-3">
      <div className="group relative aspect-[4/5] overflow-hidden border border-elova-border bg-surface">
        {activeImage ? (
          <Image
            src={activeImage}
            alt={alt}
            fill
            preload
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(160deg,var(--elova-cream)_0%,var(--elova-cream-deep)_100%)]"
          />
        )}
      </div>

      {gallery.length > 1 ? (
        <ul className="grid grid-cols-4 gap-2">
          {gallery.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Ver imagen ${index + 1}`}
                aria-current={index === activeIndex}
                className={cn(
                  "relative aspect-square w-full overflow-hidden border transition-[border-color,opacity] duration-200 hover:opacity-90",
                  index === activeIndex
                    ? "border-elova-gold"
                    : "border-elova-border hover:border-elova-gold/40",
                )}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
