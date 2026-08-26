import Link from "next/link";

import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  onNavigate?: () => void;
};

export function SiteLogo({ className, onNavigate }: SiteLogoProps) {
  return (
    <Link
      href="/"
      aria-label={SITE_NAME}
      onClick={onNavigate}
      className={cn(
        "group inline-flex max-w-full items-baseline whitespace-nowrap font-serif uppercase leading-none tracking-[0.08em] text-text-primary sm:tracking-[0.12em]",
        className,
      )}
    >
      <span className="text-[0.62rem] font-extrabold sm:text-[0.78rem] xl:text-[0.88rem]">
        FRAGRANCE
      </span>
      <span className="ml-[0.35em] text-[0.62rem] font-normal sm:text-[0.78rem] xl:text-[0.88rem]">
        MARKET
      </span>
    </Link>
  );
}
