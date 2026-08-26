-- Adds Yves Saint Laurent Y Eau de Parfum (perfume + decant).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000115', 'Olibano', 'olibano')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000059',
    'Y Eau de Parfum',
    'y-eau-de-parfum',
    'a0000000-0000-4000-8000-000000000021',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina fresca, aromática y sofisticada que combina cítricos y notas verdes con un corazón aromático y un fondo cálido y amaderado. Y Eau de Parfum ofrece un equilibrio entre frescura y profundidad, convirtiéndola en una opción versátil para el día a día, citas y ocasiones especiales.',
    'perfume',
    'masculine',
    570,
    null,
    10,
    array['aromático', 'fresco', 'amaderado', 'especiado', 'ámbar']::text[],
    array['diario', 'cita', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    4,
    true,
    false,
    59,
    '2026-08-26'
  ),
  (
    'c0000000-0000-4000-8000-000000000060',
    'Y Eau de Parfum',
    'y-eau-de-parfum-decant',
    'a0000000-0000-4000-8000-000000000021',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina fresca, aromática y sofisticada que combina cítricos y notas verdes con un corazón aromático y un fondo cálido y amaderado. Y Eau de Parfum ofrece un equilibrio entre frescura y profundidad, convirtiéndola en una opción versátil para el día a día, citas y ocasiones especiales.',
    'decant',
    'masculine',
    41,
    null,
    18,
    array['aromático', 'fresco', 'amaderado', 'especiado', 'ámbar']::text[],
    array['diario', 'cita', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    4,
    false,
    false,
    60,
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
  ('c0000000-0000-4000-8000-000000000059', '100 ml', 100, 570, null, 10, 'ELOVA-Y-EDP-100', true, 1),
  ('c0000000-0000-4000-8000-000000000060', '3 ml', 3, 26, null, 22, 'ELOVA-Y-EDP-3', false, 1),
  ('c0000000-0000-4000-8000-000000000060', '5 ml', 5, 41, null, 18, 'ELOVA-Y-EDP-5', false, 2),
  ('c0000000-0000-4000-8000-000000000060', '10 ml', 10, 70, null, 11, 'ELOVA-Y-EDP-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000059', '/images/products/product-y-eau-de-parfum.png', 'Y Eau de Parfum', 0),
  ('c0000000-0000-4000-8000-000000000060', '/images/products/product-y-eau-de-parfum.png', 'Y Eau de Parfum decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000059',
  'c0000000-0000-4000-8000-000000000060'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000059', 'd0000000-0000-4000-8000-000000000107', 'top', 0),
  ('c0000000-0000-4000-8000-000000000059', 'd0000000-0000-4000-8000-000000000043', 'top', 1),
  ('c0000000-0000-4000-8000-000000000059', 'd0000000-0000-4000-8000-000000000002', 'top', 2),
  ('c0000000-0000-4000-8000-000000000059', 'd0000000-0000-4000-8000-000000000040', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000059', 'd0000000-0000-4000-8000-000000000037', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000059', 'd0000000-0000-4000-8000-000000000050', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000059', 'd0000000-0000-4000-8000-000000000006', 'base', 0),
  ('c0000000-0000-4000-8000-000000000059', 'd0000000-0000-4000-8000-000000000023', 'base', 1),
  ('c0000000-0000-4000-8000-000000000059', 'd0000000-0000-4000-8000-000000000028', 'base', 2),
  ('c0000000-0000-4000-8000-000000000059', 'd0000000-0000-4000-8000-000000000041', 'base', 3),
  ('c0000000-0000-4000-8000-000000000059', 'd0000000-0000-4000-8000-000000000115', 'base', 4),
  ('c0000000-0000-4000-8000-000000000060', 'd0000000-0000-4000-8000-000000000107', 'top', 0),
  ('c0000000-0000-4000-8000-000000000060', 'd0000000-0000-4000-8000-000000000043', 'top', 1),
  ('c0000000-0000-4000-8000-000000000060', 'd0000000-0000-4000-8000-000000000002', 'top', 2),
  ('c0000000-0000-4000-8000-000000000060', 'd0000000-0000-4000-8000-000000000040', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000060', 'd0000000-0000-4000-8000-000000000037', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000060', 'd0000000-0000-4000-8000-000000000050', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000060', 'd0000000-0000-4000-8000-000000000006', 'base', 0),
  ('c0000000-0000-4000-8000-000000000060', 'd0000000-0000-4000-8000-000000000023', 'base', 1),
  ('c0000000-0000-4000-8000-000000000060', 'd0000000-0000-4000-8000-000000000028', 'base', 2),
  ('c0000000-0000-4000-8000-000000000060', 'd0000000-0000-4000-8000-000000000041', 'base', 3),
  ('c0000000-0000-4000-8000-000000000060', 'd0000000-0000-4000-8000-000000000115', 'base', 4)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000059', 16),
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000060', 17),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000059', 46),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000060', 47),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000059', 42),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000060', 43)
on conflict do nothing;
