import { NextRequest } from "next/server";

import { submitOrder } from "@/services/order.service";
import type { PlaceOrderInput } from "@/types/order";

export async function POST(request: NextRequest) {
  let body: PlaceOrderInput;

  try {
    body = (await request.json()) as PlaceOrderInput;
  } catch {
    return Response.json({ error: "Pedido inválido." }, { status: 400 });
  }

  try {
    const result = await submitOrder({
      email: String(body.email ?? ""),
      fullName: String(body.fullName ?? ""),
      phone: String(body.phone ?? ""),
      dni: String(body.dni ?? ""),
      notes: body.notes ? String(body.notes) : "",
      coupon: body.coupon ? String(body.coupon) : "",
      shipping: body.shipping,
      billing: body.billing,
      items: Array.isArray(body.items) ? body.items : [],
    });

    return Response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo registrar el pedido.";
    return Response.json({ error: message }, { status: 400 });
  }
}
