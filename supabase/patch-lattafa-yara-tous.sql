-- Adds Lattafa Yara Tous (perfume + decant).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000121', 'Mango', 'mango'),
  ('d0000000-0000-4000-8000-000000000122', 'Maracuyá', 'maracuya')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000067',
    'Yara Tous',
    'yara-tous',
    'a0000000-0000-4000-8000-000000000011',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia femenina tropical, dulce y luminosa que combina frutas exóticas con flores delicadas y un fondo cremoso y cálido. Yara Tous transmite una sensación juvenil, alegre y sensual, perfecta para días cálidos, salidas casuales y citas.',
    'perfume',
    'feminine',
    138,
    null,
    10,
    array['frutal', 'floral', 'tropical', 'gourmand', 'ámbar']::text[],
    array['diario', 'cita', 'fiesta', 'noche']::text[],
    4.6,
    4,
    true,
    false,
    67,
    '2026-08-26'
  ),
  (
    'c0000000-0000-4000-8000-000000000068',
    'Yara Tous',
    'yara-tous-decant',
    'a0000000-0000-4000-8000-000000000011',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia femenina tropical, dulce y luminosa que combina frutas exóticas con flores delicadas y un fondo cremoso y cálido. Yara Tous transmite una sensación juvenil, alegre y sensual, perfecta para días cálidos, salidas casuales y citas.',
    'decant',
    'feminine',
    17,
    null,
    18,
    array['frutal', 'floral', 'tropical', 'gourmand', 'ámbar']::text[],
    array['diario', 'cita', 'fiesta', 'noche']::text[],
    4.6,
    4,
    false,
    false,
    68,
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
  ('c0000000-0000-4000-8000-000000000067', '100 ml', 100, 138, null, 10, 'ELOVA-YARA-TOUS-100', true, 1),
  ('c0000000-0000-4000-8000-000000000068', '3 ml', 3, 15, null, 22, 'ELOVA-YARA-TOUS-3', false, 1),
  ('c0000000-0000-4000-8000-000000000068', '5 ml', 5, 17, null, 18, 'ELOVA-YARA-TOUS-5', false, 2),
  ('c0000000-0000-4000-8000-000000000068', '10 ml', 10, 21, null, 11, 'ELOVA-YARA-TOUS-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000067', '/images/products/product-yara-tous.png', 'Yara Tous', 0),
  ('c0000000-0000-4000-8000-000000000068', '/images/products/product-yara-tous.png', 'Yara Tous decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000067',
  'c0000000-0000-4000-8000-000000000068'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000067', 'd0000000-0000-4000-8000-000000000121', 'top', 0),
  ('c0000000-0000-4000-8000-000000000067', 'd0000000-0000-4000-8000-000000000094', 'top', 1),
  ('c0000000-0000-4000-8000-000000000067', 'd0000000-0000-4000-8000-000000000122', 'top', 2),
  ('c0000000-0000-4000-8000-000000000067', 'd0000000-0000-4000-8000-000000000083', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000067', 'd0000000-0000-4000-8000-000000000054', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000067', 'd0000000-0000-4000-8000-000000000065', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000067', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000067', 'd0000000-0000-4000-8000-000000000010', 'base', 1),
  ('c0000000-0000-4000-8000-000000000067', 'd0000000-0000-4000-8000-000000000084', 'base', 2),
  ('c0000000-0000-4000-8000-000000000068', 'd0000000-0000-4000-8000-000000000121', 'top', 0),
  ('c0000000-0000-4000-8000-000000000068', 'd0000000-0000-4000-8000-000000000094', 'top', 1),
  ('c0000000-0000-4000-8000-000000000068', 'd0000000-0000-4000-8000-000000000122', 'top', 2),
  ('c0000000-0000-4000-8000-000000000068', 'd0000000-0000-4000-8000-000000000083', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000068', 'd0000000-0000-4000-8000-000000000054', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000068', 'd0000000-0000-4000-8000-000000000065', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000068', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000068', 'd0000000-0000-4000-8000-000000000010', 'base', 1),
  ('c0000000-0000-4000-8000-000000000068', 'd0000000-0000-4000-8000-000000000084', 'base', 2)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000067', 18),
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000068', 19),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000067', 54),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000068', 55),
  ('aa000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000067', 16),
  ('aa000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000068', 17)
on conflict do nothing;
