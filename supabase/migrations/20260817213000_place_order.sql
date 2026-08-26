create or replace function public.place_order(
  p_email text,
  p_full_name text,
  p_phone text,
  p_notes text,
  p_items jsonb
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

  insert into public.customers (email, full_name, phone)
  values (v_email, v_name, v_phone)
  on conflict (email) do update
    set
      full_name = excluded.full_name,
      phone = coalesce(excluded.phone, public.customers.phone),
      updated_at = now()
  returning id into v_customer_id;

  insert into public.orders (
    customer_id, status, subtotal, shipping_amount, total, currency, notes
  )
  values (
    v_customer_id, 'pending', 0, 0, 0, 'PEN', nullif(trim(coalesce(p_notes, '')), '')
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

  update public.orders
  set subtotal = v_subtotal, total = v_subtotal
  where id = v_order_id;

  return v_order_id;
end;
$$;

revoke all on function public.place_order(text, text, text, text, jsonb) from public;
grant execute on function public.place_order(text, text, text, text, jsonb) to anon, authenticated;
