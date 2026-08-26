-- Adds Lattafa Fakhar Black (perfume + decant).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000112', 'Bayas de enebro', 'bayas-de-enebro')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000055',
    'Fakhar Black',
    'fakhar-black',
    'a0000000-0000-4000-8000-000000000011',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia masculina fresca, aromática y elegante, con un perfil limpio y sofisticado. Fakhar Black combina notas verdes y especiadas con un corazón floral y una base amaderada, creando un aroma versátil y moderno, perfecto tanto para el día a día como para ocasiones especiales.',
    'perfume',
    'masculine',
    143,
    null,
    10,
    array['aromático', 'amaderado', 'fresco', 'verde']::text[],
    array['diario', 'cita', 'fiesta', 'formal', 'noche']::text[],
    4.6,
    4,
    true,
    false,
    55,
    '2026-08-26'
  ),
  (
    'c0000000-0000-4000-8000-000000000056',
    'Fakhar Black',
    'fakhar-black-decant',
    'a0000000-0000-4000-8000-000000000011',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia masculina fresca, aromática y elegante, con un perfil limpio y sofisticado. Fakhar Black combina notas verdes y especiadas con un corazón floral y una base amaderada, creando un aroma versátil y moderno, perfecto tanto para el día a día como para ocasiones especiales.',
    'decant',
    'masculine',
    17,
    null,
    18,
    array['aromático', 'amaderado', 'fresco', 'verde']::text[],
    array['diario', 'cita', 'fiesta', 'formal', 'noche']::text[],
    4.6,
    4,
    false,
    false,
    56,
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
  ('c0000000-0000-4000-8000-000000000055', '100 ml', 100, 143, null, 10, 'ELOVA-FAKHAR-100', true, 1),
  ('c0000000-0000-4000-8000-000000000056', '3 ml', 3, 15, null, 22, 'ELOVA-FAKHAR-3', false, 1),
  ('c0000000-0000-4000-8000-000000000056', '5 ml', 5, 17, null, 18, 'ELOVA-FAKHAR-5', false, 2),
  ('c0000000-0000-4000-8000-000000000056', '10 ml', 10, 22, null, 11, 'ELOVA-FAKHAR-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000055', '/images/products/product-fakhar-black.png', 'Fakhar Black', 0),
  ('c0000000-0000-4000-8000-000000000056', '/images/products/product-fakhar-black.png', 'Fakhar Black decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000055',
  'c0000000-0000-4000-8000-000000000056'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000055', 'd0000000-0000-4000-8000-000000000107', 'top', 0),
  ('c0000000-0000-4000-8000-000000000055', 'd0000000-0000-4000-8000-000000000043', 'top', 1),
  ('c0000000-0000-4000-8000-000000000055', 'd0000000-0000-4000-8000-000000000002', 'top', 2),
  ('c0000000-0000-4000-8000-000000000055', 'd0000000-0000-4000-8000-000000000049', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000055', 'd0000000-0000-4000-8000-000000000040', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000055', 'd0000000-0000-4000-8000-000000000112', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000055', 'd0000000-0000-4000-8000-000000000050', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000055', 'd0000000-0000-4000-8000-000000000023', 'base', 0),
  ('c0000000-0000-4000-8000-000000000055', 'd0000000-0000-4000-8000-000000000041', 'base', 1),
  ('c0000000-0000-4000-8000-000000000055', 'd0000000-0000-4000-8000-000000000006', 'base', 2),
  ('c0000000-0000-4000-8000-000000000055', 'd0000000-0000-4000-8000-000000000028', 'base', 3),
  ('c0000000-0000-4000-8000-000000000056', 'd0000000-0000-4000-8000-000000000107', 'top', 0),
  ('c0000000-0000-4000-8000-000000000056', 'd0000000-0000-4000-8000-000000000043', 'top', 1),
  ('c0000000-0000-4000-8000-000000000056', 'd0000000-0000-4000-8000-000000000002', 'top', 2),
  ('c0000000-0000-4000-8000-000000000056', 'd0000000-0000-4000-8000-000000000049', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000056', 'd0000000-0000-4000-8000-000000000040', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000056', 'd0000000-0000-4000-8000-000000000112', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000056', 'd0000000-0000-4000-8000-000000000050', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000056', 'd0000000-0000-4000-8000-000000000023', 'base', 0),
  ('c0000000-0000-4000-8000-000000000056', 'd0000000-0000-4000-8000-000000000041', 'base', 1),
  ('c0000000-0000-4000-8000-000000000056', 'd0000000-0000-4000-8000-000000000006', 'base', 2),
  ('c0000000-0000-4000-8000-000000000056', 'd0000000-0000-4000-8000-000000000028', 'base', 3)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000055', 12),
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000056', 13),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000055', 42),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000056', 43),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000055', 38),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000056', 39)
on conflict do nothing;
