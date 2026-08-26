drop function if exists public.place_order(text, text, text, text, jsonb);

create or replace function public.place_order(
  p_email text,
  p_full_name text,
  p_phone text,
  p_notes text,
  p_items jsonb,
  p_shipping jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
  v_name text;
  v_phone text;
  v_customer_id uuid;
  v_order_id uuid;
  v_item jsonb;
  v_product_id uuid;
  v_variant_id uuid;
  v_qty integer;
  v_unit numeric(10, 2);
  v_product_name text;
  v_label text;
  v_subtotal numeric(10, 2) := 0;
  v_line text;
  v_district text;
  v_city text;
  v_department text;
  v_shipping jsonb;
begin
  v_email := lower(trim(coalesce(p_email, '')));
  v_name := nullif(trim(coalesce(p_full_name, '')), '');
  v_phone := nullif(trim(coalesce(p_phone, '')), '');

  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'invalid_email';
  end if;

  if v_name is null then
    raise exception 'invalid_name';
  end if;

  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) < 1 then
    raise exception 'empty_cart';
  end if;

  if jsonb_array_length(p_items) > 20 then
    raise exception 'too_many_items';
  end if;

  if p_shipping is null or jsonb_typeof(p_shipping) <> 'object' then
    raise exception 'invalid_shipping';
  end if;

  v_line := nullif(trim(coalesce(p_shipping->>'line', '')), '');
  v_district := nullif(trim(coalesce(p_shipping->>'district', '')), '');
  v_city := nullif(trim(coalesce(p_shipping->>'city', '')), '');
  v_department := nullif(trim(coalesce(p_shipping->>'department', '')), '');

  if v_line is null or v_city is null or v_department is null then
    raise exception 'invalid_shipping';
  end if;

  if char_length(v_line) > 160 or char_length(v_city) > 80 or char_length(coalesce(v_district, '')) > 80 or char_length(v_department) > 80 then
    raise exception 'invalid_shipping';
  end if;

  v_shipping := jsonb_strip_nulls(
    jsonb_build_object(
      'line', v_line,
      'district', v_district,
      'city', v_city,
      'department', v_department
    )
  );

  insert into public.customers (email, full_name, phone)
  values (v_email, v_name, v_phone)
  on conflict (email) do update
    set
      full_name = excluded.full_name,
      phone = coalesce(excluded.phone, public.customers.phone),
      updated_at = now()
  returning id into v_customer_id;

  insert into public.orders (
    customer_id, status, subtotal, shipping_amount, total, currency, notes, shipping_address
  )
  values (
    v_customer_id, 'pending', 0, 0, 0, 'PEN', nullif(trim(coalesce(p_notes, '')), ''), v_shipping
  )
  returning id into v_order_id;

  for v_item in select value from jsonb_array_elements(p_items)
  loop
    begin
      v_product_id := (v_item->>'product_id')::uuid;
    exception
      when invalid_text_representation then
        raise exception 'invalid_product';
    end;

    v_qty := coalesce((v_item->>'quantity')::integer, 0);
    v_label := nullif(trim(coalesce(v_item->>'size_label', '')), '');

    if v_qty < 1 or v_qty > 12 then
      raise exception 'invalid_quantity';
    end if;

    select p.name into v_product_name
    from public.products p
    where p.id = v_product_id and p.published = true;

    if v_product_name is null then
      raise exception 'invalid_product';
    end if;

    v_variant_id := null;
    v_unit := null;

    if v_label is not null then
      select pv.id, pv.price
        into v_variant_id, v_unit
      from public.product_variants pv
      where pv.product_id = v_product_id and pv.label = v_label
      limit 1;
    end if;

    if v_unit is null then
      select p.price into v_unit
      from public.products p
      where p.id = v_product_id;
    end if;

    insert into public.order_items (
      order_id, product_id, variant_id, product_name, quantity, unit_price
    )
    values (
      v_order_id, v_product_id, v_variant_id, v_product_name, v_qty, v_unit
    );

    v_subtotal := v_subtotal + (v_unit * v_qty);
  end loop;

  -- Shipping amount stays 0 until a carrier is defined.
  update public.orders
  set subtotal = v_subtotal, total = v_subtotal + shipping_amount
  where id = v_order_id;

  return v_order_id;
end;
$$;

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
    'shippingAmount', v_order.shipping_amount,
    'shipping', v_order.shipping_address,
    'items', v_items
  );
end;
$$;

revoke all on function public.place_order(text, text, text, text, jsonb, jsonb) from public;
grant execute on function public.place_order(text, text, text, text, jsonb, jsonb) to anon, authenticated;
