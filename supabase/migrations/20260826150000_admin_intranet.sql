-- Internal store workspace: dashboard, customers, inventory.
-- Access stays limited to emails in public.store_admins.

create or replace function public.require_store_admin()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
begin
  v_email := lower(trim(coalesce(auth.jwt() ->> 'email', '')));

  if v_email = '' then
    raise exception 'not_authenticated';
  end if;

  if not exists (
    select 1 from public.store_admins a where a.email = v_email
  ) then
    raise exception 'not_admin';
  end if;

  return v_email;
end;
$$;

create or replace function public.list_admin_orders()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_result jsonb;
begin
  perform public.require_store_admin();

  select coalesce(jsonb_agg(row_data order by created_at desc), '[]'::jsonb)
  into v_result
  from (
    select
      o.created_at,
      jsonb_build_object(
        'id', o.id,
        'status', o.status,
        'total', o.total,
        'shippingAmount', o.shipping_amount,
        'currency', o.currency,
        'createdAt', o.created_at,
        'notes', o.notes,
        'shipping', o.shipping_address,
        'billing', o.billing_address,
        'customer', jsonb_build_object(
          'email', c.email,
          'fullName', c.full_name,
          'phone', c.phone
        ),
        'items', (
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
          from public.order_items oi
          where oi.order_id = o.id
        )
      ) as row_data
    from public.orders o
    left join public.customers c on c.id = o.customer_id
    order by o.created_at desc
    limit 200
  ) listed;

  return v_result;
end;
$$;

create or replace function public.get_admin_dashboard()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_recent jsonb;
begin
  perform public.require_store_admin();

  select coalesce(jsonb_agg(row_data order by created_at desc), '[]'::jsonb)
  into v_recent
  from (
    select
      o.created_at,
      jsonb_build_object(
        'id', o.id,
        'status', o.status,
        'total', o.total,
        'currency', o.currency,
        'createdAt', o.created_at,
        'customer', jsonb_build_object(
          'email', c.email,
          'fullName', c.full_name,
          'phone', c.phone
        ),
        'itemCount', (
          select coalesce(sum(oi.quantity), 0)
          from public.order_items oi
          where oi.order_id = o.id
        )
      ) as row_data
    from public.orders o
    left join public.customers c on c.id = o.customer_id
    order by o.created_at desc
    limit 8
  ) recent_orders;

  return jsonb_build_object(
    'counts', jsonb_build_object(
      'orders', (select count(*)::int from public.orders),
      'customers', (select count(*)::int from public.customers),
      'pending', (select count(*)::int from public.orders where status = 'pending'),
      'paid', (select count(*)::int from public.orders where status = 'paid'),
      'processing', (select count(*)::int from public.orders where status = 'processing'),
      'shipped', (select count(*)::int from public.orders where status = 'shipped'),
      'delivered', (select count(*)::int from public.orders where status = 'delivered'),
      'cancelled', (select count(*)::int from public.orders where status = 'cancelled'),
      'toShip', (
        select count(*)::int
        from public.orders
        where status in ('paid', 'processing')
      ),
      'lowStock', (
        select count(*)::int from (
          select v.id
          from public.product_variants v
          join public.products p on p.id = v.product_id
          where v.stock <= 3
          union all
          select p.id
          from public.products p
          where p.stock <= 3
            and not exists (
              select 1 from public.product_variants v where v.product_id = p.id
            )
        ) low_stock
      )
    ),
    'totals', jsonb_build_object(
      'pending', (
        select coalesce(sum(o.total), 0)
        from public.orders o
        where o.status = 'pending'
      ),
      'revenue', (
        select coalesce(sum(o.total), 0)
        from public.orders o
        where o.status in ('paid', 'processing', 'shipped', 'delivered')
      )
    ),
    'recentOrders', v_recent
  );
end;
$$;

