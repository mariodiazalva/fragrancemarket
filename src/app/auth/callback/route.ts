import { NextRequest, NextResponse } from "next/server";

import { exchangeAuthCode } from "@/data-access/auth";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const cuenta = new URL("/cuenta", request.url);

  if (code) {
    try {
      if (await exchangeAuthCode(code)) {
        return NextResponse.redirect(cuenta);
      }
    } catch {
      cuenta.searchParams.set("error", "enlace");
      return NextResponse.redirect(cuenta);
    }
  }

  cuenta.searchParams.set("error", "enlace");
  return NextResponse.redirect(cuenta);
}
