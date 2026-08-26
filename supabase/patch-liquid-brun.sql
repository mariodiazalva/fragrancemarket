-- Adds French Avenue Liquid Brun (perfume + decant).
-- Safe to re-run.

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000018', 'French Avenue', 'french-avenue')
on conflict (slug) do nothing;

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000077', 'Nuez moscada', 'nuez-moscada'),
  ('d0000000-0000-4000-8000-000000000078', 'Acordes amaderados', 'acordes-amaderados')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000025',
    'Liquid Brun',
    'liquid-brun',
    'a0000000-0000-4000-8000-000000000018',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia cálida, dulce y sofisticada, con un perfil gourmand y especiado que transmite elegancia y sensualidad. Liquid Brun destaca por su combinación de vainilla cremosa, canela y acordes amaderados, creando un aroma envolvente y adictivo, ideal para noches y climas frescos.',
    'perfume',
    'masculine',
    250,
    null,
    10,
    array['ámbar', 'gourmand', 'especiado', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    true,
    false,
    25,
    '2026-08-21'
  ),
  (
    'c0000000-0000-4000-8000-000000000026',
    'Liquid Brun',
    'liquid-brun-decant',
    'a0000000-0000-4000-8000-000000000018',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia cálida, dulce y sofisticada, con un perfil gourmand y especiado que transmite elegancia y sensualidad. Liquid Brun destaca por su combinación de vainilla cremosa, canela y acordes amaderados, creando un aroma envolvente y adictivo, ideal para noches y climas frescos.',
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
    26,
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
  ('c0000000-0000-4000-8000-000000000025', '100 ml', 100, 250, null, 10, 'ELOVA-BRUN-100', true, 1),
  ('c0000000-0000-4000-8000-000000000026', '3 ml', 3, 22, null, 22, 'ELOVA-BRUN-3', false, 1),
  ('c0000000-0000-4000-8000-000000000026', '5 ml', 5, 32, null, 18, 'ELOVA-BRUN-5', false, 2),
  ('c0000000-0000-4000-8000-000000000026', '10 ml', 10, 38, null, 11, 'ELOVA-BRUN-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000025', '/images/products/product-liquid-brun.png', 'Liquid Brun', 0),
  ('c0000000-0000-4000-8000-000000000026', '/images/products/product-liquid-brun.png', 'Liquid Brun decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000025',
  'c0000000-0000-4000-8000-000000000026'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000025', 'd0000000-0000-4000-8000-000000000039', 'top', 0),
  ('c0000000-0000-4000-8000-000000000025', 'd0000000-0000-4000-8000-000000000024', 'top', 1),
  ('c0000000-0000-4000-8000-000000000025', 'd0000000-0000-4000-8000-000000000077', 'top', 2),
  ('c0000000-0000-4000-8000-000000000025', 'd0000000-0000-4000-8000-000000000078', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000025', 'd0000000-0000-4000-8000-000000000044', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000025', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000025', 'd0000000-0000-4000-8000-000000000006', 'base', 1),
  ('c0000000-0000-4000-8000-000000000025', 'd0000000-0000-4000-8000-000000000010', 'base', 2),
  ('c0000000-0000-4000-8000-000000000026', 'd0000000-0000-4000-8000-000000000039', 'top', 0),
  ('c0000000-0000-4000-8000-000000000026', 'd0000000-0000-4000-8000-000000000024', 'top', 1),
  ('c0000000-0000-4000-8000-000000000026', 'd0000000-0000-4000-8000-000000000077', 'top', 2),
  ('c0000000-0000-4000-8000-000000000026', 'd0000000-0000-4000-8000-000000000078', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000026', 'd0000000-0000-4000-8000-000000000044', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000026', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000026', 'd0000000-0000-4000-8000-000000000006', 'base', 1),
  ('c0000000-0000-4000-8000-000000000026', 'd0000000-0000-4000-8000-000000000010', 'base', 2)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000025', 12),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000026', 13),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000025', 8),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000026', 9)
on conflict do nothing;
