export const elovaTokens = {
  colors: {
    cream: "#ffffff",
    creamDeep: "#f4f4f4",
    black: "#000000",
    graphite: "#0a0a0a",
    gray: "#737373",
    white: "#ffffff",
    gold: "#000000",
    goldMuted: "#404040",
    goldHighlight: "#111111",
    sale: "#dc2626",
    border: "#e5e5e5",
    borderSubtle: "#f0f0f0",
    textPrimary: "#000000",
    textSecondary: "#737373",
  },
  typography: {
    serif: "var(--font-montserrat)",
    sans: "var(--font-inter)",
  },
  spacing: {
    container: "72rem",
    containerNarrow: "48rem",
    containerWide: "80rem",
  },
} as const;

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";
export type BadgeVariant = "default" | "gold" | "outline" | "muted" | "sale";
export type DividerVariant = "default" | "gold" | "subtle";
