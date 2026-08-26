export type NavMatch = "exact" | "prefix";

export type NavItem = {
  id: string;
  label: string;
  href: string;
  match?: NavMatch;
};

export type HeaderActionType = "search" | "link" | "cart";

export type HeaderAction = {
  id: string;
  label: string;
  type: HeaderActionType;
  href?: string;
  hideOnMobile?: boolean;
  showInMobileMenu?: boolean;
  showBadge?: boolean;
};

export type AnnouncementItem = {
  id: string;
  label: string;
  href?: string;
};

export type AnnouncementBarConfig = {
  enabled: boolean;
  items: AnnouncementItem[];
  separator: string;
};

export const mainNavigation: NavItem[] = [
  { id: "inicio", label: "Inicio", href: "/", match: "exact" },
  { id: "decants", label: "Decants", href: "/decants" },
  { id: "perfumes", label: "Perfumes", href: "/perfumes" },
  { id: "hombre", label: "Hombre", href: "/hombre" },
  { id: "mujer", label: "Mujer", href: "/mujer" },
  { id: "arabes", label: "Árabes", href: "/arabes" },
  { id: "combos", label: "Combos", href: "/combos" },
  { id: "nosotros", label: "Nosotros", href: "/nosotros" },
];

export const mobileNavigation: NavItem[] = [
  { id: "inicio", label: "Inicio", href: "/", match: "exact" },
  { id: "decants", label: "Decants", href: "/decants" },
  { id: "perfumes", label: "Perfumes", href: "/perfumes" },
  { id: "hombre", label: "Hombre", href: "/hombre" },
  { id: "mujer", label: "Mujer", href: "/mujer" },
  { id: "arabes", label: "Árabes", href: "/arabes" },
  { id: "combos", label: "Combos", href: "/combos" },
];

export const mobileShortcuts: NavItem[] = [
  { id: "envios", label: "Envíos", href: "/envios" },
  { id: "preguntas", label: "Preguntas frecuentes", href: "/#preguntas" },
];

export const headerActions: HeaderAction[] = [
  { id: "search", label: "Buscar", type: "search" },
  {
    id: "account",
    label: "Cuenta",
    type: "link",
    href: "/cuenta",
    hideOnMobile: true,
    showInMobileMenu: true,
  },
  {
    id: "cart",
    label: "Carrito",
    type: "cart",
    href: "/carrito",
    showBadge: true,
  },
];

export const announcementBar: AnnouncementBarConfig = {
  enabled: true,
  separator: "·",
  items: [
    { id: "shipping", label: "ENVÍOS A TODO EL PERÚ" },
    { id: "decants", label: "DECANTS DESDE S/ 29", href: "/decants" },
  ],
};

export const footerNavigation = {
  shop: [
    { id: "decants", label: "Decants", href: "/decants" },
    { id: "perfumes", label: "Perfumes", href: "/perfumes" },
    { id: "combos", label: "Combos", href: "/combos" },
    { id: "hombre", label: "Hombre", href: "/hombre" },
    { id: "mujer", label: "Mujer", href: "/mujer" },
    { id: "arabes", label: "Árabes", href: "/arabes" },
  ],
  help: [
    { id: "encontrar", label: "Encontrar mi perfume", href: "/encontrar" },
    { id: "envios", label: "Envíos", href: "/envios" },
    { id: "preguntas", label: "Preguntas frecuentes", href: "/#preguntas" },
    { id: "contacto", label: "Contacto", href: "/contacto" },
  ],
  brand: [
    { id: "nosotros", label: "Nosotros", href: "/nosotros" },
    { id: "politicas", label: "Políticas", href: "/politicas" },
    { id: "terminos", label: "Términos", href: "/terminos" },
    { id: "privacidad", label: "Privacidad", href: "/privacidad" },
    {
      id: "reclamaciones",
      label: "Libro de reclamaciones",
      href: "/libro-de-reclamaciones",
    },
  ],
} as const;

export const socialLinks = [
  {
    id: "instagram",
    label: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "https://www.tiktok.com/",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/",
  },
] as const;

export function isNavItemActive(pathname: string, item: NavItem): boolean {
  const match = item.match ?? "prefix";

  if (match === "exact" || item.href === "/") {
    return pathname === item.href;
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
