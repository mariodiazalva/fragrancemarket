import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="6.25" />
      <path d="M16.2 16.2L20 20" />
    </IconBase>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 19.2c.9-3.1 3.3-4.7 6.5-4.7s5.6 1.6 6.5 4.7" />
    </IconBase>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6.4 8.5h11.2l.9 11H5.5l.9-11z" />
      <path d="M9 8.5V7.2A3 3 0 0 1 12 4.2a3 3 0 0 1 3 3v1.3" />
    </IconBase>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 9h14" />
      <path d="M5 15h14" />
    </IconBase>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </IconBase>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4.5" y="4.5" width="15" height="15" rx="4" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="16.7" cy="7.3" r="0.7" fill="currentColor" />
    </IconBase>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 6.2c.7 2.2 2.2 3.6 4.3 3.8v2.4c-1.6 0-3.1-.5-4.3-1.4v5.6c0 2.6-2.1 4.6-4.8 4.6S4.4 19.2 4.4 16.6c0-2.5 2-4.5 4.6-4.6v2.5c-1.1.1-2 .9-2 2.1 0 1.2 1 2.1 2.2 2.1s2.1-.9 2.1-2.1V6.2H14z" />
    </IconBase>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 4.6A7.4 7.4 0 0 0 5.4 15.2L4.6 19.4l4.3-.8A7.4 7.4 0 1 0 12 4.6z" />
      <path d="M9.6 9.7c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.4.2.5.6 1.6.6 1.7 0 .2 0 .4-.2.5l-.4.4c-.1.1-.2.3 0 .5.2.4.8 1.2 1.8 1.8.3.2.5.2.6 0l.4-.5c.2-.2.4-.1.6 0 .2.1 1.3.6 1.5.7s.3.2.3.4c0 .6-.7 1.5-1 1.6-.3.2-1.5.3-3.2-.6-2.1-1.1-3.4-3.2-3.5-3.4-.2-.2-.9-1.2-.9-2.3 0-1 .5-1.6.6-1.8z" />
    </IconBase>
  );
}
