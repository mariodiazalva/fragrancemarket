-- Adds Yves Saint Laurent MYSLF (perfume + decant).
-- Safe to re-run.

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000021', 'Yves Saint Laurent', 'yves-saint-laurent')
on conflict (slug) do nothing;

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000113', 'Absoluto de flor de azahar', 'absoluto-de-flor-de-azahar'),
  ('d0000000-0000-4000-8000-000000000114', 'Ambrofix', 'ambrofix')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000057',
    'MYSLF',
    'myslf',
    'a0000000-0000-4000-8000-000000000021',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina moderna, elegante y versátil que combina la frescura de los cítricos con un corazón floral y un fondo cálido y amaderado. MYSLF transmite una sensación limpia, sofisticada y contemporánea, ideal para quienes buscan un aroma refinado que funcione en prácticamente cualquier ocasión.',
    'perfume',
    'masculine',
    660,
    null,
    10,
    array['floral', 'amaderado', 'cítrico', 'aromático', 'fresco']::text[],
    array['diario', 'cita', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    4,
    true,
    false,
    57,
    '2026-08-26'
  ),
  (
    'c0000000-0000-4000-8000-000000000058',
    'MYSLF',
    'myslf-decant',
    'a0000000-0000-4000-8000-000000000021',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina moderna, elegante y versátil que combina la frescura de los cítricos con un corazón floral y un fondo cálido y amaderado. MYSLF transmite una sensación limpia, sofisticada y contemporánea, ideal para quienes buscan un aroma refinado que funcione en prácticamente cualquier ocasión.',
    'decant',
    'masculine',
    45,
    null,
    18,
    array['floral', 'amaderado', 'cítrico', 'aromático', 'fresco']::text[],
    array['diario', 'cita', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    4,
    false,
    false,
    58,
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
  ('c0000000-0000-4000-8000-000000000057', '100 ml', 100, 660, null, 10, 'ELOVA-MYSLF-100', true, 1),
  ('c0000000-0000-4000-8000-000000000058', '3 ml', 3, 28, null, 22, 'ELOVA-MYSLF-3', false, 1),
  ('c0000000-0000-4000-8000-000000000058', '5 ml', 5, 45, null, 18, 'ELOVA-MYSLF-5', false, 2),
  ('c0000000-0000-4000-8000-000000000058', '10 ml', 10, 79, null, 11, 'ELOVA-MYSLF-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000057', '/images/products/product-myslf.png', 'MYSLF', 0),
  ('c0000000-0000-4000-8000-000000000058', '/images/products/product-myslf.png', 'MYSLF decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000057',
  'c0000000-0000-4000-8000-000000000058'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000057', 'd0000000-0000-4000-8000-000000000068', 'top', 0),
  ('c0000000-0000-4000-8000-000000000057', 'd0000000-0000-4000-8000-000000000065', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000057', 'd0000000-0000-4000-8000-000000000113', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000057', 'd0000000-0000-4000-8000-000000000052', 'base', 0),
  ('c0000000-0000-4000-8000-000000000057', 'd0000000-0000-4000-8000-000000000114', 'base', 1),
  ('c0000000-0000-4000-8000-000000000057', 'd0000000-0000-4000-8000-000000000064', 'base', 2),
  ('c0000000-0000-4000-8000-000000000058', 'd0000000-0000-4000-8000-000000000068', 'top', 0),
  ('c0000000-0000-4000-8000-000000000058', 'd0000000-0000-4000-8000-000000000065', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000058', 'd0000000-0000-4000-8000-000000000113', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000058', 'd0000000-0000-4000-8000-000000000052', 'base', 0),
  ('c0000000-0000-4000-8000-000000000058', 'd0000000-0000-4000-8000-000000000114', 'base', 1),
  ('c0000000-0000-4000-8000-000000000058', 'd0000000-0000-4000-8000-000000000064', 'base', 2)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000057', 14),
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000058', 15),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000057', 44),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000058', 45),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000057', 40),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000058', 41),
  ('aa000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000057', 10),
  ('aa000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000058', 11)
on conflict do nothing;
