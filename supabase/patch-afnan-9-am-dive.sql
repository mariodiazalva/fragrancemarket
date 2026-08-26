-- Adds Afnan 9 AM Dive (perfume + decant).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000106', 'Grosella negra', 'grosella-negra'),
  ('d0000000-0000-4000-8000-000000000107', 'Manzana', 'manzana')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000045',
    '9 AM Dive',
    '9-am-dive',
    'a0000000-0000-4000-8000-000000000014',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia fresca, cítrica y moderna, ideal para quienes buscan un aroma limpio, energético y versátil. 9 AM Dive combina frutas refrescantes y notas acuáticas con un corazón aromático y un fondo amaderado, convirtiéndola en una excelente opción para el día a día y los días cálidos.',
    'perfume',
    'masculine',
    150,
    null,
    10,
    array['cítrico', 'aromático', 'fresco', 'frutal', 'amaderado']::text[],
    array['diario', 'cita', 'fiesta', 'formal']::text[],
    4.6,
    4,
    true,
    false,
    45,
    '2026-08-26'
  ),
  (
    'c0000000-0000-4000-8000-000000000046',
    '9 AM Dive',
    '9-am-dive-decant',
    'a0000000-0000-4000-8000-000000000014',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia fresca, cítrica y moderna, ideal para quienes buscan un aroma limpio, energético y versátil. 9 AM Dive combina frutas refrescantes y notas acuáticas con un corazón aromático y un fondo amaderado, convirtiéndola en una excelente opción para el día a día y los días cálidos.',
    'decant',
    'masculine',
    18,
    null,
    18,
    array['cítrico', 'aromático', 'fresco', 'frutal', 'amaderado']::text[],
    array['diario', 'cita', 'fiesta', 'formal']::text[],
    4.6,
    4,
    false,
    false,
    46,
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
  ('c0000000-0000-4000-8000-000000000045', '100 ml', 100, 150, null, 10, 'ELOVA-9AM-DIVE-100', true, 1),
  ('c0000000-0000-4000-8000-000000000046', '3 ml', 3, 15, null, 22, 'ELOVA-9AM-DIVE-3', false, 1),
  ('c0000000-0000-4000-8000-000000000046', '5 ml', 5, 18, null, 18, 'ELOVA-9AM-DIVE-5', false, 2),
  ('c0000000-0000-4000-8000-000000000046', '10 ml', 10, 23, null, 11, 'ELOVA-9AM-DIVE-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000045', '/images/products/product-9-am-dive.png', '9 AM Dive', 0),
  ('c0000000-0000-4000-8000-000000000046', '/images/products/product-9-am-dive.png', '9 AM Dive decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000045',
  'c0000000-0000-4000-8000-000000000046'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000045', 'd0000000-0000-4000-8000-000000000019', 'top', 0),
  ('c0000000-0000-4000-8000-000000000045', 'd0000000-0000-4000-8000-000000000051', 'top', 1),
  ('c0000000-0000-4000-8000-000000000045', 'd0000000-0000-4000-8000-000000000106', 'top', 2),
  ('c0000000-0000-4000-8000-000000000045', 'd0000000-0000-4000-8000-000000000015', 'top', 3),
  ('c0000000-0000-4000-8000-000000000045', 'd0000000-0000-4000-8000-000000000107', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000045', 'd0000000-0000-4000-8000-000000000023', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000045', 'd0000000-0000-4000-8000-000000000003', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000045', 'd0000000-0000-4000-8000-000000000043', 'base', 0),
  ('c0000000-0000-4000-8000-000000000045', 'd0000000-0000-4000-8000-000000000005', 'base', 1),
  ('c0000000-0000-4000-8000-000000000045', 'd0000000-0000-4000-8000-000000000052', 'base', 2),
  ('c0000000-0000-4000-8000-000000000045', 'd0000000-0000-4000-8000-000000000083', 'base', 3),
  ('c0000000-0000-4000-8000-000000000046', 'd0000000-0000-4000-8000-000000000019', 'top', 0),
  ('c0000000-0000-4000-8000-000000000046', 'd0000000-0000-4000-8000-000000000051', 'top', 1),
  ('c0000000-0000-4000-8000-000000000046', 'd0000000-0000-4000-8000-000000000106', 'top', 2),
  ('c0000000-0000-4000-8000-000000000046', 'd0000000-0000-4000-8000-000000000015', 'top', 3),
  ('c0000000-0000-4000-8000-000000000046', 'd0000000-0000-4000-8000-000000000107', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000046', 'd0000000-0000-4000-8000-000000000023', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000046', 'd0000000-0000-4000-8000-000000000003', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000046', 'd0000000-0000-4000-8000-000000000043', 'base', 0),
  ('c0000000-0000-4000-8000-000000000046', 'd0000000-0000-4000-8000-000000000005', 'base', 1),
  ('c0000000-0000-4000-8000-000000000046', 'd0000000-0000-4000-8000-000000000052', 'base', 2),
  ('c0000000-0000-4000-8000-000000000046', 'd0000000-0000-4000-8000-000000000083', 'base', 3)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000045', 10),
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000046', 11),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000045', 32),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000046', 33),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000045', 28),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000046', 29)
on conflict do nothing;
