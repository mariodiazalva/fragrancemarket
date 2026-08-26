import Link from "next/link";

import {
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/layout/icons";
import { Container } from "@/components/ui/Container";
import { SITE_NAME, SITE_YEAR } from "@/lib/constants";
import { footerNavigation, socialLinks } from "@/lib/navigation";

const socialIcons = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  whatsapp: WhatsAppIcon,
} as const;

export function Footer() {
  return (
    <footer className="theme-ink mt-auto border-t border-elova-border bg-elova-black">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Comprar" links={footerNavigation.shop} />
          <FooterColumn title="Ayuda" links={footerNavigation.help} />
          <FooterColumn title="Marca" links={footerNavigation.brand} />

          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-text-secondary">
              Síguenos
            </p>
            <ul className="mt-5 space-y-1">
              {socialLinks.map((item) => {
                const Icon =
                  socialIcons[item.id as keyof typeof socialIcons] ?? InstagramIcon;

                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center gap-3 text-sm text-text-primary transition-opacity duration-200 hover:opacity-70"
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-elova-border">
        <Container className="flex flex-col gap-3 py-5 text-[0.7rem] uppercase tracking-[0.16em] text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {SITE_YEAR} {SITE_NAME}
          </p>
          <Link
            href="/libro-de-reclamaciones"
            className="inline-flex min-h-11 items-center transition-opacity hover:opacity-70"
          >
            Libro de reclamaciones
          </Link>
        </Container>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: readonly { id: string; label: string; href: string }[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <p className="text-[0.7rem] uppercase tracking-[0.22em] text-text-secondary">
        {title}
      </p>
      <ul className="mt-5 space-y-1">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              className="inline-flex min-h-11 items-center text-sm text-text-primary transition-opacity duration-200 hover:opacity-70"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
