-- Adds Lattafa Asad Bourbon (perfume + decant).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000109', 'Ciruela', 'ciruela'),
  ('d0000000-0000-4000-8000-000000000110', 'Bourbon', 'bourbon'),
  ('d0000000-0000-4000-8000-000000000111', 'Cacao', 'cacao')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000053',
    'Asad Bourbon',
    'asad-bourbon',
    'a0000000-0000-4000-8000-000000000011',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia cálida, dulce y sofisticada que combina un acorde de bourbon con vainilla cremosa y especias. Asad Bourbon tiene un carácter intenso, envolvente y masculino, perfecto para quienes buscan un aroma elegante y seductor, especialmente durante la noche y en climas frescos.',
    'perfume',
    'masculine',
    160,
    null,
    10,
    array['ámbar', 'gourmand', 'especiado', 'aromático']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    true,
    false,
    53,
    '2026-08-26'
  ),
  (
    'c0000000-0000-4000-8000-000000000054',
    'Asad Bourbon',
    'asad-bourbon-decant',
    'a0000000-0000-4000-8000-000000000011',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia cálida, dulce y sofisticada que combina un acorde de bourbon con vainilla cremosa y especias. Asad Bourbon tiene un carácter intenso, envolvente y masculino, perfecto para quienes buscan un aroma elegante y seductor, especialmente durante la noche y en climas frescos.',
    'decant',
    'masculine',
    18,
    null,
    18,
    array['ámbar', 'gourmand', 'especiado', 'aromático']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    false,
    false,
    54,
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
  ('c0000000-0000-4000-8000-000000000053', '100 ml', 100, 160, null, 10, 'ELOVA-ASAD-BOURBON-100', true, 1),
  ('c0000000-0000-4000-8000-000000000054', '3 ml', 3, 15, null, 22, 'ELOVA-ASAD-BOURBON-3', false, 1),
  ('c0000000-0000-4000-8000-000000000054', '5 ml', 5, 18, null, 18, 'ELOVA-ASAD-BOURBON-5', false, 2),
  ('c0000000-0000-4000-8000-000000000054', '10 ml', 10, 24, null, 11, 'ELOVA-ASAD-BOURBON-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000053', '/images/products/product-asad-bourbon.png', 'Asad Bourbon', 0),
  ('c0000000-0000-4000-8000-000000000054', '/images/products/product-asad-bourbon.png', 'Asad Bourbon decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000053',
  'c0000000-0000-4000-8000-000000000054'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000053', 'd0000000-0000-4000-8000-000000000015', 'top', 0),
  ('c0000000-0000-4000-8000-000000000053', 'd0000000-0000-4000-8000-000000000049', 'top', 1),
  ('c0000000-0000-4000-8000-000000000053', 'd0000000-0000-4000-8000-000000000109', 'top', 2),
  ('c0000000-0000-4000-8000-000000000053', 'd0000000-0000-4000-8000-000000000110', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000053', 'd0000000-0000-4000-8000-000000000111', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000053', 'd0000000-0000-4000-8000-000000000077', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000053', 'd0000000-0000-4000-8000-000000000089', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000053', 'd0000000-0000-4000-8000-000000000006', 'base', 0),
  ('c0000000-0000-4000-8000-000000000053', 'd0000000-0000-4000-8000-000000000009', 'base', 1),
  ('c0000000-0000-4000-8000-000000000053', 'd0000000-0000-4000-8000-000000000028', 'base', 2),
  ('c0000000-0000-4000-8000-000000000054', 'd0000000-0000-4000-8000-000000000015', 'top', 0),
  ('c0000000-0000-4000-8000-000000000054', 'd0000000-0000-4000-8000-000000000049', 'top', 1),
  ('c0000000-0000-4000-8000-000000000054', 'd0000000-0000-4000-8000-000000000109', 'top', 2),
  ('c0000000-0000-4000-8000-000000000054', 'd0000000-0000-4000-8000-000000000110', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000054', 'd0000000-0000-4000-8000-000000000111', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000054', 'd0000000-0000-4000-8000-000000000077', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000054', 'd0000000-0000-4000-8000-000000000089', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000054', 'd0000000-0000-4000-8000-000000000006', 'base', 0),
  ('c0000000-0000-4000-8000-000000000054', 'd0000000-0000-4000-8000-000000000009', 'base', 1),
  ('c0000000-0000-4000-8000-000000000054', 'd0000000-0000-4000-8000-000000000028', 'base', 2)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000053', 40),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000054', 41),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000053', 36),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000054', 37)
on conflict do nothing;
