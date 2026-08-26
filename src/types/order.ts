import type { BillingAddress, ShippingAddress } from "@/lib/shipping";

export type PlaceOrderItem = {
  productId: string;
  sizeLabel: string;
  quantity: number;
};

export type PlaceOrderInput = {
  email: string;
  fullName: string;
  phone: string;
  dni: string;
  notes?: string;
  shipping: ShippingAddress;
  billing: BillingAddress;
  items: PlaceOrderItem[];
};

export type PlaceOrderResult = {
  orderId: string;
};

export type OrderPaymentItem = {
  name: string;
  quantity: number;
  unitPrice: number;
  productId?: string;
  sizeLabel?: string;
  image?: string;
  slug?: string;
};

export type OrderCustomer = {
  email: string;
  fullName: string;
  phone: string;
};

export type OrderListItem = {
  id: string;
  status: string;
  total: number;
  currency: string;
  createdAt: string;
};

export type OrderPaymentSummary = {
  id: string;
  status: string;
  total: number;
  currency: string;
  shippingAmount: number;
  shipping: ShippingAddress | null;
  billing: BillingAddress | null;
  customer: OrderCustomer | null;
  items: OrderPaymentItem[];
};

export type AdminOrderCustomer = {
  email: string;
  fullName: string;
  phone: string;
};

export type AdminOrder = {
  id: string;
  status: string;
  total: number;
  currency: string;
  createdAt: string;
  notes: string;
  shipping: ShippingAddress | null;
  billing: BillingAddress | null;
  customer: AdminOrderCustomer | null;
  items: OrderPaymentItem[];
};

export type OrderStatusAction = {
  status: "paid" | "processing" | "shipped" | "delivered" | "cancelled";
  label: string;
  variant: "primary" | "outline";
};

export function nextOrderStatusActions(status: string): OrderStatusAction[] {
  switch (status) {
    case "pending":
      return [
        { status: "paid", label: "Marcar pagado", variant: "primary" },
        { status: "cancelled", label: "Cancelar", variant: "outline" },
      ];
    case "paid":
      return [{ status: "processing", label: "En proceso de envío", variant: "primary" }];
    case "processing":
      return [{ status: "shipped", label: "Marcar enviado", variant: "primary" }];
    case "shipped":
      return [{ status: "delivered", label: "Marcar entregado", variant: "primary" }];
    default:
      return [];
  }
}

export function orderStatusLabel(status: string): string {
  switch (status) {
    case "pending":
      return "Pendiente de pago";
    case "paid":
      return "Pagado";
    case "processing":
      return "En proceso de envío";
    case "shipped":
      return "Enviado";
    case "delivered":
      return "Entregado";
    case "cancelled":
      return "Cancelado";
    default:
      return status;
  }
}
