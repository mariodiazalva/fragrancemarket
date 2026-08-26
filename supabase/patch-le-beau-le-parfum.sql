-- Adds Jean Paul Gaultier Le Beau Le Parfum (perfume + decant).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000094', 'Coco', 'coco')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000037',
    'Le Beau Le Parfum',
    'le-beau-le-parfum',
    'a0000000-0000-4000-8000-000000000015',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina intensa, dulce y seductora, con un carácter tropical y envolvente. Le Beau Le Parfum combina coco, piña y haba tonka con un fondo cálido y amaderado, creando un aroma sensual, sofisticado y de gran presencia.',
    'perfume',
    'masculine',
    560,
    null,
    10,
    array['ámbar', 'amaderado', 'gourmand', 'oriental']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    true,
    false,
    37,
    '2026-08-25'
  ),
  (
    'c0000000-0000-4000-8000-000000000038',
    'Le Beau Le Parfum',
    'le-beau-le-parfum-decant',
    'a0000000-0000-4000-8000-000000000015',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina intensa, dulce y seductora, con un carácter tropical y envolvente. Le Beau Le Parfum combina coco, piña y haba tonka con un fondo cálido y amaderado, creando un aroma sensual, sofisticado y de gran presencia.',
    'decant',
    'masculine',
    35,
    null,
    18,
    array['ámbar', 'amaderado', 'gourmand', 'oriental']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    false,
    false,
    38,
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
  ('c0000000-0000-4000-8000-000000000037', '125 ml', 125, 560, null, 10, 'ELOVA-LEBEAU-125', true, 1),
  ('c0000000-0000-4000-8000-000000000038', '3 ml', 3, 24, null, 22, 'ELOVA-LEBEAU-3', false, 1),
  ('c0000000-0000-4000-8000-000000000038', '5 ml', 5, 35, null, 18, 'ELOVA-LEBEAU-5', false, 2),
  ('c0000000-0000-4000-8000-000000000038', '10 ml', 10, 58, null, 11, 'ELOVA-LEBEAU-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000037', '/images/products/product-le-beau-le-parfum.png', 'Le Beau Le Parfum', 0),
  ('c0000000-0000-4000-8000-000000000038', '/images/products/product-le-beau-le-parfum.png', 'Le Beau Le Parfum decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000037',
  'c0000000-0000-4000-8000-000000000038'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000037', 'd0000000-0000-4000-8000-000000000081', 'top', 0),
  ('c0000000-0000-4000-8000-000000000037', 'd0000000-0000-4000-8000-000000000094', 'top', 1),
  ('c0000000-0000-4000-8000-000000000037', 'd0000000-0000-4000-8000-000000000043', 'top', 2),
  ('c0000000-0000-4000-8000-000000000037', 'd0000000-0000-4000-8000-000000000094', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000037', 'd0000000-0000-4000-8000-000000000016', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000037', 'd0000000-0000-4000-8000-000000000041', 'base', 0),
  ('c0000000-0000-4000-8000-000000000037', 'd0000000-0000-4000-8000-000000000005', 'base', 1),
  ('c0000000-0000-4000-8000-000000000037', 'd0000000-0000-4000-8000-000000000006', 'base', 2),
  ('c0000000-0000-4000-8000-000000000038', 'd0000000-0000-4000-8000-000000000081', 'top', 0),
  ('c0000000-0000-4000-8000-000000000038', 'd0000000-0000-4000-8000-000000000094', 'top', 1),
  ('c0000000-0000-4000-8000-000000000038', 'd0000000-0000-4000-8000-000000000043', 'top', 2),
  ('c0000000-0000-4000-8000-000000000038', 'd0000000-0000-4000-8000-000000000094', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000038', 'd0000000-0000-4000-8000-000000000016', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000038', 'd0000000-0000-4000-8000-000000000041', 'base', 0),
  ('c0000000-0000-4000-8000-000000000038', 'd0000000-0000-4000-8000-000000000005', 'base', 1),
  ('c0000000-0000-4000-8000-000000000038', 'd0000000-0000-4000-8000-000000000006', 'base', 2)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000037', 24),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000038', 25),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000037', 20),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000038', 21)
on conflict do nothing;
