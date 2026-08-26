import type { NextRequest } from "next/server";

import { refreshSupabaseSession } from "@/lib/supabase/refresh-session";

export async function proxy(request: NextRequest) {
  return refreshSupabaseSession(request);
}

export const config = {
  matcher: [
    "/cuenta",
    "/cuenta/:path*",
    "/admin/:path*",
    "/auth/:path*",
    "/api/auth/:path*",
  ],
};
