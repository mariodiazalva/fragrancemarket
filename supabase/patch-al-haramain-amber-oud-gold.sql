-- Adds Al Haramain Amber Oud Gold Edition (perfume + decant).
-- Safe to re-run.

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000019', 'Al Haramain', 'al-haramain')
on conflict (slug) do nothing;

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000079', 'Acordes verdes', 'acordes-verdes'),
  ('d0000000-0000-4000-8000-000000000080', 'Melón', 'melon'),
  ('d0000000-0000-4000-8000-000000000081', 'Piña', 'pina')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000027',
    'Amber Oud Gold Edition',
    'amber-oud-gold-edition',
    'a0000000-0000-4000-8000-000000000019',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia lujosa, dulce y vibrante con un marcado carácter frutal. Amber Oud Gold Edition combina frutas exóticas y cítricos con una base cálida de vainilla, ámbar y almizcle, creando un aroma elegante, llamativo y de gran presencia. Su perfil unisex la hace versátil para cualquier ocasión.',
    'perfume',
    'unisex',
    260,
    null,
    10,
    array['frutal', 'cítrico', 'ámbar', 'almizclado', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    true,
    false,
    27,
    '2026-08-21'
  ),
  (
    'c0000000-0000-4000-8000-000000000028',
    'Amber Oud Gold Edition',
    'amber-oud-gold-edition-decant',
    'a0000000-0000-4000-8000-000000000019',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia lujosa, dulce y vibrante con un marcado carácter frutal. Amber Oud Gold Edition combina frutas exóticas y cítricos con una base cálida de vainilla, ámbar y almizcle, creando un aroma elegante, llamativo y de gran presencia. Su perfil unisex la hace versátil para cualquier ocasión.',
    'decant',
    'unisex',
    35,
    null,
    18,
    array['frutal', 'cítrico', 'ámbar', 'almizclado', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    false,
    false,
    28,
    '2026-08-21'
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
  ('c0000000-0000-4000-8000-000000000027', '120 ml', 120, 260, null, 10, 'ELOVA-AOUD-120', true, 1),
  ('c0000000-0000-4000-8000-000000000028', '3 ml', 3, 25, null, 22, 'ELOVA-AOUD-3', false, 1),
  ('c0000000-0000-4000-8000-000000000028', '5 ml', 5, 35, null, 18, 'ELOVA-AOUD-5', false, 2),
  ('c0000000-0000-4000-8000-000000000028', '10 ml', 10, 45, null, 11, 'ELOVA-AOUD-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000027', '/images/products/product-amber-oud-gold.png', 'Amber Oud Gold Edition', 0),
  ('c0000000-0000-4000-8000-000000000028', '/images/products/product-amber-oud-gold.png', 'Amber Oud Gold Edition decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000027',
  'c0000000-0000-4000-8000-000000000028'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000027', 'd0000000-0000-4000-8000-000000000002', 'top', 0),
  ('c0000000-0000-4000-8000-000000000027', 'd0000000-0000-4000-8000-000000000079', 'top', 1),
  ('c0000000-0000-4000-8000-000000000027', 'd0000000-0000-4000-8000-000000000080', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000027', 'd0000000-0000-4000-8000-000000000081', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000027', 'd0000000-0000-4000-8000-000000000006', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000027', 'd0000000-0000-4000-8000-000000000009', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000027', 'd0000000-0000-4000-8000-000000000010', 'base', 0),
  ('c0000000-0000-4000-8000-000000000027', 'd0000000-0000-4000-8000-000000000064', 'base', 1),
  ('c0000000-0000-4000-8000-000000000027', 'd0000000-0000-4000-8000-000000000009', 'base', 2),
  ('c0000000-0000-4000-8000-000000000028', 'd0000000-0000-4000-8000-000000000002', 'top', 0),
  ('c0000000-0000-4000-8000-000000000028', 'd0000000-0000-4000-8000-000000000079', 'top', 1),
  ('c0000000-0000-4000-8000-000000000028', 'd0000000-0000-4000-8000-000000000080', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000028', 'd0000000-0000-4000-8000-000000000081', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000028', 'd0000000-0000-4000-8000-000000000006', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000028', 'd0000000-0000-4000-8000-000000000009', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000028', 'd0000000-0000-4000-8000-000000000010', 'base', 0),
  ('c0000000-0000-4000-8000-000000000028', 'd0000000-0000-4000-8000-000000000064', 'base', 1),
  ('c0000000-0000-4000-8000-000000000028', 'd0000000-0000-4000-8000-000000000009', 'base', 2)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000027', 4),
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000028', 5),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000027', 14),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000028', 15),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000027', 10),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000028', 11)
on conflict do nothing;
