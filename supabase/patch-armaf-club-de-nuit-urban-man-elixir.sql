-- Adds Armaf Club de Nuit Urban Man Elixir (perfume + decant). Prices pending (0).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000128', 'Ládano', 'ladano')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000077',
    'Club de Nuit Urban Man Elixir',
    'club-de-nuit-urban-man-elixir',
    'a0000000-0000-4000-8000-000000000012',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia masculina intensa, elegante y moderna, con una combinación de frescura cítrica, especias aromáticas y un fondo cálido y amaderado. Club de Nuit Urban Man Elixir destaca por su gran presencia y versatilidad, siendo una excelente opción para citas, noches, eventos y ocasiones especiales.',
    'perfume',
    'masculine',
    173,
    null,
    10,
    array['aromático', 'amaderado', 'especiado', 'ámbar', 'cítrico']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    true,
    false,
    77,
    '2026-08-28'
  ),
  (
    'c0000000-0000-4000-8000-000000000078',
    'Club de Nuit Urban Man Elixir',
    'club-de-nuit-urban-man-elixir-decant',
    'a0000000-0000-4000-8000-000000000012',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia masculina intensa, elegante y moderna, con una combinación de frescura cítrica, especias aromáticas y un fondo cálido y amaderado. Club de Nuit Urban Man Elixir destaca por su gran presencia y versatilidad, siendo una excelente opción para citas, noches, eventos y ocasiones especiales.',
    'decant',
    'masculine',
    19,
    null,
    18,
    array['aromático', 'amaderado', 'especiado', 'ámbar', 'cítrico']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    false,
    false,
    78,
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
  ('c0000000-0000-4000-8000-000000000077', '105 ml', 105, 173, null, 10, 'ELOVA-CDNUME-105', true, 1),
  ('c0000000-0000-4000-8000-000000000078', '3 ml', 3, 15, null, 22, 'ELOVA-CDNUME-3', false, 1),
  ('c0000000-0000-4000-8000-000000000078', '5 ml', 5, 19, null, 18, 'ELOVA-CDNUME-5', false, 2),
  ('c0000000-0000-4000-8000-000000000078', '10 ml', 10, 25, null, 11, 'ELOVA-CDNUME-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000077', '/images/products/product-club-de-nuit-urban-man-elixir.png', 'Club de Nuit Urban Man Elixir', 0),
  ('c0000000-0000-4000-8000-000000000078', '/images/products/product-club-de-nuit-urban-man-elixir.png', 'Club de Nuit Urban Man Elixir decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000077',
  'c0000000-0000-4000-8000-000000000078'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000077', 'd0000000-0000-4000-8000-000000000002', 'top', 0),
  ('c0000000-0000-4000-8000-000000000077', 'd0000000-0000-4000-8000-000000000015', 'top', 1),
  ('c0000000-0000-4000-8000-000000000077', 'd0000000-0000-4000-8000-000000000024', 'top', 2),
  ('c0000000-0000-4000-8000-000000000077', 'd0000000-0000-4000-8000-000000000011', 'top', 3),
  ('c0000000-0000-4000-8000-000000000077', 'd0000000-0000-4000-8000-000000000049', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000077', 'd0000000-0000-4000-8000-000000000083', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000077', 'd0000000-0000-4000-8000-000000000028', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000077', 'd0000000-0000-4000-8000-000000000050', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000077', 'd0000000-0000-4000-8000-000000000100', 'base', 0),
  ('c0000000-0000-4000-8000-000000000077', 'd0000000-0000-4000-8000-000000000006', 'base', 1),
  ('c0000000-0000-4000-8000-000000000077', 'd0000000-0000-4000-8000-000000000052', 'base', 2),
  ('c0000000-0000-4000-8000-000000000077', 'd0000000-0000-4000-8000-000000000023', 'base', 3),
  ('c0000000-0000-4000-8000-000000000077', 'd0000000-0000-4000-8000-000000000128', 'base', 4),
  ('c0000000-0000-4000-8000-000000000078', 'd0000000-0000-4000-8000-000000000002', 'top', 0),
  ('c0000000-0000-4000-8000-000000000078', 'd0000000-0000-4000-8000-000000000015', 'top', 1),
  ('c0000000-0000-4000-8000-000000000078', 'd0000000-0000-4000-8000-000000000024', 'top', 2),
  ('c0000000-0000-4000-8000-000000000078', 'd0000000-0000-4000-8000-000000000011', 'top', 3),
  ('c0000000-0000-4000-8000-000000000078', 'd0000000-0000-4000-8000-000000000049', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000078', 'd0000000-0000-4000-8000-000000000083', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000078', 'd0000000-0000-4000-8000-000000000028', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000078', 'd0000000-0000-4000-8000-000000000050', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000078', 'd0000000-0000-4000-8000-000000000100', 'base', 0),
  ('c0000000-0000-4000-8000-000000000078', 'd0000000-0000-4000-8000-000000000006', 'base', 1),
  ('c0000000-0000-4000-8000-000000000078', 'd0000000-0000-4000-8000-000000000052', 'base', 2),
  ('c0000000-0000-4000-8000-000000000078', 'd0000000-0000-4000-8000-000000000023', 'base', 3),
  ('c0000000-0000-4000-8000-000000000078', 'd0000000-0000-4000-8000-000000000128', 'base', 4)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000077', 26),
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000078', 27),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000077', 64),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000078', 65),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000077', 56),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000078', 57)
on conflict do nothing;
