alter table public.orders
  add column if not exists discount_amount numeric(10, 2) not null default 0,
  add column if not exists coupon_code text;

create or replace function public.quote_coupon_discount(
  p_code text,
  p_subtotal numeric,
  p_shipping numeric,
  p_arabic_subtotal numeric
)
returns numeric
language plpgsql
immutable
as $$
declare
  v_code text;
begin
  v_code := lower(trim(coalesce(p_code, '')));

  if v_code = '' then
    return 0;
  end if;

  if v_code = 'baees10' then
    return round(
      ((greatest(coalesce(p_subtotal, 0), 0) + greatest(coalesce(p_shipping, 0), 0)) * 0.10
        + greatest(coalesce(p_arabic_subtotal, 0), 0) * 0.05)::numeric,
      2
    );
  end if;

  return null;
end;
$$;

drop function if exists public.place_order(text, text, text, text, jsonb, jsonb, jsonb);

create or replace function public.place_order(
  p_email text,
  p_full_name text,
  p_phone text,
  p_notes text,
  p_items jsonb,
  p_shipping jsonb,
  p_billing jsonb,
  p_coupon text default null
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
  v_slug text;
  v_label text;
  v_subtotal numeric(10, 2) := 0;
  v_arabic_subtotal numeric(10, 2) := 0;
  v_discount numeric(10, 2) := 0;
  v_coupon text;
  v_coupon_code text;
  v_shipping_amount numeric(10, 2);
  v_line text;
  v_district text;
  v_city text;
  v_department text;
  v_carrier text;
  v_agency_id text;
  v_shipping jsonb;
  v_billing_line text;
  v_billing_district text;
  v_billing_city text;
  v_billing_department text;
  v_dni text;
  v_billing jsonb;
begin
  v_email := lower(trim(coalesce(p_email, '')));
  v_name := nullif(trim(coalesce(p_full_name, '')), '');
  v_phone := nullif(trim(coalesce(p_phone, '')), '');
  v_coupon := lower(trim(coalesce(p_coupon, '')));

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
  v_carrier := nullif(trim(coalesce(p_shipping->>'carrier', '')), '');
  v_agency_id := nullif(trim(coalesce(p_shipping->>'agencyId', '')), '');

  if v_carrier is null or v_carrier not in ('Shalom', 'Pickup', 'Local') then
    raise exception 'invalid_shipping';
  end if;

  if v_carrier = 'Pickup' then
    v_line := 'Rosas de América MZ D LT 3 Grupo 1';
    v_district := 'Trujillo';
    v_city := 'Trujillo';
    v_department := 'La Libertad';
    v_agency_id := null;
  elsif v_carrier = 'Local' then
    if v_line is null or v_district is null or v_city is null or v_department is null then
      raise exception 'invalid_shipping';
    end if;

    if public.normalize_place_text(v_department) <> 'la libertad' then
      raise exception 'invalid_shipping';
    end if;

    if public.normalize_place_text(v_city) <> 'trujillo' then
      raise exception 'invalid_shipping';
    end if;

    v_agency_id := null;
  elsif v_carrier = 'Shalom' then
    if v_line is null or v_city is null or v_department is null or v_agency_id is null then
      raise exception 'invalid_shipping';
    end if;
  end if;

  if v_line is null or v_city is null or v_department is null then
    raise exception 'invalid_shipping';
  end if;

  if char_length(v_line) > 160 or char_length(v_city) > 80 or char_length(coalesce(v_district, '')) > 80 or char_length(v_department) > 80 then
    raise exception 'invalid_shipping';
  end if;

  v_shipping_amount := public.quote_shipping_amount(v_carrier, v_district, v_line);

  if v_shipping_amount is null then
    raise exception 'invalid_shipping';
  end if;

  v_shipping := jsonb_strip_nulls(
    jsonb_build_object(
      'line', v_line,
      'district', v_district,
      'city', v_city,
      'department', v_department,
      'carrier', v_carrier,
      'agencyId', v_agency_id
    )
  );

  if p_billing is null or jsonb_typeof(p_billing) <> 'object' then
    raise exception 'invalid_billing';
  end if;

  v_billing_line := nullif(trim(coalesce(p_billing->>'line', '')), '');
  v_billing_district := nullif(trim(coalesce(p_billing->>'district', '')), '');
  v_billing_city := nullif(trim(coalesce(p_billing->>'city', '')), '');
  v_billing_department := nullif(trim(coalesce(p_billing->>'department', '')), '');
  v_dni := nullif(regexp_replace(coalesce(p_billing->>'dni', ''), '\D', '', 'g'), '');

  if v_billing_line is null or v_billing_city is null or v_billing_department is null or v_dni is null then
    raise exception 'invalid_billing';
  end if;

  if char_length(v_dni) < 8 or char_length(v_dni) > 9 then
    raise exception 'invalid_billing';
  end if;

  if char_length(v_billing_line) < 5 or char_length(v_billing_line) > 160 or char_length(v_billing_city) > 80 or char_length(coalesce(v_billing_district, '')) > 80 or char_length(v_billing_department) > 80 then
    raise exception 'invalid_billing';
  end if;

  v_billing := jsonb_strip_nulls(
    jsonb_build_object(
      'line', v_billing_line,
      'district', v_billing_district,
      'city', v_billing_city,
      'department', v_billing_department,
      'dni', v_dni
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
    customer_id, status, subtotal, shipping_amount, discount_amount, total, currency, notes, shipping_address, billing_address, coupon_code
  )
  values (
    v_customer_id, 'pending', 0, v_shipping_amount, 0, v_shipping_amount, 'PEN', nullif(trim(coalesce(p_notes, '')), ''), v_shipping, v_billing, null
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

    select p.name, p.slug into v_product_name, v_slug
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

    if v_slug in ('yara-elixir', 'odyssey-mandarin-sky', 'khamrah-qahwa', '9-pm') then
      v_arabic_subtotal := v_arabic_subtotal + (v_unit * v_qty);
    end if;
  end loop;

  v_discount := public.quote_coupon_discount(v_coupon, v_subtotal, v_shipping_amount, v_arabic_subtotal);

  if v_discount is null then
    raise exception 'invalid_coupon';
  end if;

  if v_coupon = 'baees10' then
    v_coupon_code := 'BAEES10';
  else
    v_coupon_code := null;
  end if;

  update public.orders
  set
    subtotal = v_subtotal,
    discount_amount = v_discount,
    coupon_code = v_coupon_code,
    total = v_subtotal + shipping_amount - v_discount
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
    'discountAmount', coalesce(v_order.discount_amount, 0),
    'couponCode', v_order.coupon_code,
    'shipping', v_order.shipping_address,
    'billing', v_order.billing_address,
    'customer', v_customer,
    'items', v_items
  );
end;
$$;

revoke all on function public.quote_coupon_discount(text, numeric, numeric, numeric) from public;
grant execute on function public.quote_coupon_discount(text, numeric, numeric, numeric) to anon, authenticated;
revoke all on function public.place_order(text, text, text, text, jsonb, jsonb, jsonb, text) from public;
grant execute on function public.place_order(text, text, text, text, jsonb, jsonb, jsonb, text) to anon, authenticated;
revoke all on function public.get_order_for_payment(uuid) from public;
grant execute on function public.get_order_for_payment(uuid) to anon, authenticated;
