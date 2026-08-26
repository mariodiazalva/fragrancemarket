import {
  confirmOrderPayment,
  getOrderForPayment,
  listMyOrders,
  listOrdersByEmail,
  placeOrder,
} from "@/data-access/orders";
import { getSignedInEmail } from "@/data-access/auth";
import { listPublishedProducts } from "@/data-access/products";
import { enrichOrderItems } from "@/lib/order-confirmation";
import type {
  OrderListItem,
  OrderPaymentSummary,
  PlaceOrderInput,
  PlaceOrderResult,
} from "@/types/order";

export async function submitOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  return placeOrder(input);
}

export async function getOrderPaymentSummary(
  orderId: string,
): Promise<OrderPaymentSummary | null> {
  const order = await getOrderForPayment(orderId);

  if (!order) {
    return null;
  }

  const products = await listPublishedProducts();

  return {
    ...order,
    items: enrichOrderItems(order.items, products),
  };
}

export async function markOrderPaid(orderId: string): Promise<OrderPaymentSummary> {
  return confirmOrderPayment(orderId);
}

export async function getAccountEmail(): Promise<string | null> {
  return getSignedInEmail();
}

export async function getMyOrders(): Promise<OrderListItem[]> {
  return listMyOrders();
}

export async function getOrdersByEmail(email: string): Promise<OrderListItem[]> {
  return listOrdersByEmail(email);
}
