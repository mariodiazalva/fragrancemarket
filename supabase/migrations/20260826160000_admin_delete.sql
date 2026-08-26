-- Admin-only delete for orders and customers.
-- Paid-family orders return stock before the row is removed.

create or replace function public.admin_purge_order(p_order_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_status text;
  v_item record;
begin
  select status
  into v_status
  from public.orders
  where id = p_order_id
  for update;

  if v_status is null then
    raise exception 'order_not_found';
  end if;

  if v_status in ('paid', 'processing', 'shipped', 'delivered') then
    for v_item in
      select product_id, variant_id, quantity
      from public.order_items
      where order_id = p_order_id
    loop
      if v_item.variant_id is not null then
        update public.product_variants
        set stock = stock + v_item.quantity
        where id = v_item.variant_id;
      end if;

      if v_item.product_id is not null then
        update public.products
        set stock = stock + v_item.quantity
        where id = v_item.product_id;
      end if;
    end loop;
  end if;

  delete from public.orders
  where id = p_order_id;
end;
$$;

create or replace function public.admin_delete_order(p_order_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.require_store_admin();
  perform public.admin_purge_order(p_order_id);
  return jsonb_build_object('id', p_order_id, 'deleted', true);
end;
$$;

create or replace function public.admin_delete_customer(p_customer_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_ids uuid[];
  v_id uuid;
begin
  perform public.require_store_admin();

  if not exists (
    select 1 from public.customers c where c.id = p_customer_id
  ) then
    raise exception 'customer_not_found';
  end if;

  select coalesce(array_agg(o.id), '{}'::uuid[])
  into v_ids
  from public.orders o
  where o.customer_id = p_customer_id;

  foreach v_id in array v_ids loop
    perform public.admin_purge_order(v_id);
  end loop;

  delete from public.customers
  where id = p_customer_id;

  return jsonb_build_object(
    'id', p_customer_id,
    'deleted', true,
    'orders', coalesce(array_length(v_ids, 1), 0)
  );
end;
$$;

revoke all on function public.admin_purge_order(uuid) from public, anon, authenticated;
revoke all on function public.admin_delete_order(uuid) from public, anon;
revoke all on function public.admin_delete_customer(uuid) from public, anon;

grant execute on function public.admin_delete_order(uuid) to authenticated;
grant execute on function public.admin_delete_customer(uuid) to authenticated;
