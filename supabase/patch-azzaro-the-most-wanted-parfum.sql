-- Adds Azzaro The Most Wanted Parfum (perfume + decant).
-- Safe to re-run.

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000022', 'Azzaro', 'azzaro')
on conflict (slug) do nothing;

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000116', 'Acorde amaderado', 'acorde-amaderado'),
  ('d0000000-0000-4000-8000-000000000117', 'Bourbon vainilla', 'bourbon-vainilla'),
  ('d0000000-0000-4000-8000-000000000118', 'Acordes balsámicos', 'acordes-balsamicos')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000061',
    'The Most Wanted Parfum',
    'the-most-wanted-parfum',
    'a0000000-0000-4000-8000-000000000022',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina intensa, cálida y seductora, con un carácter dulce y sofisticado. The Most Wanted Parfum combina un acorde especiado con una dulce vainilla y un fondo amaderado, creando un aroma elegante, envolvente y de gran presencia. Perfecta para noches, citas y ocasiones especiales.',
    'perfume',
    'masculine',
    415,
    null,
    10,
    array['ámbar', 'gourmand', 'especiado', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    true,
    false,
    61,
    '2026-08-26'
  ),
  (
    'c0000000-0000-4000-8000-000000000062',
    'The Most Wanted Parfum',
    'the-most-wanted-parfum-decant',
    'a0000000-0000-4000-8000-000000000022',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina intensa, cálida y seductora, con un carácter dulce y sofisticado. The Most Wanted Parfum combina un acorde especiado con una dulce vainilla y un fondo amaderado, creando un aroma elegante, envolvente y de gran presencia. Perfecta para noches, citas y ocasiones especiales.',
    'decant',
    'masculine',
    32,
    null,
    18,
    array['ámbar', 'gourmand', 'especiado', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    false,
    false,
    62,
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
  ('c0000000-0000-4000-8000-000000000061', '100 ml', 100, 415, null, 10, 'ELOVA-TMW-100', true, 1),
  ('c0000000-0000-4000-8000-000000000062', '3 ml', 3, 22, null, 22, 'ELOVA-TMW-3', false, 1),
  ('c0000000-0000-4000-8000-000000000062', '5 ml', 5, 32, null, 18, 'ELOVA-TMW-5', false, 2),
  ('c0000000-0000-4000-8000-000000000062', '10 ml', 10, 52, null, 11, 'ELOVA-TMW-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000061', '/images/products/product-the-most-wanted-parfum.png', 'The Most Wanted Parfum', 0),
  ('c0000000-0000-4000-8000-000000000062', '/images/products/product-the-most-wanted-parfum.png', 'The Most Wanted Parfum decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000061',
  'c0000000-0000-4000-8000-000000000062'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000061', 'd0000000-0000-4000-8000-000000000043', 'top', 0),
  ('c0000000-0000-4000-8000-000000000061', 'd0000000-0000-4000-8000-000000000090', 'top', 1),
  ('c0000000-0000-4000-8000-000000000061', 'd0000000-0000-4000-8000-000000000116', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000061', 'd0000000-0000-4000-8000-000000000117', 'base', 0),
  ('c0000000-0000-4000-8000-000000000061', 'd0000000-0000-4000-8000-000000000118', 'base', 1),
  ('c0000000-0000-4000-8000-000000000062', 'd0000000-0000-4000-8000-000000000043', 'top', 0),
  ('c0000000-0000-4000-8000-000000000062', 'd0000000-0000-4000-8000-000000000090', 'top', 1),
  ('c0000000-0000-4000-8000-000000000062', 'd0000000-0000-4000-8000-000000000116', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000062', 'd0000000-0000-4000-8000-000000000117', 'base', 0),
  ('c0000000-0000-4000-8000-000000000062', 'd0000000-0000-4000-8000-000000000118', 'base', 1)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000061', 48),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000062', 49),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000061', 44),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000062', 45)
on conflict do nothing;
