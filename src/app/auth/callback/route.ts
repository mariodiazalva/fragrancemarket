import { NextRequest, NextResponse } from "next/server";

import { exchangeAuthCode } from "@/data-access/auth";

function safeNextPath(value: string | null): "/cuenta" | "/admin/pedidos" {
  return value === "/admin/pedidos" ? "/admin/pedidos" : "/cuenta";
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const destination = new URL(safeNextPath(request.nextUrl.searchParams.get("next")), request.url);

  if (code) {
    try {
      if (await exchangeAuthCode(code)) {
        return NextResponse.redirect(destination);
      }
    } catch {
      destination.searchParams.set("error", "enlace");
      return NextResponse.redirect(destination);
    }
  }

  destination.searchParams.set("error", "enlace");
  return NextResponse.redirect(destination);
}