create or replace function public.list_admin_customers()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_result jsonb;
begin
  perform public.require_store_admin();

  select coalesce(jsonb_agg(row_data order by last_order_at desc nulls last, created_at desc), '[]'::jsonb)
  into v_result
  from (
    select
      c.created_at,
      (
        select max(o.created_at)
        from public.orders o
        where o.customer_id = c.id
      ) as last_order_at,
      jsonb_build_object(
        'id', c.id,
        'email', c.email,
        'fullName', c.full_name,
        'phone', c.phone,
        'createdAt', c.created_at,
        'orderCount', (
          select count(*)::int
          from public.orders o
          where o.customer_id = c.id
        ),
        'totalSpent', (
          select coalesce(sum(o.total), 0)
          from public.orders o
          where o.customer_id = c.id
            and o.status in ('paid', 'processing', 'shipped', 'delivered')
        ),
        'lastOrderAt', (
          select max(o.created_at)
          from public.orders o
          where o.customer_id = c.id
        ),
        'lastStatus', (
          select o.status
          from public.orders o
          where o.customer_id = c.id
          order by o.created_at desc
          limit 1
        )
      ) as row_data
    from public.customers c
    order by last_order_at desc nulls last, c.created_at desc
    limit 200
  ) listed;

  return v_result;
end;
$$;

create or replace function public.list_admin_inventory()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_result jsonb;
begin
  perform public.require_store_admin();

  select coalesce(jsonb_agg(row_data order by stock asc, name asc), '[]'::jsonb)
  into v_result
  from (
    select
      p.name,
      v.stock,
      jsonb_build_object(
        'productId', p.id,
        'variantId', v.id,
        'name', p.name,
        'slug', p.slug,
        'brand', b.name,
        'type', p.type,
        'label', v.label,
        'price', v.price,
        'stock', v.stock,
        'published', p.published
      ) as row_data
    from public.product_variants v
    join public.products p on p.id = v.product_id
    join public.brands b on b.id = p.brand_id
    union all
    select
      p.name,
      p.stock,
      jsonb_build_object(
        'productId', p.id,
        'variantId', null,
        'name', p.name,
        'slug', p.slug,
        'brand', b.name,
        'type', p.type,
        'label', 'Único',
        'price', p.price,
        'stock', p.stock,
        'published', p.published
      ) as row_data
    from public.products p
    join public.brands b on b.id = p.brand_id
    where not exists (
      select 1 from public.product_variants v where v.product_id = p.id
    )
  ) listed;

  return v_result;
end;
$$;

create or replace function public.admin_set_stock(
  p_product_id uuid,
  p_variant_id uuid,
  p_stock integer
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_product_id uuid;
begin
  perform public.require_store_admin();

  if p_stock is null or p_stock < 0 then
    raise exception 'invalid_stock';
  end if;

  if p_variant_id is not null then
    select v.product_id
    into v_product_id
    from public.product_variants v
    where v.id = p_variant_id
    for update;

    if v_product_id is null then
      raise exception 'variant_not_found';
    end if;

    if p_product_id is not null and p_product_id <> v_product_id then
      raise exception 'variant_not_found';
    end if;

    update public.product_variants
    set stock = p_stock
    where id = p_variant_id;

    update public.products
    set stock = (
      select coalesce(sum(v.stock), 0)
      from public.product_variants v
      where v.product_id = v_product_id
    )
    where id = v_product_id;

    return jsonb_build_object(
      'productId', v_product_id,
      'variantId', p_variant_id,
      'stock', p_stock
    );
  end if;

  if p_product_id is null then
    raise exception 'product_not_found';
  end if;

  perform 1
  from public.products p
  where p.id = p_product_id
  for update;

  if not found then
    raise exception 'product_not_found';
  end if;

  if exists (
    select 1 from public.product_variants v where v.product_id = p_product_id
  ) then
    raise exception 'variant_required';
  end if;

  update public.products
  set stock = p_stock
  where id = p_product_id;

  return jsonb_build_object(
    'productId', p_product_id,
    'variantId', null,
    'stock', p_stock
  );
end;
$$;

revoke all on function public.require_store_admin() from public, anon, authenticated;
revoke all on function public.get_admin_dashboard() from public, anon;
revoke all on function public.list_admin_customers() from public, anon;
revoke all on function public.list_admin_inventory() from public, anon;
revoke all on function public.admin_set_stock(uuid, uuid, integer) from public, anon;
revoke all on function public.list_admin_orders() from public, anon;

grant execute on function public.get_admin_dashboard() to authenticated;
grant execute on function public.list_admin_customers() to authenticated;
grant execute on function public.list_admin_inventory() to authenticated;
grant execute on function public.admin_set_stock(uuid, uuid, integer) to authenticated;
grant execute on function public.list_admin_orders() to authenticated;
