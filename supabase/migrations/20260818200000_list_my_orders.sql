create or replace function public.list_my_orders()
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

revoke all on function public.list_my_orders() from public, anon;
grant execute on function public.list_my_orders() to authenticated;
