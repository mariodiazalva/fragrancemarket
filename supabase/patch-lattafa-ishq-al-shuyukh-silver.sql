-- Adds Lattafa Ishq Al Shuyukh Silver (perfume + decant).
-- Safe to re-run.

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000051',
    'Ishq Al Shuyukh Silver',
    'ishq-al-shuyukh-silver',
    'a0000000-0000-4000-8000-000000000011',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia masculina dulce, cálida y envolvente, con un perfil gourmand y moderno. Ishq Al Shuyukh Silver combina frutas frescas con acordes dulces y una base amaderada, creando un aroma elegante, juvenil y seductor, ideal para citas, salidas y ocasiones especiales.',
    'perfume',
    'masculine',
    145,
    null,
    10,
    array['gourmand', 'ámbar', 'amaderado', 'frutal', 'aromático']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.6,
    4,
    true,
    false,
    51,
    '2026-08-26'
  ),
  (
    'c0000000-0000-4000-8000-000000000052',
    'Ishq Al Shuyukh Silver',
    'ishq-al-shuyukh-silver-decant',
    'a0000000-0000-4000-8000-000000000011',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia masculina dulce, cálida y envolvente, con un perfil gourmand y moderno. Ishq Al Shuyukh Silver combina frutas frescas con acordes dulces y una base amaderada, creando un aroma elegante, juvenil y seductor, ideal para citas, salidas y ocasiones especiales.',
    'decant',
    'masculine',
    18,
    null,
    18,
    array['gourmand', 'ámbar', 'amaderado', 'frutal', 'aromático']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.6,
    4,
    false,
    false,
    52,
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
  ('c0000000-0000-4000-8000-000000000051', '100 ml', 100, 145, null, 10, 'ELOVA-ISHQ-SILVER-100', true, 1),
  ('c0000000-0000-4000-8000-000000000052', '3 ml', 3, 15, null, 22, 'ELOVA-ISHQ-SILVER-3', false, 1),
  ('c0000000-0000-4000-8000-000000000052', '5 ml', 5, 18, null, 18, 'ELOVA-ISHQ-SILVER-5', false, 2),
  ('c0000000-0000-4000-8000-000000000052', '10 ml', 10, 23, null, 11, 'ELOVA-ISHQ-SILVER-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000051', '/images/products/product-ishq-al-shuyukh-silver.png', 'Ishq Al Shuyukh Silver', 0),
  ('c0000000-0000-4000-8000-000000000052', '/images/products/product-ishq-al-shuyukh-silver.png', 'Ishq Al Shuyukh Silver decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000051',
  'c0000000-0000-4000-8000-000000000052'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000051', 'd0000000-0000-4000-8000-000000000002', 'top', 0),
  ('c0000000-0000-4000-8000-000000000051', 'd0000000-0000-4000-8000-000000000019', 'top', 1),
  ('c0000000-0000-4000-8000-000000000051', 'd0000000-0000-4000-8000-000000000081', 'top', 2),
  ('c0000000-0000-4000-8000-000000000051', 'd0000000-0000-4000-8000-000000000107', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000051', 'd0000000-0000-4000-8000-000000000039', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000051', 'd0000000-0000-4000-8000-000000000001', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000051', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000051', 'd0000000-0000-4000-8000-000000000023', 'base', 1),
  ('c0000000-0000-4000-8000-000000000051', 'd0000000-0000-4000-8000-000000000006', 'base', 2),
  ('c0000000-0000-4000-8000-000000000051', 'd0000000-0000-4000-8000-000000000010', 'base', 3),
  ('c0000000-0000-4000-8000-000000000052', 'd0000000-0000-4000-8000-000000000002', 'top', 0),
  ('c0000000-0000-4000-8000-000000000052', 'd0000000-0000-4000-8000-000000000019', 'top', 1),
  ('c0000000-0000-4000-8000-000000000052', 'd0000000-0000-4000-8000-000000000081', 'top', 2),
  ('c0000000-0000-4000-8000-000000000052', 'd0000000-0000-4000-8000-000000000107', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000052', 'd0000000-0000-4000-8000-000000000039', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000052', 'd0000000-0000-4000-8000-000000000001', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000052', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000052', 'd0000000-0000-4000-8000-000000000023', 'base', 1),
  ('c0000000-0000-4000-8000-000000000052', 'd0000000-0000-4000-8000-000000000006', 'base', 2),
  ('c0000000-0000-4000-8000-000000000052', 'd0000000-0000-4000-8000-000000000010', 'base', 3)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000051', 38),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000052', 39),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000051', 34),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000052', 35)
on conflict do nothing;
