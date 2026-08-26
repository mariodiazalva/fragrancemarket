-- Test-mode payment helpers. get_order_for_payment does not return email.
-- confirm_order_payment is for PAYMENTS_TEST_MODE only: revoke it before a real PSP.

create or replace function public.get_order_for_payment(p_order_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders%rowtype;
  v_items jsonb;
begin
  select * into v_order
  from public.orders
  where id = p_order_id;

  if not found then
    return null;
  end if;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'name', oi.product_name,
        'quantity', oi.quantity,
        'unitPrice', oi.unit_price
      )
      order by oi.created_at
    ),
    '[]'::jsonb
  )
  into v_items
  from public.order_items oi
  where oi.order_id = v_order.id;

  return jsonb_build_object(
    'id', v_order.id,
    'status', v_order.status,
    'total', v_order.total,
    'currency', v_order.currency,
    'items', v_items
  );
end;
$$;

create or replace function public.confirm_order_payment(p_order_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_status text;
  v_item record;
begin
  select status into v_status
  from public.orders
  where id = p_order_id
  for update;

  if v_status is null then
    raise exception 'order_not_found';
  end if;

  if v_status = 'paid' then
    return public.get_order_for_payment(p_order_id);
  end if;

  if v_status <> 'pending' then
    raise exception 'invalid_status';
  end if;

  for v_item in
    select product_id, variant_id, quantity
    from public.order_items
    where order_id = p_order_id
  loop
    if v_item.variant_id is not null then
      perform 1
      from public.product_variants
      where id = v_item.variant_id
      for update;

      update public.product_variants
      set stock = stock - v_item.quantity
      where id = v_item.variant_id and stock >= v_item.quantity;

      if not found then
        raise exception 'insufficient_stock';
      end if;
    end if;

    perform 1
    from public.products
    where id = v_item.product_id
    for update;

    update public.products
    set stock = stock - v_item.quantity
    where id = v_item.product_id and stock >= v_item.quantity;

    if not found then
      raise exception 'insufficient_stock';
    end if;
  end loop;

  update public.orders
  set status = 'paid'
  where id = p_order_id;

  return public.get_order_for_payment(p_order_id);
end;
$$;

revoke all on function public.get_order_for_payment(uuid) from public;
revoke all on function public.confirm_order_payment(uuid) from public;

grant execute on function public.get_order_for_payment(uuid) to anon, authenticated;
grant execute on function public.confirm_order_payment(uuid) to anon, authenticated;
