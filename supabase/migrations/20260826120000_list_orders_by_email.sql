-- Guest order lookup by checkout email. No magic link or auth required.

create or replace function public.list_orders_by_email(p_email text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
  v_result jsonb;
begin
  v_email := lower(trim(coalesce(p_email, '')));

  if v_email = '' or position('@' in v_email) = 0 then
    raise exception 'invalid_email';
  end if;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'id', o.id,
        'status', o.status,
        'total', o.total,
        'currency', o.currency,
        'createdAt', o.created_at
      )
      order by o.created_at desc
    ),
    '[]'::jsonb
  )
  into v_result
  from (
    select o.id, o.status, o.total, o.currency, o.created_at
    from public.orders o
    join public.customers c on c.id = o.customer_id
    where c.email = v_email
    order by o.created_at desc
    limit 20
  ) o;

  return v_result;
end;
$$;

revoke all on function public.list_orders_by_email(text) from public;
grant execute on function public.list_orders_by_email(text) to anon, authenticated;
