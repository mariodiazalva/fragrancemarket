-- Adds Lattafa The Kingdom (perfume + decant).
-- Safe to re-run.

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000049',
    'The Kingdom',
    'the-kingdom',
    'a0000000-0000-4000-8000-000000000011',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia masculina dulce, cálida y sofisticada, con un carácter intenso y seductor. The Kingdom combina notas aromáticas con acordes gourmand y una base cálida de vainilla, creando un aroma moderno, envolvente y versátil, ideal para destacar especialmente durante la noche.',
    'perfume',
    'masculine',
    145,
    null,
    10,
    array['ámbar', 'gourmand', 'aromático', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.6,
    4,
    true,
    false,
    49,
    '2026-08-26'
  ),
  (
    'c0000000-0000-4000-8000-000000000050',
    'The Kingdom',
    'the-kingdom-decant',
    'a0000000-0000-4000-8000-000000000011',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia masculina dulce, cálida y sofisticada, con un carácter intenso y seductor. The Kingdom combina notas aromáticas con acordes gourmand y una base cálida de vainilla, creando un aroma moderno, envolvente y versátil, ideal para destacar especialmente durante la noche.',
    'decant',
    'masculine',
    18,
    null,
    18,
    array['ámbar', 'gourmand', 'aromático', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.6,
    4,
    false,
    false,
    50,
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
  ('c0000000-0000-4000-8000-000000000049', '100 ml', 100, 145, null, 10, 'ELOVA-KINGDOM-100', true, 1),
  ('c0000000-0000-4000-8000-000000000050', '3 ml', 3, 15, null, 22, 'ELOVA-KINGDOM-3', false, 1),
  ('c0000000-0000-4000-8000-000000000050', '5 ml', 5, 18, null, 18, 'ELOVA-KINGDOM-5', false, 2),
  ('c0000000-0000-4000-8000-000000000050', '10 ml', 10, 23, null, 11, 'ELOVA-KINGDOM-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000049', '/images/products/product-the-kingdom.png', 'The Kingdom', 0),
  ('c0000000-0000-4000-8000-000000000050', '/images/products/product-the-kingdom.png', 'The Kingdom decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000049',
  'c0000000-0000-4000-8000-000000000050'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000049', 'd0000000-0000-4000-8000-000000000049', 'top', 0),
  ('c0000000-0000-4000-8000-000000000049', 'd0000000-0000-4000-8000-000000000051', 'top', 1),
  ('c0000000-0000-4000-8000-000000000049', 'd0000000-0000-4000-8000-000000000048', 'top', 2),
  ('c0000000-0000-4000-8000-000000000049', 'd0000000-0000-4000-8000-000000000039', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000049', 'd0000000-0000-4000-8000-000000000085', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000049', 'd0000000-0000-4000-8000-000000000009', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000049', 'd0000000-0000-4000-8000-000000000041', 'base', 0),
  ('c0000000-0000-4000-8000-000000000049', 'd0000000-0000-4000-8000-000000000006', 'base', 1),
  ('c0000000-0000-4000-8000-000000000049', 'd0000000-0000-4000-8000-000000000010', 'base', 2),
  ('c0000000-0000-4000-8000-000000000050', 'd0000000-0000-4000-8000-000000000049', 'top', 0),
  ('c0000000-0000-4000-8000-000000000050', 'd0000000-0000-4000-8000-000000000051', 'top', 1),
  ('c0000000-0000-4000-8000-000000000050', 'd0000000-0000-4000-8000-000000000048', 'top', 2),
  ('c0000000-0000-4000-8000-000000000050', 'd0000000-0000-4000-8000-000000000039', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000050', 'd0000000-0000-4000-8000-000000000085', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000050', 'd0000000-0000-4000-8000-000000000009', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000050', 'd0000000-0000-4000-8000-000000000041', 'base', 0),
  ('c0000000-0000-4000-8000-000000000050', 'd0000000-0000-4000-8000-000000000006', 'base', 1),
  ('c0000000-0000-4000-8000-000000000050', 'd0000000-0000-4000-8000-000000000010', 'base', 2)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000049', 36),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000050', 37),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000049', 32),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000050', 33)
on conflict do nothing;
