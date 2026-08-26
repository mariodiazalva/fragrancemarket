-- Adds Carolina Herrera 212 VIP Black (perfume + decant).
-- Safe to re-run.

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000017', 'Carolina Herrera', 'carolina-herrera')
on conflict (slug) do nothing;

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000073', 'Absenta', 'absenta'),
  ('d0000000-0000-4000-8000-000000000074', 'Anís', 'anis'),
  ('d0000000-0000-4000-8000-000000000075', 'Hinojo', 'hinojo'),
  ('d0000000-0000-4000-8000-000000000076', 'Almizcle negro', 'almizcle-negro')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000023',
    '212 VIP Black',
    '212-vip-black',
    'a0000000-0000-4000-8000-000000000017',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina, intensa y seductora, con un carácter elegante y nocturno. 212 VIP Black combina la frescura de la absenta con notas aromáticas y un fondo cálido de almizcle y vainilla, creando un aroma moderno, sofisticado y perfecto para destacar.',
    'perfume',
    'masculine',
    400,
    null,
    10,
    array['aromático', 'ámbar', 'frutal', 'oriental']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    true,
    false,
    23,
    '2026-08-21'
  ),
  (
    'c0000000-0000-4000-8000-000000000024',
    '212 VIP Black',
    '212-vip-black-decant',
    'a0000000-0000-4000-8000-000000000017',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina, intensa y seductora, con un carácter elegante y nocturno. 212 VIP Black combina la frescura de la absenta con notas aromáticas y un fondo cálido de almizcle y vainilla, creando un aroma moderno, sofisticado y perfecto para destacar.',
    'decant',
    'masculine',
    50,
    null,
    18,
    array['aromático', 'ámbar', 'frutal', 'oriental']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    false,
    false,
    24,
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
  ('c0000000-0000-4000-8000-000000000023', '100 ml', 100, 400, null, 10, 'ELOVA-VIPB-100', true, 1),
  ('c0000000-0000-4000-8000-000000000024', '3 ml', 3, 35, null, 22, 'ELOVA-VIPB-3', false, 1),
  ('c0000000-0000-4000-8000-000000000024', '5 ml', 5, 50, null, 18, 'ELOVA-VIPB-5', false, 2),
  ('c0000000-0000-4000-8000-000000000024', '10 ml', 10, 70, null, 11, 'ELOVA-VIPB-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000023', '/images/products/product-212-vip-black.png', '212 VIP Black', 0),
  ('c0000000-0000-4000-8000-000000000024', '/images/products/product-212-vip-black.png', '212 VIP Black decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000023',
  'c0000000-0000-4000-8000-000000000024'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000023', 'd0000000-0000-4000-8000-000000000073', 'top', 0),
  ('c0000000-0000-4000-8000-000000000023', 'd0000000-0000-4000-8000-000000000074', 'top', 1),
  ('c0000000-0000-4000-8000-000000000023', 'd0000000-0000-4000-8000-000000000049', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000023', 'd0000000-0000-4000-8000-000000000075', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000023', 'd0000000-0000-4000-8000-000000000076', 'base', 0),
  ('c0000000-0000-4000-8000-000000000023', 'd0000000-0000-4000-8000-000000000009', 'base', 1),
  ('c0000000-0000-4000-8000-000000000024', 'd0000000-0000-4000-8000-000000000073', 'top', 0),
  ('c0000000-0000-4000-8000-000000000024', 'd0000000-0000-4000-8000-000000000074', 'top', 1),
  ('c0000000-0000-4000-8000-000000000024', 'd0000000-0000-4000-8000-000000000049', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000024', 'd0000000-0000-4000-8000-000000000075', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000024', 'd0000000-0000-4000-8000-000000000076', 'base', 0),
  ('c0000000-0000-4000-8000-000000000024', 'd0000000-0000-4000-8000-000000000009', 'base', 1)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000023', 10),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000024', 11)
on conflict do nothing;
