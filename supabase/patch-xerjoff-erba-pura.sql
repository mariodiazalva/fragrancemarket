-- Replaces Bakhoor Night with Xerjoff Erba Pura.
-- Safe to re-run.

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000016', 'Xerjoff', 'xerjoff')
on conflict (slug) do nothing;

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000067', 'Naranja de Sicilia', 'naranja-de-sicilia'),
  ('d0000000-0000-4000-8000-000000000068', 'Bergamota de Calabria', 'bergamota-de-calabria'),
  ('d0000000-0000-4000-8000-000000000069', 'Limón de Sicilia', 'limon-de-sicilia'),
  ('d0000000-0000-4000-8000-000000000070', 'Frutas mediterráneas', 'frutas-mediterraneas'),
  ('d0000000-0000-4000-8000-000000000071', 'Almizcle blanco', 'almizcle-blanco'),
  ('d0000000-0000-4000-8000-000000000072', 'Vainilla de Madagascar', 'vainilla-de-madagascar')
on conflict (slug) do nothing;

update public.products
set
  name = 'Erba Pura',
  slug = 'erba-pura',
  brand_id = 'a0000000-0000-4000-8000-000000000016',
  category_id = 'b0000000-0000-4000-8000-000000000001',
  description = 'Una fragancia vibrante, lujosa y envolvente que combina un explosivo acorde frutal con cítricos frescos y una base cálida y almizclada. Erba Pura destaca por su gran presencia y estela, ofreciendo un aroma moderno, sensual y sofisticado que funciona tanto para hombres como para mujeres.',
  gender = 'unisex',
  price = 960,
  compare_at_price = null,
  stock = 5,
  fragrance_family = array['cítrico', 'frutal', 'ámbar', 'almizclado', 'amaderado']::text[],
  occasions = array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
  intensity = 5,
  featured = false,
  bestseller = false
where id = 'c0000000-0000-4000-8000-000000000010'
   or slug in ('bakhoor-night', 'erba-pura');

update public.products
set
  name = 'Erba Pura',
  slug = 'erba-pura-decant',
  brand_id = 'a0000000-0000-4000-8000-000000000016',
  category_id = 'b0000000-0000-4000-8000-000000000001',
  description = 'Una fragancia vibrante, lujosa y envolvente que combina un explosivo acorde frutal con cítricos frescos y una base cálida y almizclada. Erba Pura destaca por su gran presencia y estela, ofreciendo un aroma moderno, sensual y sofisticado que funciona tanto para hombres como para mujeres.',
  gender = 'unisex',
  price = 76,
  compare_at_price = null,
  stock = 18,
  fragrance_family = array['cítrico', 'frutal', 'ámbar', 'almizclado', 'amaderado']::text[],
  occasions = array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
  intensity = 5,
  featured = false,
  bestseller = false
where id = 'c0000000-0000-4000-8000-000000000017'
   or slug in ('bakhoor-night-decant', 'erba-pura-decant');

update public.product_variants
set label = '100 ml', volume_ml = 100, price = 960, compare_at_price = null, stock = 5, sku = 'ELOVA-ERBA-100'
where product_id = 'c0000000-0000-4000-8000-000000000010';

update public.product_variants
set price = 45, sku = 'ELOVA-ERBA-3'
where product_id = 'c0000000-0000-4000-8000-000000000017' and volume_ml = 3;

update public.product_variants
set price = 76, sku = 'ELOVA-ERBA-5'
where product_id = 'c0000000-0000-4000-8000-000000000017' and volume_ml = 5;

update public.product_variants
set price = 142, sku = 'ELOVA-ERBA-10'
where product_id = 'c0000000-0000-4000-8000-000000000017' and volume_ml = 10;

update public.product_images
set url = '/images/products/product-erba-pura.png', alt = 'Erba Pura'
where product_id = 'c0000000-0000-4000-8000-000000000010';

update public.product_images
set url = '/images/products/product-erba-pura.png', alt = 'Erba Pura decant'
where product_id = 'c0000000-0000-4000-8000-000000000017';

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000010',
  'c0000000-0000-4000-8000-000000000017'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000010', 'd0000000-0000-4000-8000-000000000067', 'top', 0),
  ('c0000000-0000-4000-8000-000000000010', 'd0000000-0000-4000-8000-000000000068', 'top', 1),
  ('c0000000-0000-4000-8000-000000000010', 'd0000000-0000-4000-8000-000000000069', 'top', 2),
  ('c0000000-0000-4000-8000-000000000010', 'd0000000-0000-4000-8000-000000000070', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000010', 'd0000000-0000-4000-8000-000000000071', 'base', 0),
  ('c0000000-0000-4000-8000-000000000010', 'd0000000-0000-4000-8000-000000000006', 'base', 1),
  ('c0000000-0000-4000-8000-000000000010', 'd0000000-0000-4000-8000-000000000072', 'base', 2),
  ('c0000000-0000-4000-8000-000000000017', 'd0000000-0000-4000-8000-000000000067', 'top', 0),
  ('c0000000-0000-4000-8000-000000000017', 'd0000000-0000-4000-8000-000000000068', 'top', 1),
  ('c0000000-0000-4000-8000-000000000017', 'd0000000-0000-4000-8000-000000000069', 'top', 2),
  ('c0000000-0000-4000-8000-000000000017', 'd0000000-0000-4000-8000-000000000070', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000017', 'd0000000-0000-4000-8000-000000000071', 'base', 0),
  ('c0000000-0000-4000-8000-000000000017', 'd0000000-0000-4000-8000-000000000006', 'base', 1),
  ('c0000000-0000-4000-8000-000000000017', 'd0000000-0000-4000-8000-000000000072', 'base', 2)
on conflict do nothing;

update public.set_products
set individual_price = 76
where product_id = 'c0000000-0000-4000-8000-000000000017';

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000010', 1),
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000017', 2),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000010', 8),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000017', 9)
on conflict do nothing;
