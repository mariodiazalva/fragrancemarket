-- Adds Versace Eros Eau de Parfum (perfume + decant). Distinct from Eros Flame.
-- Safe to re-run.

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000023', 'Versace', 'versace')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000073',
    'Eros Eau de Parfum',
    'eros-eau-de-parfum',
    'a0000000-0000-4000-8000-000000000023',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina intensa, fresca y seductora que combina cítricos vibrantes con notas aromáticas y un fondo cálido y amaderado. Eros Eau de Parfum mantiene el carácter icónico de la línea Eros, pero con una presencia más profunda y envolvente, perfecta para citas, fiestas y ocasiones especiales.',
    'perfume',
    'masculine',
    365,
    null,
    10,
    array['aromático', 'ámbar', 'cítrico', 'amaderado', 'gourmand']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    true,
    false,
    73,
    '2026-08-28'
  ),
  (
    'c0000000-0000-4000-8000-000000000074',
    'Eros Eau de Parfum',
    'eros-eau-de-parfum-decant',
    'a0000000-0000-4000-8000-000000000023',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina intensa, fresca y seductora que combina cítricos vibrantes con notas aromáticas y un fondo cálido y amaderado. Eros Eau de Parfum mantiene el carácter icónico de la línea Eros, pero con una presencia más profunda y envolvente, perfecta para citas, fiestas y ocasiones especiales.',
    'decant',
    'masculine',
    30,
    null,
    18,
    array['aromático', 'ámbar', 'cítrico', 'amaderado', 'gourmand']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    false,
    false,
    74,
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
  ('c0000000-0000-4000-8000-000000000073', '100 ml', 100, 365, null, 10, 'ELOVA-EROS-EDP-100', true, 1),
  ('c0000000-0000-4000-8000-000000000074', '3 ml', 3, 20, null, 22, 'ELOVA-EROS-EDP-3', false, 1),
  ('c0000000-0000-4000-8000-000000000074', '5 ml', 5, 30, null, 18, 'ELOVA-EROS-EDP-5', false, 2),
  ('c0000000-0000-4000-8000-000000000074', '10 ml', 10, 45, null, 11, 'ELOVA-EROS-EDP-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000073', '/images/products/product-eros-eau-de-parfum.jpg', 'Eros Eau de Parfum', 0),
  ('c0000000-0000-4000-8000-000000000074', '/images/products/product-eros-eau-de-parfum.jpg', 'Eros Eau de Parfum decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000073',
  'c0000000-0000-4000-8000-000000000074'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000073', 'd0000000-0000-4000-8000-000000000019', 'top', 0),
  ('c0000000-0000-4000-8000-000000000073', 'd0000000-0000-4000-8000-000000000048', 'top', 1),
  ('c0000000-0000-4000-8000-000000000073', 'd0000000-0000-4000-8000-000000000107', 'top', 2),
  ('c0000000-0000-4000-8000-000000000073', 'd0000000-0000-4000-8000-000000000051', 'top', 3),
  ('c0000000-0000-4000-8000-000000000073', 'd0000000-0000-4000-8000-000000000050', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000073', 'd0000000-0000-4000-8000-000000000100', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000073', 'd0000000-0000-4000-8000-000000000040', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000073', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000073', 'd0000000-0000-4000-8000-000000000041', 'base', 1),
  ('c0000000-0000-4000-8000-000000000073', 'd0000000-0000-4000-8000-000000000005', 'base', 2),
  ('c0000000-0000-4000-8000-000000000073', 'd0000000-0000-4000-8000-000000000023', 'base', 3),
  ('c0000000-0000-4000-8000-000000000073', 'd0000000-0000-4000-8000-000000000052', 'base', 4),
  ('c0000000-0000-4000-8000-000000000073', 'd0000000-0000-4000-8000-000000000006', 'base', 5),
  ('c0000000-0000-4000-8000-000000000074', 'd0000000-0000-4000-8000-000000000019', 'top', 0),
  ('c0000000-0000-4000-8000-000000000074', 'd0000000-0000-4000-8000-000000000048', 'top', 1),
  ('c0000000-0000-4000-8000-000000000074', 'd0000000-0000-4000-8000-000000000107', 'top', 2),
  ('c0000000-0000-4000-8000-000000000074', 'd0000000-0000-4000-8000-000000000051', 'top', 3),
  ('c0000000-0000-4000-8000-000000000074', 'd0000000-0000-4000-8000-000000000050', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000074', 'd0000000-0000-4000-8000-000000000100', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000074', 'd0000000-0000-4000-8000-000000000040', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000074', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000074', 'd0000000-0000-4000-8000-000000000041', 'base', 1),
  ('c0000000-0000-4000-8000-000000000074', 'd0000000-0000-4000-8000-000000000005', 'base', 2),
  ('c0000000-0000-4000-8000-000000000074', 'd0000000-0000-4000-8000-000000000023', 'base', 3),
  ('c0000000-0000-4000-8000-000000000074', 'd0000000-0000-4000-8000-000000000052', 'base', 4),
  ('c0000000-0000-4000-8000-000000000074', 'd0000000-0000-4000-8000-000000000006', 'base', 5)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000073', 22),
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000074', 23),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000073', 60),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000074', 61),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000073', 52),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000074', 53)
on conflict do nothing;
