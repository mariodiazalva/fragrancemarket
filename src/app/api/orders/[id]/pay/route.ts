import { isPaymentsTestMode } from "@/lib/supabase/env";
import { markOrderPaid } from "@/services/order.service";

type PayRouteProps = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, { params }: PayRouteProps) {
  if (!isPaymentsTestMode()) {
    return Response.json(
      { error: "Esta acción solo está disponible en modo prueba." },
      { status: 403 },
    );
  }

  const { id } = await params;

  try {
    const order = await markOrderPaid(id);
    return Response.json({ order });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo confirmar el pago.";
    const notFound = /no encontramos/i.test(message);
    return Response.json({ error: message }, { status: notFound ? 404 : 400 });
  }
}
