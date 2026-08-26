-- Adds Armaf Odyssey Mandarin Sky (perfume + decant).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000097', 'Naranja', 'naranja'),
  ('d0000000-0000-4000-8000-000000000098', 'Caramelo', 'caramelo'),
  ('d0000000-0000-4000-8000-000000000099', 'Cumarina', 'cumarina'),
  ('d0000000-0000-4000-8000-000000000100', 'Ambroxan', 'ambroxan')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000041',
    'Odyssey Mandarin Sky',
    'odyssey-mandarin-sky',
    'a0000000-0000-4000-8000-000000000012',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia masculina dulce, cítrica y moderna que combina la frescura de la mandarina con un corazón gourmand y un fondo cálido y amaderado. Odyssey Mandarin Sky ofrece un aroma llamativo, juvenil y seductor, ideal para el día a día, citas y salidas nocturnas.',
    'perfume',
    'masculine',
    155,
    null,
    10,
    array['cítrico', 'frutal', 'ámbar', 'gourmand', 'amaderado']::text[],
    array['diario', 'cita', 'fiesta', 'noche']::text[],
    4.6,
    4,
    true,
    false,
    41,
    '2026-08-26'
  ),
  (
    'c0000000-0000-4000-8000-000000000042',
    'Odyssey Mandarin Sky',
    'odyssey-mandarin-sky-decant',
    'a0000000-0000-4000-8000-000000000012',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia masculina dulce, cítrica y moderna que combina la frescura de la mandarina con un corazón gourmand y un fondo cálido y amaderado. Odyssey Mandarin Sky ofrece un aroma llamativo, juvenil y seductor, ideal para el día a día, citas y salidas nocturnas.',
    'decant',
    'masculine',
    18,
    null,
    18,
    array['cítrico', 'frutal', 'ámbar', 'gourmand', 'amaderado']::text[],
    array['diario', 'cita', 'fiesta', 'noche']::text[],
    4.6,
    4,
    false,
    false,
    42,
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
  ('c0000000-0000-4000-8000-000000000041', '100 ml', 100, 155, null, 10, 'ELOVA-MANDARIN-100', true, 1),
  ('c0000000-0000-4000-8000-000000000042', '3 ml', 3, 15, null, 22, 'ELOVA-MANDARIN-3', false, 1),
  ('c0000000-0000-4000-8000-000000000042', '5 ml', 5, 18, null, 18, 'ELOVA-MANDARIN-5', false, 2),
  ('c0000000-0000-4000-8000-000000000042', '10 ml', 10, 24, null, 11, 'ELOVA-MANDARIN-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000041', '/images/products/product-odyssey-mandarin-sky.png', 'Odyssey Mandarin Sky', 0),
  ('c0000000-0000-4000-8000-000000000042', '/images/products/product-odyssey-mandarin-sky.png', 'Odyssey Mandarin Sky decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000041',
  'c0000000-0000-4000-8000-000000000042'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000041', 'd0000000-0000-4000-8000-000000000048', 'top', 0),
  ('c0000000-0000-4000-8000-000000000041', 'd0000000-0000-4000-8000-000000000097', 'top', 1),
  ('c0000000-0000-4000-8000-000000000041', 'd0000000-0000-4000-8000-000000000011', 'top', 2),
  ('c0000000-0000-4000-8000-000000000041', 'd0000000-0000-4000-8000-000000000098', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000041', 'd0000000-0000-4000-8000-000000000041', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000041', 'd0000000-0000-4000-8000-000000000099', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000041', 'd0000000-0000-4000-8000-000000000028', 'base', 0),
  ('c0000000-0000-4000-8000-000000000041', 'd0000000-0000-4000-8000-000000000023', 'base', 1),
  ('c0000000-0000-4000-8000-000000000041', 'd0000000-0000-4000-8000-000000000100', 'base', 2),
  ('c0000000-0000-4000-8000-000000000042', 'd0000000-0000-4000-8000-000000000048', 'top', 0),
  ('c0000000-0000-4000-8000-000000000042', 'd0000000-0000-4000-8000-000000000097', 'top', 1),
  ('c0000000-0000-4000-8000-000000000042', 'd0000000-0000-4000-8000-000000000011', 'top', 2),
  ('c0000000-0000-4000-8000-000000000042', 'd0000000-0000-4000-8000-000000000098', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000042', 'd0000000-0000-4000-8000-000000000041', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000042', 'd0000000-0000-4000-8000-000000000099', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000042', 'd0000000-0000-4000-8000-000000000028', 'base', 0),
  ('c0000000-0000-4000-8000-000000000042', 'd0000000-0000-4000-8000-000000000023', 'base', 1),
  ('c0000000-0000-4000-8000-000000000042', 'd0000000-0000-4000-8000-000000000100', 'base', 2)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000041', 8),
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000042', 9),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000041', 28),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000042', 29),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000041', 24),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000042', 25)
on conflict do nothing;
