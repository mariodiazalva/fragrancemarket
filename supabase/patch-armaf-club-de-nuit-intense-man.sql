-- Adds Armaf Club de Nuit Intense Man (perfume + decant).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000127', 'Abedul', 'abedul')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000075',
    'Club de Nuit Intense Man',
    'club-de-nuit-intense-man',
    'a0000000-0000-4000-8000-000000000012',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia masculina potente, fresca y sofisticada, reconocida por su carácter cítrico, frutal y ahumado. Club de Nuit Intense Man combina una salida vibrante con un corazón floral y un fondo profundo de maderas, creando un aroma elegante, versátil y de gran presencia.',
    'perfume',
    'masculine',
    155,
    null,
    10,
    array['cítrico', 'frutal', 'amaderado', 'ahumado', 'aromático']::text[],
    array['diario', 'cita', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    4,
    true,
    false,
    75,
    '2026-08-28'
  ),
  (
    'c0000000-0000-4000-8000-000000000076',
    'Club de Nuit Intense Man',
    'club-de-nuit-intense-man-decant',
    'a0000000-0000-4000-8000-000000000012',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia masculina potente, fresca y sofisticada, reconocida por su carácter cítrico, frutal y ahumado. Club de Nuit Intense Man combina una salida vibrante con un corazón floral y un fondo profundo de maderas, creando un aroma elegante, versátil y de gran presencia.',
    'decant',
    'masculine',
    18,
    null,
    18,
    array['cítrico', 'frutal', 'amaderado', 'ahumado', 'aromático']::text[],
    array['diario', 'cita', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    4,
    false,
    false,
    76,
    '2026-08-28'
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
  ('c0000000-0000-4000-8000-000000000075', '105 ml', 105, 155, null, 10, 'ELOVA-CDNIM-105', true, 1),
  ('c0000000-0000-4000-8000-000000000076', '3 ml', 3, 15, null, 22, 'ELOVA-CDNIM-3', false, 1),
  ('c0000000-0000-4000-8000-000000000076', '5 ml', 5, 18, null, 18, 'ELOVA-CDNIM-5', false, 2),
  ('c0000000-0000-4000-8000-000000000076', '10 ml', 10, 23, null, 11, 'ELOVA-CDNIM-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000075', '/images/products/product-club-de-nuit-intense-man.png', 'Club de Nuit Intense Man', 0),
  ('c0000000-0000-4000-8000-000000000076', '/images/products/product-club-de-nuit-intense-man.png', 'Club de Nuit Intense Man decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000075',
  'c0000000-0000-4000-8000-000000000076'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000075', 'd0000000-0000-4000-8000-000000000019', 'top', 0),
  ('c0000000-0000-4000-8000-000000000075', 'd0000000-0000-4000-8000-000000000081', 'top', 1),
  ('c0000000-0000-4000-8000-000000000075', 'd0000000-0000-4000-8000-000000000002', 'top', 2),
  ('c0000000-0000-4000-8000-000000000075', 'd0000000-0000-4000-8000-000000000106', 'top', 3),
  ('c0000000-0000-4000-8000-000000000075', 'd0000000-0000-4000-8000-000000000107', 'top', 4),
  ('c0000000-0000-4000-8000-000000000075', 'd0000000-0000-4000-8000-000000000127', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000075', 'd0000000-0000-4000-8000-000000000083', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000075', 'd0000000-0000-4000-8000-000000000032', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000075', 'd0000000-0000-4000-8000-000000000010', 'base', 0),
  ('c0000000-0000-4000-8000-000000000075', 'd0000000-0000-4000-8000-000000000014', 'base', 1),
  ('c0000000-0000-4000-8000-000000000075', 'd0000000-0000-4000-8000-000000000052', 'base', 2),
  ('c0000000-0000-4000-8000-000000000075', 'd0000000-0000-4000-8000-000000000009', 'base', 3),
  ('c0000000-0000-4000-8000-000000000076', 'd0000000-0000-4000-8000-000000000019', 'top', 0),
  ('c0000000-0000-4000-8000-000000000076', 'd0000000-0000-4000-8000-000000000081', 'top', 1),
  ('c0000000-0000-4000-8000-000000000076', 'd0000000-0000-4000-8000-000000000002', 'top', 2),
  ('c0000000-0000-4000-8000-000000000076', 'd0000000-0000-4000-8000-000000000106', 'top', 3),
  ('c0000000-0000-4000-8000-000000000076', 'd0000000-0000-4000-8000-000000000107', 'top', 4),
  ('c0000000-0000-4000-8000-000000000076', 'd0000000-0000-4000-8000-000000000127', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000076', 'd0000000-0000-4000-8000-000000000083', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000076', 'd0000000-0000-4000-8000-000000000032', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000076', 'd0000000-0000-4000-8000-000000000010', 'base', 0),
  ('c0000000-0000-4000-8000-000000000076', 'd0000000-0000-4000-8000-000000000014', 'base', 1),
  ('c0000000-0000-4000-8000-000000000076', 'd0000000-0000-4000-8000-000000000052', 'base', 2),
  ('c0000000-0000-4000-8000-000000000076', 'd0000000-0000-4000-8000-000000000009', 'base', 3)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000075', 24),
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000076', 25),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000075', 62),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000076', 63),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000075', 54),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000076', 55)
on conflict do nothing;
