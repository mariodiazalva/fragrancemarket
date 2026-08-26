-- ELOVA sets. Run after seed.sql and seed-catalog.sql.
-- Links sets to the existing type=set products and their decants.

insert into public.sets (
  id, product_id, name, slug, description, price, compare_at_price,
  image_url, featured, published, created_at
) values
  (
    'e0000000-0000-4000-8000-000000000001',
    'c0000000-0000-4000-8000-000000000018',
    'Date Night',
    'date-night',
    'Tres decants para una noche que pide algo más cercano.',
    189,
    240,
    '/images/sets/set-date-night.png',
    true,
    true,
    '2026-05-20'
  ),
  (
    'e0000000-0000-4000-8000-000000000002',
    'c0000000-0000-4000-8000-000000000019',
    'Daily',
    'daily',
    'Una rotación clara para el día: fresco, limpio y fácil de repetir.',
    159,
    199,
    '/images/sets/set-daily.png',
    true,
    true,
    '2026-05-22'
  ),
  (
    'e0000000-0000-4000-8000-000000000003',
    'c0000000-0000-4000-8000-000000000020',
    'Signature',
    'signature',
    'Piezas con carácter, para quien ya sabe cómo quiere oler.',
    219,
    280,
    '/images/sets/set-signature.png',
    true,
    true,
    '2026-06-10'
  ),
  (
    'e0000000-0000-4000-8000-000000000004',
    'c0000000-0000-4000-8000-000000000021',
    'Arabian',
    'arabian',
    'Ouds y resinas en formato decant, para explorar sin prisa.',
    239,
    310,
    '/images/sets/set-arabian.png',
    true,
    true,
    '2026-06-28'
  )
on conflict (slug) do nothing;

insert into public.set_products (
  set_id, product_id, size_label, quantity, individual_price, position
) values
  ('e0000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000015', '5 ml', 1, 18, 0),
  ('e0000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000009', '5 ml', 1, 35, 1),
  ('e0000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000016', '5 ml', 1, 30, 2),
  ('e0000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000014', '5 ml', 1, 25, 0),
  ('e0000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000013', '5 ml', 1, 52, 1),
  ('e0000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000011', '5 ml', 1, 18, 2),
  ('e0000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000009', '5 ml', 1, 35, 0),
  ('e0000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000011', '5 ml', 1, 18, 1),
  ('e0000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000015', '5 ml', 1, 18, 2),
  ('e0000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000012', '5 ml', 1, 45, 0),
  ('e0000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000017', '5 ml', 1, 76, 1),
  ('e0000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000011', '5 ml', 1, 18, 2)
on conflict do nothing;
