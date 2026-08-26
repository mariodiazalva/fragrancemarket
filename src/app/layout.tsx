import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";

import { JsonLd } from "@/components/seo/JsonLd";
import { MainLayout } from "@/layouts/MainLayout";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { createPageMetadata, organizationJsonLd } from "@/lib/seo";

import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  ...createPageMetadata({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    path: "/",
    absoluteTitle: true,
  }),
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-PE"
      className={`${montserrat.variable} ${inter.variable} h-full overflow-x-clip antialiased`}
    >
      <body className="flex min-h-full min-w-0 flex-col overflow-x-clip font-sans">
        <noscript>
          <style>{`#contenido main > section ~ *,[data-reveal],.reveal,.site-footer,.reveal-stagger > *{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <JsonLd data={organizationJsonLd()} />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
