-- Adds Xerjoff Naxos (perfume + decant).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000082', 'Miel', 'miel'),
  ('d0000000-0000-4000-8000-000000000083', 'Jazmín', 'jazmin'),
  ('d0000000-0000-4000-8000-000000000084', 'Cashmeran', 'cashmeran'),
  ('d0000000-0000-4000-8000-000000000085', 'Tabaco', 'tabaco')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000029',
    'Naxos',
    'naxos',
    'a0000000-0000-4000-8000-000000000016',
    'b0000000-0000-4000-8000-000000000001',
    'Una fragancia lujosa, cálida y sofisticada que combina cítricos frescos con lavanda, miel y tabaco. Naxos destaca por su carácter dulce, elegante y envolvente, con una excelente presencia y un fondo cálido de vainilla y haba tonka. Una opción refinada y memorable, perfecta para destacar en ocasiones especiales.',
    'perfume',
    'unisex',
    970,
    null,
    10,
    array['aromático', 'ámbar', 'cítrico', 'floral', 'gourmand']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    true,
    false,
    29,
    '2026-08-25'
  ),
  (
    'c0000000-0000-4000-8000-000000000030',
    'Naxos',
    'naxos-decant',
    'a0000000-0000-4000-8000-000000000016',
    'b0000000-0000-4000-8000-000000000001',
    'Una fragancia lujosa, cálida y sofisticada que combina cítricos frescos con lavanda, miel y tabaco. Naxos destaca por su carácter dulce, elegante y envolvente, con una excelente presencia y un fondo cálido de vainilla y haba tonka. Una opción refinada y memorable, perfecta para destacar en ocasiones especiales.',
    'decant',
    'unisex',
    63,
    null,
    18,
    array['aromático', 'ámbar', 'cítrico', 'floral', 'gourmand']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    false,
    false,
    30,
    '2026-08-25'
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
  ('c0000000-0000-4000-8000-000000000029', '100 ml', 100, 970, null, 10, 'ELOVA-NAXOS-100', true, 1),
  ('c0000000-0000-4000-8000-000000000030', '3 ml', 3, 35, null, 22, 'ELOVA-NAXOS-3', false, 1),
  ('c0000000-0000-4000-8000-000000000030', '5 ml', 5, 63, null, 18, 'ELOVA-NAXOS-5', false, 2),
  ('c0000000-0000-4000-8000-000000000030', '10 ml', 10, 115, null, 11, 'ELOVA-NAXOS-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000029', '/images/products/product-naxos.png', 'Naxos', 0),
  ('c0000000-0000-4000-8000-000000000030', '/images/products/product-naxos.png', 'Naxos decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000029',
  'c0000000-0000-4000-8000-000000000030'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000019', 'top', 0),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000002', 'top', 1),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000049', 'top', 2),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000082', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000039', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000083', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000084', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000085', 'base', 0),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000009', 'base', 1),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000041', 'base', 2),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000010', 'base', 3),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000019', 'top', 0),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000002', 'top', 1),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000049', 'top', 2),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000082', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000039', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000083', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000084', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000085', 'base', 0),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000009', 'base', 1),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000041', 'base', 2),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000010', 'base', 3)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000029', 6),
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000030', 7),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000029', 16),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000030', 17),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000029', 12),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000030', 13),
  ('aa000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000029', 4),
  ('aa000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000030', 5)
on conflict do nothing;
