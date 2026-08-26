-- Store-owner order management. Authenticated only; email must be in store_admins.
-- After this file, insert your /cuenta email:
--   insert into public.store_admins (email) values ('tu-correo@dominio.com');

create table if not exists public.store_admins (
  email text primary key,
  created_at timestamptz not null default now(),
  constraint store_admins_email_format check (position('@' in email) > 1),
  constraint store_admins_email_lower check (email = lower(email))
);

alter table public.store_admins enable row level security;

revoke all on table public.store_admins from public, anon, authenticated;
grant all on table public.store_admins to service_role;

create or replace function public.is_store_admin()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
begin
  v_email := lower(trim(coalesce(auth.jwt() ->> 'email', '')));

  if v_email = '' then
    return false;
  end if;

  return exists (
    select 1
    from public.store_admins a
    where a.email = v_email
  );
end;
$$;

create or replace function public.list_admin_orders()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
  v_result jsonb;
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

  select coalesce(jsonb_agg(row_data order by created_at desc), '[]'::jsonb)
  into v_result
  from (
    select
      o.created_at,
      jsonb_build_object(
        'id', o.id,
        'status', o.status,
        'total', o.total,
        'currency', o.currency,
        'createdAt', o.created_at,
        'notes', o.notes,
        'shipping', o.shipping_address,
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
    limit 50
  ) listed;

  return v_result;
end;
$$;

create or replace function public.admin_set_order_status(p_order_id uuid, p_status text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
  v_status text;
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

  if p_status not in ('paid', 'processing', 'shipped', 'delivered', 'cancelled') then
    raise exception 'invalid_transition';
  end if;

  select status into v_status
  from public.orders
  where id = p_order_id
  for update;

  if v_status is null then
    raise exception 'order_not_found';
  end if;

  if v_status = p_status then
    return jsonb_build_object('id', p_order_id, 'status', v_status);
  end if;

  if p_status = 'paid' then
    if v_status <> 'pending' then
      raise exception 'invalid_transition';
    end if;

    perform public.confirm_order_payment(p_order_id);
    return jsonb_build_object('id', p_order_id, 'status', 'paid');
  end if;

  if
    (v_status = 'pending' and p_status = 'cancelled')
    or (v_status = 'paid' and p_status in ('processing', 'cancelled'))
    or (v_status = 'processing' and p_status = 'shipped')
    or (v_status = 'shipped' and p_status = 'delivered')
  then
    update public.orders
    set status = p_status
    where id = p_order_id;

    return jsonb_build_object('id', p_order_id, 'status', p_status);
  end if;

  raise exception 'invalid_transition';
end;
$$;

revoke all on function public.is_store_admin() from public, anon;
revoke all on function public.list_admin_orders() from public, anon;
revoke all on function public.admin_set_order_status(uuid, text) from public, anon;
revoke all on function public.confirm_order_payment(uuid) from public, anon, authenticated;

grant execute on function public.is_store_admin() to authenticated;
grant execute on function public.list_admin_orders() to authenticated;
grant execute on function public.admin_set_order_status(uuid, text) to authenticated;
