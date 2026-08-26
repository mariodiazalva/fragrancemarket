import Link from "next/link";
import { Fragment } from "react";

import { announcementBar } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function AnnouncementBar() {
  if (!announcementBar.enabled || announcementBar.items.length === 0) {
    return null;
  }

  return (
    <div className="theme-ink border-b border-elova-border bg-elova-black">
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-3 py-2 text-center text-[0.6rem] uppercase tracking-[0.14em] text-text-secondary sm:px-4 sm:text-[0.65rem] sm:tracking-[0.22em]">
        {announcementBar.items.map((item, index) => (
          <Fragment key={item.id}>
            {index > 0 ? (
              <span aria-hidden="true" className="text-elova-gold/70">
                {announcementBar.separator}
              </span>
            ) : null}

            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  "transition-colors duration-200 hover:text-elova-gold",
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
          </Fragment>
        ))}
      </p>
    </div>
  );
}
