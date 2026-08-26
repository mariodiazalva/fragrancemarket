-- Adds Lattafa Khamrah (perfume + decant).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000101', 'Dátiles', 'datiles'),
  ('d0000000-0000-4000-8000-000000000102', 'Nardos', 'nardos'),
  ('d0000000-0000-4000-8000-000000000103', 'Mahonial', 'mahonial'),
  ('d0000000-0000-4000-8000-000000000104', 'Mirra', 'mirra'),
  ('d0000000-0000-4000-8000-000000000105', 'Akigalawood', 'akigalawood')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000043',
    'Khamrah',
    'khamrah',
    'a0000000-0000-4000-8000-000000000011',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia dulce, cálida y envolvente con un marcado carácter gourmand. Khamrah combina especias aromáticas con canela, dátiles y praliné, creando un aroma seductor y adictivo que destaca especialmente durante la noche y en climas frescos.',
    'perfume',
    'unisex',
    155,
    null,
    10,
    array['ámbar', 'gourmand', 'especiado', 'oriental']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    true,
    false,
    43,
    '2026-08-26'
  ),
  (
    'c0000000-0000-4000-8000-000000000044',
    'Khamrah',
    'khamrah-decant',
    'a0000000-0000-4000-8000-000000000011',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia dulce, cálida y envolvente con un marcado carácter gourmand. Khamrah combina especias aromáticas con canela, dátiles y praliné, creando un aroma seductor y adictivo que destaca especialmente durante la noche y en climas frescos.',
    'decant',
    'unisex',
    32,
    null,
    18,
    array['ámbar', 'gourmand', 'especiado', 'oriental']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    false,
    false,
    44,
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
  ('c0000000-0000-4000-8000-000000000043', '100 ml', 100, 155, null, 10, 'ELOVA-KHAMRAH-100', true, 1),
  ('c0000000-0000-4000-8000-000000000044', '3 ml', 3, 23, null, 22, 'ELOVA-KHAMRAH-3', false, 1),
  ('c0000000-0000-4000-8000-000000000044', '5 ml', 5, 32, null, 18, 'ELOVA-KHAMRAH-5', false, 2),
  ('c0000000-0000-4000-8000-000000000044', '10 ml', 10, 45, null, 11, 'ELOVA-KHAMRAH-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000043', '/images/products/product-khamrah.png', 'Khamrah', 0),
  ('c0000000-0000-4000-8000-000000000044', '/images/products/product-khamrah.png', 'Khamrah decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000043',
  'c0000000-0000-4000-8000-000000000044'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000039', 'top', 0),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000077', 'top', 1),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000002', 'top', 2),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000101', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000044', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000102', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000103', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000041', 'base', 1),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000104', 'base', 2),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000006', 'base', 3),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000095', 'base', 4),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000105', 'base', 5),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000039', 'top', 0),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000077', 'top', 1),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000002', 'top', 2),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000101', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000044', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000102', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000103', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000041', 'base', 1),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000104', 'base', 2),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000006', 'base', 3),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000095', 'base', 4),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000105', 'base', 5)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000043', 30),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000044', 31),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000043', 26),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000044', 27)
on conflict do nothing;
