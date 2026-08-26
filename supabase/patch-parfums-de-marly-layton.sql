-- Adds Parfums de Marly Layton (perfume + decant).
-- Safe to re-run.

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000020', 'Parfums de Marly', 'parfums-de-marly')
on conflict (slug) do nothing;

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000108', 'Guayaco', 'guayaco')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000047',
    'Layton',
    'layton',
    'a0000000-0000-4000-8000-000000000020',
    'b0000000-0000-4000-8000-000000000001',
    'Una fragancia elegante, sofisticada y seductora que combina frescas notas frutales con especias, flores y un fondo cálido y amaderado. Layton destaca por su versatilidad y su carácter refinado, ofreciendo una excelente presencia tanto de día como de noche.',
    'perfume',
    'unisex',
    990,
    null,
    10,
    array['ámbar', 'floral', 'frutal', 'especiado', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    true,
    false,
    47,
    '2026-08-26'
  ),
  (
    'c0000000-0000-4000-8000-000000000048',
    'Layton',
    'layton-decant',
    'a0000000-0000-4000-8000-000000000020',
    'b0000000-0000-4000-8000-000000000001',
    'Una fragancia elegante, sofisticada y seductora que combina frescas notas frutales con especias, flores y un fondo cálido y amaderado. Layton destaca por su versatilidad y su carácter refinado, ofreciendo una excelente presencia tanto de día como de noche.',
    'decant',
    'unisex',
    87,
    null,
    18,
    array['ámbar', 'floral', 'frutal', 'especiado', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    false,
    false,
    48,
    '2026-08-26'
  )
on conflict (id) do update set
  name = excluded.name,
  slug = excluded.slug,
  brand_id = excluded.brand_id,
  category_id = excluded.category_id,
  description = excluded.description,
  type = excluded.type,
  gender = excluded.gender,
  price = excluded.price,
  stock = excluded.stock,
  fragrance_family = excluded.fragrance_family,
  occasions = excluded.occasions,
  intensity = excluded.intensity,
  featured = excluded.featured,
  bestseller = excluded.bestseller;

insert into public.product_variants (
  product_id, label, volume_ml, price, compare_at_price, stock, sku, is_full_bottle, sort_order
) values
  ('c0000000-0000-4000-8000-000000000047', '125 ml', 125, 990, null, 10, 'ELOVA-LAYTON-125', true, 1),
  ('c0000000-0000-4000-8000-000000000048', '3 ml', 3, 55, null, 22, 'ELOVA-LAYTON-3', false, 1),
  ('c0000000-0000-4000-8000-000000000048', '5 ml', 5, 87, null, 18, 'ELOVA-LAYTON-5', false, 2),
  ('c0000000-0000-4000-8000-000000000048', '10 ml', 10, 120, null, 11, 'ELOVA-LAYTON-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000047', '/images/products/product-layton.png', 'Layton', 0),
  ('c0000000-0000-4000-8000-000000000048', '/images/products/product-layton.png', 'Layton decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000047',
  'c0000000-0000-4000-8000-000000000048'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000047', 'd0000000-0000-4000-8000-000000000107', 'top', 0),
  ('c0000000-0000-4000-8000-000000000047', 'd0000000-0000-4000-8000-000000000002', 'top', 1),
  ('c0000000-0000-4000-8000-000000000047', 'd0000000-0000-4000-8000-000000000049', 'top', 2),
  ('c0000000-0000-4000-8000-000000000047', 'd0000000-0000-4000-8000-000000000083', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000047', 'd0000000-0000-4000-8000-000000000017', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000047', 'd0000000-0000-4000-8000-000000000050', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000047', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000047', 'd0000000-0000-4000-8000-000000000025', 'base', 1),
  ('c0000000-0000-4000-8000-000000000047', 'd0000000-0000-4000-8000-000000000064', 'base', 2),
  ('c0000000-0000-4000-8000-000000000047', 'd0000000-0000-4000-8000-000000000052', 'base', 3),
  ('c0000000-0000-4000-8000-000000000047', 'd0000000-0000-4000-8000-000000000108', 'base', 4),
  ('c0000000-0000-4000-8000-000000000048', 'd0000000-0000-4000-8000-000000000107', 'top', 0),
  ('c0000000-0000-4000-8000-000000000048', 'd0000000-0000-4000-8000-000000000002', 'top', 1),
  ('c0000000-0000-4000-8000-000000000048', 'd0000000-0000-4000-8000-000000000049', 'top', 2),
  ('c0000000-0000-4000-8000-000000000048', 'd0000000-0000-4000-8000-000000000083', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000048', 'd0000000-0000-4000-8000-000000000017', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000048', 'd0000000-0000-4000-8000-000000000050', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000048', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000048', 'd0000000-0000-4000-8000-000000000025', 'base', 1),
  ('c0000000-0000-4000-8000-000000000048', 'd0000000-0000-4000-8000-000000000064', 'base', 2),
  ('c0000000-0000-4000-8000-000000000048', 'd0000000-0000-4000-8000-000000000052', 'base', 3),
  ('c0000000-0000-4000-8000-000000000048', 'd0000000-0000-4000-8000-000000000108', 'base', 4)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000047', 34),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000048', 35),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000047', 30),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000048', 31),
  ('aa000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000047', 8),
  ('aa000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000048', 9)
on conflict do nothing;
