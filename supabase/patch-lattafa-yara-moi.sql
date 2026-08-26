-- Adds Lattafa Yara Moi (perfume + decant).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000119', 'Melocotón', 'melocoton')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000063',
    'Yara Moi',
    'yara-moi',
    'a0000000-0000-4000-8000-000000000011',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia femenina dulce, cremosa y elegante, con un carácter suave y envolvente. Yara Moi combina frutas, flores blancas y acordes gourmand sobre una base cálida de vainilla, almizcle y sándalo, creando un aroma femenino, sofisticado y fácil de llevar.',
    'perfume',
    'feminine',
    133,
    null,
    10,
    array['floral', 'ámbar', 'gourmand', 'almizclado']::text[],
    array['diario', 'cita', 'fiesta', 'formal', 'noche']::text[],
    4.6,
    4,
    true,
    false,
    63,
    '2026-08-26'
  ),
  (
    'c0000000-0000-4000-8000-000000000064',
    'Yara Moi',
    'yara-moi-decant',
    'a0000000-0000-4000-8000-000000000011',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia femenina dulce, cremosa y elegante, con un carácter suave y envolvente. Yara Moi combina frutas, flores blancas y acordes gourmand sobre una base cálida de vainilla, almizcle y sándalo, creando un aroma femenino, sofisticado y fácil de llevar.',
    'decant',
    'feminine',
    17,
    null,
    18,
    array['floral', 'ámbar', 'gourmand', 'almizclado']::text[],
    array['diario', 'cita', 'fiesta', 'formal', 'noche']::text[],
    4.6,
    4,
    false,
    false,
    64,
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
  ('c0000000-0000-4000-8000-000000000063', '100 ml', 100, 133, null, 10, 'ELOVA-YARA-MOI-100', true, 1),
  ('c0000000-0000-4000-8000-000000000064', '3 ml', 3, 15, null, 22, 'ELOVA-YARA-MOI-3', false, 1),
  ('c0000000-0000-4000-8000-000000000064', '5 ml', 5, 17, null, 18, 'ELOVA-YARA-MOI-5', false, 2),
  ('c0000000-0000-4000-8000-000000000064', '10 ml', 10, 22, null, 11, 'ELOVA-YARA-MOI-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000063', '/images/products/product-yara-moi.png', 'Yara Moi', 0),
  ('c0000000-0000-4000-8000-000000000064', '/images/products/product-yara-moi.png', 'Yara Moi decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000063',
  'c0000000-0000-4000-8000-000000000064'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000063', 'd0000000-0000-4000-8000-000000000119', 'top', 0),
  ('c0000000-0000-4000-8000-000000000063', 'd0000000-0000-4000-8000-000000000083', 'top', 1),
  ('c0000000-0000-4000-8000-000000000063', 'd0000000-0000-4000-8000-000000000098', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000063', 'd0000000-0000-4000-8000-000000000006', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000063', 'd0000000-0000-4000-8000-000000000005', 'base', 0),
  ('c0000000-0000-4000-8000-000000000063', 'd0000000-0000-4000-8000-000000000052', 'base', 1),
  ('c0000000-0000-4000-8000-000000000063', 'd0000000-0000-4000-8000-000000000009', 'base', 2),
  ('c0000000-0000-4000-8000-000000000063', 'd0000000-0000-4000-8000-000000000010', 'base', 3),
  ('c0000000-0000-4000-8000-000000000064', 'd0000000-0000-4000-8000-000000000119', 'top', 0),
  ('c0000000-0000-4000-8000-000000000064', 'd0000000-0000-4000-8000-000000000083', 'top', 1),
  ('c0000000-0000-4000-8000-000000000064', 'd0000000-0000-4000-8000-000000000098', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000064', 'd0000000-0000-4000-8000-000000000006', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000064', 'd0000000-0000-4000-8000-000000000005', 'base', 0),
  ('c0000000-0000-4000-8000-000000000064', 'd0000000-0000-4000-8000-000000000052', 'base', 1),
  ('c0000000-0000-4000-8000-000000000064', 'd0000000-0000-4000-8000-000000000009', 'base', 2),
  ('c0000000-0000-4000-8000-000000000064', 'd0000000-0000-4000-8000-000000000010', 'base', 3)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000063', 50),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000064', 51),
  ('aa000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000063', 12),
  ('aa000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000064', 13)
on conflict do nothing;
