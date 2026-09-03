-- Adds Afnan 9 PM (perfume + decant). Distinct from 9 PM Night Out.
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000129', 'Muguet', 'muguet')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000079',
    '9 PM',
    '9-pm',
    'a0000000-0000-4000-8000-000000000014',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia masculina dulce, cálida y seductora, con un carácter juvenil y envolvente. Afnan 9 PM combina frutas frescas con canela, vainilla y haba tonka, creando un aroma adictivo y de gran presencia. Ideal para citas, fiestas y noches en las que quieres destacar.',
    'perfume',
    'masculine',
    165,
    null,
    10,
    array['ámbar', 'aromático', 'frutal', 'gourmand', 'especiado']::text[],
    array['cita', 'fiesta', 'noche', 'formal', 'diario']::text[],
    4.7,
    5,
    true,
    false,
    79,
    '2026-09-03'
  ),
  (
    'c0000000-0000-4000-8000-000000000080',
    '9 PM',
    '9-pm-decant',
    'a0000000-0000-4000-8000-000000000014',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia masculina dulce, cálida y seductora, con un carácter juvenil y envolvente. Afnan 9 PM combina frutas frescas con canela, vainilla y haba tonka, creando un aroma adictivo y de gran presencia. Ideal para citas, fiestas y noches en las que quieres destacar.',
    'decant',
    'masculine',
    23,
    null,
    18,
    array['ámbar', 'aromático', 'frutal', 'gourmand', 'especiado']::text[],
    array['cita', 'fiesta', 'noche', 'formal', 'diario']::text[],
    4.7,
    5,
    false,
    false,
    80,
    '2026-09-03'
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
  ('c0000000-0000-4000-8000-000000000079', '100 ml', 100, 165, null, 10, 'ELOVA-9-PM-100', true, 1),
  ('c0000000-0000-4000-8000-000000000080', '3 ml', 3, 15, null, 22, 'ELOVA-9-PM-3', false, 1),
  ('c0000000-0000-4000-8000-000000000080', '5 ml', 5, 23, null, 18, 'ELOVA-9-PM-5', false, 2),
  ('c0000000-0000-4000-8000-000000000080', '10 ml', 10, 30, null, 11, 'ELOVA-9-PM-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000079', '/images/products/product-9-pm.png', '9 PM', 0),
  ('c0000000-0000-4000-8000-000000000080', '/images/products/product-9-pm.png', '9 PM decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000079',
  'c0000000-0000-4000-8000-000000000080'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000079', 'd0000000-0000-4000-8000-000000000002', 'top', 0),
  ('c0000000-0000-4000-8000-000000000079', 'd0000000-0000-4000-8000-000000000049', 'top', 1),
  ('c0000000-0000-4000-8000-000000000079', 'd0000000-0000-4000-8000-000000000039', 'top', 2),
  ('c0000000-0000-4000-8000-000000000079', 'd0000000-0000-4000-8000-000000000107', 'top', 3),
  ('c0000000-0000-4000-8000-000000000079', 'd0000000-0000-4000-8000-000000000129', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000079', 'd0000000-0000-4000-8000-000000000065', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000079', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000079', 'd0000000-0000-4000-8000-000000000041', 'base', 1),
  ('c0000000-0000-4000-8000-000000000079', 'd0000000-0000-4000-8000-000000000006', 'base', 2),
  ('c0000000-0000-4000-8000-000000000079', 'd0000000-0000-4000-8000-000000000052', 'base', 3),
  ('c0000000-0000-4000-8000-000000000080', 'd0000000-0000-4000-8000-000000000002', 'top', 0),
  ('c0000000-0000-4000-8000-000000000080', 'd0000000-0000-4000-8000-000000000049', 'top', 1),
  ('c0000000-0000-4000-8000-000000000080', 'd0000000-0000-4000-8000-000000000039', 'top', 2),
  ('c0000000-0000-4000-8000-000000000080', 'd0000000-0000-4000-8000-000000000107', 'top', 3),
  ('c0000000-0000-4000-8000-000000000080', 'd0000000-0000-4000-8000-000000000129', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000080', 'd0000000-0000-4000-8000-000000000065', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000080', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000080', 'd0000000-0000-4000-8000-000000000041', 'base', 1),
  ('c0000000-0000-4000-8000-000000000080', 'd0000000-0000-4000-8000-000000000006', 'base', 2),
  ('c0000000-0000-4000-8000-000000000080', 'd0000000-0000-4000-8000-000000000052', 'base', 3)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000079', 66),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000080', 67),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000079', 58),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000080', 59),
  ('aa000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000079', 18),
  ('aa000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000080', 19)
on conflict do nothing;
