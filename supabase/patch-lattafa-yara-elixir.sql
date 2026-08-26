-- Adds Lattafa Yara Elixir (perfume + decant).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000120', 'Fresa', 'fresa')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000065',
    'Yara Elixir',
    'yara-elixir',
    'a0000000-0000-4000-8000-000000000011',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia femenina dulce, cremosa y seductora, con un perfil gourmand y floral. Yara Elixir combina frutas jugosas y flores suaves con acordes cálidos y dulces, creando un aroma envolvente, femenino y moderno, ideal para citas, salidas y ocasiones especiales.',
    'perfume',
    'feminine',
    168,
    null,
    10,
    array['floral', 'gourmand', 'ámbar', 'frutal', 'almizclado']::text[],
    array['diario', 'cita', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    4,
    true,
    false,
    65,
    '2026-08-26'
  ),
  (
    'c0000000-0000-4000-8000-000000000066',
    'Yara Elixir',
    'yara-elixir-decant',
    'a0000000-0000-4000-8000-000000000011',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia femenina dulce, cremosa y seductora, con un perfil gourmand y floral. Yara Elixir combina frutas jugosas y flores suaves con acordes cálidos y dulces, creando un aroma envolvente, femenino y moderno, ideal para citas, salidas y ocasiones especiales.',
    'decant',
    'feminine',
    19,
    null,
    18,
    array['floral', 'gourmand', 'ámbar', 'frutal', 'almizclado']::text[],
    array['diario', 'cita', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    4,
    false,
    false,
    66,
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
  ('c0000000-0000-4000-8000-000000000065', '100 ml', 100, 168, null, 10, 'ELOVA-YARA-ELIXIR-100', true, 1),
  ('c0000000-0000-4000-8000-000000000066', '3 ml', 3, 16, null, 22, 'ELOVA-YARA-ELIXIR-3', false, 1),
  ('c0000000-0000-4000-8000-000000000066', '5 ml', 5, 19, null, 18, 'ELOVA-YARA-ELIXIR-5', false, 2),
  ('c0000000-0000-4000-8000-000000000066', '10 ml', 10, 25, null, 11, 'ELOVA-YARA-ELIXIR-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000065', '/images/products/product-yara-elixir.png', 'Yara Elixir', 0),
  ('c0000000-0000-4000-8000-000000000066', '/images/products/product-yara-elixir.png', 'Yara Elixir decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000065',
  'c0000000-0000-4000-8000-000000000066'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000065', 'd0000000-0000-4000-8000-000000000120', 'top', 0),
  ('c0000000-0000-4000-8000-000000000065', 'd0000000-0000-4000-8000-000000000048', 'top', 1),
  ('c0000000-0000-4000-8000-000000000065', 'd0000000-0000-4000-8000-000000000106', 'top', 2),
  ('c0000000-0000-4000-8000-000000000065', 'd0000000-0000-4000-8000-000000000083', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000065', 'd0000000-0000-4000-8000-000000000065', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000065', 'd0000000-0000-4000-8000-000000000098', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000065', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000065', 'd0000000-0000-4000-8000-000000000005', 'base', 1),
  ('c0000000-0000-4000-8000-000000000065', 'd0000000-0000-4000-8000-000000000010', 'base', 2),
  ('c0000000-0000-4000-8000-000000000065', 'd0000000-0000-4000-8000-000000000006', 'base', 3),
  ('c0000000-0000-4000-8000-000000000066', 'd0000000-0000-4000-8000-000000000120', 'top', 0),
  ('c0000000-0000-4000-8000-000000000066', 'd0000000-0000-4000-8000-000000000048', 'top', 1),
  ('c0000000-0000-4000-8000-000000000066', 'd0000000-0000-4000-8000-000000000106', 'top', 2),
  ('c0000000-0000-4000-8000-000000000066', 'd0000000-0000-4000-8000-000000000083', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000066', 'd0000000-0000-4000-8000-000000000065', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000066', 'd0000000-0000-4000-8000-000000000098', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000066', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000066', 'd0000000-0000-4000-8000-000000000005', 'base', 1),
  ('c0000000-0000-4000-8000-000000000066', 'd0000000-0000-4000-8000-000000000010', 'base', 2),
  ('c0000000-0000-4000-8000-000000000066', 'd0000000-0000-4000-8000-000000000006', 'base', 3)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000065', 52),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000066', 53),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000065', 46),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000066', 47),
  ('aa000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000065', 14),
  ('aa000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000066', 15)
on conflict do nothing;
