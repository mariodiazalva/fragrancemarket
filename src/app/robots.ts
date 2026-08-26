import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/carrito", "/cuenta", "/checkout", "/pedido", "/auth"],
    },
    sitemap: `${new URL(SITE_URL).origin}/sitemap.xml`,
    host: new URL(SITE_URL).host,
  };
}
