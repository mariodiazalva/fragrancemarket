-- Confirmation page needs the customer and line images after checkout.
-- Still keyed only by order id, same as shipping already returned by get_order_for_payment.

create or replace function public.get_order_for_payment(p_order_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders%rowtype;
  v_items jsonb;
  v_customer jsonb;
begin
  select * into v_order
  from public.orders
  where id = p_order_id;

  if not found then
    return null;
  end if;

  select jsonb_build_object(
    'email', c.email,
    'fullName', c.full_name,
    'phone', c.phone
  )
  into v_customer
  from public.customers c
  where c.id = v_order.customer_id;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'name', oi.product_name,
        'quantity', oi.quantity,
        'unitPrice', oi.unit_price,
        'productId', oi.product_id,
        'sizeLabel', pv.label,
        'image', (
          select pi.url
          from public.product_images pi
          where pi.product_id = oi.product_id
          order by pi.position
          limit 1
        )
      )
      order by oi.created_at
    ),
    '[]'::jsonb
  )
  into v_items
  from public.order_items oi
  left join public.product_variants pv on pv.id = oi.variant_id
  where oi.order_id = v_order.id;

  return jsonb_build_object(
    'id', v_order.id,
    'status', v_order.status,
    'total', v_order.total,
    'currency', v_order.currency,
    'shippingAmount', v_order.shipping_amount,
    'shipping', v_order.shipping_address,
    'customer', v_customer,
    'items', v_items
  );
end;
$$;
