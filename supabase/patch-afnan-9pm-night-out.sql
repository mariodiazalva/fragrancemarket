-- Replaces Citrus Atlas with Afnan 9 PM Night Out.
-- Safe to re-run.

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000014', 'Afnan', 'afnan')
on conflict (slug) do nothing;

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000063', 'Acordes aromáticos', 'acordes-aromaticos'),
  ('d0000000-0000-4000-8000-000000000064', 'Maderas', 'maderas')
on conflict (slug) do nothing;

update public.products
set
  name = '9 PM Night Out',
  slug = '9-pm-night-out',
  brand_id = 'a0000000-0000-4000-8000-000000000014',
  category_id = 'b0000000-0000-4000-8000-000000000002',
  description = 'Una fragancia masculina, intensa y sofisticada, diseñada para destacar durante la noche. 9 PM Night Out combina acordes especiados y aromáticos con un fondo cálido y amaderado, creando una esencia elegante, seductora y moderna, perfecta para citas, fiestas y ocasiones especiales.',
  gender = 'masculine',
  price = 155,
  compare_at_price = null,
  stock = 14,
  fragrance_family = array['ámbar', 'aromático', 'especiado', 'amaderado']::text[],
  occasions = array['cita', 'fiesta', 'formal', 'noche']::text[],
  intensity = 4,
  featured = true,
  bestseller = false
where id = 'c0000000-0000-4000-8000-000000000005'
   or slug in ('citrus-atlas', '9-pm-night-out');

update public.products
set
  name = '9 PM Night Out',
  slug = '9-pm-night-out-decant',
  brand_id = 'a0000000-0000-4000-8000-000000000014',
  category_id = 'b0000000-0000-4000-8000-000000000002',
  description = 'Una fragancia masculina, intensa y sofisticada, diseñada para destacar durante la noche. 9 PM Night Out combina acordes especiados y aromáticos con un fondo cálido y amaderado, creando una esencia elegante, seductora y moderna, perfecta para citas, fiestas y ocasiones especiales.',
  gender = 'masculine',
  price = 25,
  compare_at_price = null,
  stock = 18,
  fragrance_family = array['ámbar', 'aromático', 'especiado', 'amaderado']::text[],
  occasions = array['cita', 'fiesta', 'formal', 'noche']::text[],
  intensity = 4,
  featured = false,
  bestseller = false
where id = 'c0000000-0000-4000-8000-000000000014'
   or slug in ('citrus-atlas-decant', '9-pm-night-out-decant');

update public.product_variants
set label = '100 ml', volume_ml = 100, price = 155, compare_at_price = null, stock = 14, sku = 'ELOVA-9PM-100'
where product_id = 'c0000000-0000-4000-8000-000000000005';

update public.product_variants
set price = 19, sku = 'ELOVA-9PM-3'
where product_id = 'c0000000-0000-4000-8000-000000000014' and volume_ml = 3;

update public.product_variants
set price = 25, sku = 'ELOVA-9PM-5'
where product_id = 'c0000000-0000-4000-8000-000000000014' and volume_ml = 5;

update public.product_variants
set price = 37, sku = 'ELOVA-9PM-10'
where product_id = 'c0000000-0000-4000-8000-000000000014' and volume_ml = 10;

update public.product_images
set url = '/images/products/product-9pm-night-out.png', alt = '9 PM Night Out'
where product_id = 'c0000000-0000-4000-8000-000000000005';

update public.product_images
set url = '/images/products/product-9pm-night-out.png', alt = '9 PM Night Out decant'
where product_id = 'c0000000-0000-4000-8000-000000000014';

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000005',
  'c0000000-0000-4000-8000-000000000014'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000005', 'd0000000-0000-4000-8000-000000000002', 'top', 0),
  ('c0000000-0000-4000-8000-000000000005', 'd0000000-0000-4000-8000-000000000001', 'top', 1),
  ('c0000000-0000-4000-8000-000000000005', 'd0000000-0000-4000-8000-000000000049', 'top', 2),
  ('c0000000-0000-4000-8000-000000000005', 'd0000000-0000-4000-8000-000000000039', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000005', 'd0000000-0000-4000-8000-000000000040', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000005', 'd0000000-0000-4000-8000-000000000063', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000005', 'd0000000-0000-4000-8000-000000000006', 'base', 0),
  ('c0000000-0000-4000-8000-000000000005', 'd0000000-0000-4000-8000-000000000009', 'base', 1),
  ('c0000000-0000-4000-8000-000000000005', 'd0000000-0000-4000-8000-000000000052', 'base', 2),
  ('c0000000-0000-4000-8000-000000000005', 'd0000000-0000-4000-8000-000000000064', 'base', 3),
  ('c0000000-0000-4000-8000-000000000014', 'd0000000-0000-4000-8000-000000000002', 'top', 0),
  ('c0000000-0000-4000-8000-000000000014', 'd0000000-0000-4000-8000-000000000001', 'top', 1),
  ('c0000000-0000-4000-8000-000000000014', 'd0000000-0000-4000-8000-000000000049', 'top', 2),
  ('c0000000-0000-4000-8000-000000000014', 'd0000000-0000-4000-8000-000000000039', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000014', 'd0000000-0000-4000-8000-000000000040', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000014', 'd0000000-0000-4000-8000-000000000063', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000014', 'd0000000-0000-4000-8000-000000000006', 'base', 0),
  ('c0000000-0000-4000-8000-000000000014', 'd0000000-0000-4000-8000-000000000009', 'base', 1),
  ('c0000000-0000-4000-8000-000000000014', 'd0000000-0000-4000-8000-000000000052', 'base', 2),
  ('c0000000-0000-4000-8000-000000000014', 'd0000000-0000-4000-8000-000000000064', 'base', 3)
on conflict do nothing;

update public.set_products
set individual_price = 25
where product_id = 'c0000000-0000-4000-8000-000000000014';

delete from public.collection_products
where product_id in (
  'c0000000-0000-4000-8000-000000000005',
  'c0000000-0000-4000-8000-000000000014'
)
  and collection_id = 'aa000000-0000-4000-8000-000000000001';

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000005', 6),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000014', 7),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000005', 6),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000014', 7)
on conflict do nothing;
