-- Adds Valentino Born in Roma Coral Fantasy (perfume + decant 3/5 ml).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000093', 'Acordes rojos', 'acordes-rojos')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000035',
    'Born in Roma Coral Fantasy',
    'born-in-roma-coral-fantasy',
    'a0000000-0000-4000-8000-000000000009',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina moderna, fresca y vibrante que combina un carácter afrutado con notas aromáticas y un fondo amaderado. Born in Roma Coral Fantasy tiene un perfil juvenil y sofisticado, ideal para quienes buscan un aroma versátil, llamativo y fácil de llevar durante el día o la noche.',
    'perfume',
    'masculine',
    550,
    null,
    10,
    array['frutal', 'aromático', 'amaderado', 'floral']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    4,
    true,
    false,
    35,
    '2026-08-25'
  ),
  (
    'c0000000-0000-4000-8000-000000000036',
    'Born in Roma Coral Fantasy',
    'born-in-roma-coral-fantasy-decant',
    'a0000000-0000-4000-8000-000000000009',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina moderna, fresca y vibrante que combina un carácter afrutado con notas aromáticas y un fondo amaderado. Born in Roma Coral Fantasy tiene un perfil juvenil y sofisticado, ideal para quienes buscan un aroma versátil, llamativo y fácil de llevar durante el día o la noche.',
    'decant',
    'masculine',
    35,
    null,
    18,
    array['frutal', 'aromático', 'amaderado', 'floral']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    4,
    false,
    false,
    36,
    '2026-08-25'
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
  ('c0000000-0000-4000-8000-000000000035', '100 ml', 100, 550, null, 10, 'ELOVA-BIRCF-100', true, 1),
  ('c0000000-0000-4000-8000-000000000036', '3 ml', 3, 25, null, 22, 'ELOVA-BIRCF-3', false, 1),
  ('c0000000-0000-4000-8000-000000000036', '5 ml', 5, 35, null, 18, 'ELOVA-BIRCF-5', false, 2)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000035', '/images/products/product-born-in-roma-coral-fantasy.png', 'Born in Roma Coral Fantasy', 0),
  ('c0000000-0000-4000-8000-000000000036', '/images/products/product-born-in-roma-coral-fantasy.png', 'Born in Roma Coral Fantasy decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000035',
  'c0000000-0000-4000-8000-000000000036'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000035', 'd0000000-0000-4000-8000-000000000002', 'top', 0),
  ('c0000000-0000-4000-8000-000000000035', 'd0000000-0000-4000-8000-000000000024', 'top', 1),
  ('c0000000-0000-4000-8000-000000000035', 'd0000000-0000-4000-8000-000000000093', 'top', 2),
  ('c0000000-0000-4000-8000-000000000035', 'd0000000-0000-4000-8000-000000000049', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000035', 'd0000000-0000-4000-8000-000000000050', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000035', 'd0000000-0000-4000-8000-000000000040', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000035', 'd0000000-0000-4000-8000-000000000028', 'base', 0),
  ('c0000000-0000-4000-8000-000000000035', 'd0000000-0000-4000-8000-000000000052', 'base', 1),
  ('c0000000-0000-4000-8000-000000000035', 'd0000000-0000-4000-8000-000000000085', 'base', 2),
  ('c0000000-0000-4000-8000-000000000036', 'd0000000-0000-4000-8000-000000000002', 'top', 0),
  ('c0000000-0000-4000-8000-000000000036', 'd0000000-0000-4000-8000-000000000024', 'top', 1),
  ('c0000000-0000-4000-8000-000000000036', 'd0000000-0000-4000-8000-000000000093', 'top', 2),
  ('c0000000-0000-4000-8000-000000000036', 'd0000000-0000-4000-8000-000000000049', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000036', 'd0000000-0000-4000-8000-000000000050', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000036', 'd0000000-0000-4000-8000-000000000040', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000036', 'd0000000-0000-4000-8000-000000000028', 'base', 0),
  ('c0000000-0000-4000-8000-000000000036', 'd0000000-0000-4000-8000-000000000052', 'base', 1),
  ('c0000000-0000-4000-8000-000000000036', 'd0000000-0000-4000-8000-000000000085', 'base', 2)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000035', 22),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000036', 23),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000035', 18),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000036', 19),
  ('aa000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000035', 6),
  ('aa000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000036', 7)
on conflict do nothing;
