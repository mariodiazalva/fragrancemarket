-- Replaces Nocturne Absolu with Emporio Armani Stronger With You Intensely.
-- Safe to re-run.

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000010', 'Emporio Armani', 'emporio-armani')
on conflict (slug) do nothing;

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000037', 'Enebro', 'enebro'),
  ('d0000000-0000-4000-8000-000000000038', 'Toffee', 'toffee'),
  ('d0000000-0000-4000-8000-000000000039', 'Canela', 'canela'),
  ('d0000000-0000-4000-8000-000000000040', 'Salvia', 'salvia'),
  ('d0000000-0000-4000-8000-000000000041', 'Haba tonka', 'haba-tonka'),
  ('d0000000-0000-4000-8000-000000000042', 'Ante', 'ante')
on conflict (slug) do nothing;

update public.products
set
  name = 'Stronger With You Intensely',
  slug = 'stronger-with-you-intensely',
  brand_id = 'a0000000-0000-4000-8000-000000000010',
  category_id = 'b0000000-0000-4000-8000-000000000003',
  description = 'Una fragancia intensa, cálida y adictiva que combina acordes dulces y especiados con una base profunda y envolvente. Stronger With You Intensely destaca por su carácter seductor y masculino, siendo especialmente atractivo para noches, citas y ocasiones especiales.',
  gender = 'masculine',
  price = 515,
  compare_at_price = null,
  stock = 8,
  fragrance_family = array['ámbar', 'aromático', 'especiado', 'oriental']::text[],
  occasions = array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
  intensity = 5,
  featured = true,
  bestseller = true
where id = 'c0000000-0000-4000-8000-000000000001'
   or slug in ('nocturne-absolu', 'stronger-with-you-intensely');

update public.products
set
  name = 'Stronger With You Intensely',
  slug = 'stronger-with-you-intensely-decant',
  brand_id = 'a0000000-0000-4000-8000-000000000010',
  category_id = 'b0000000-0000-4000-8000-000000000003',
  description = 'Una fragancia intensa, cálida y adictiva que combina acordes dulces y especiados con una base profunda y envolvente. Stronger With You Intensely destaca por su carácter seductor y masculino, siendo especialmente atractivo para noches, citas y ocasiones especiales.',
  gender = 'masculine',
  price = 35,
  compare_at_price = null,
  stock = 18,
  fragrance_family = array['ámbar', 'aromático', 'especiado', 'oriental']::text[],
  occasions = array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
  intensity = 5,
  featured = false,
  bestseller = true
where id = 'c0000000-0000-4000-8000-000000000009'
   or slug in ('nocturne-absolu-decant', 'stronger-with-you-intensely-decant');

update public.product_variants
set label = '100 ml', volume_ml = 100, price = 515, compare_at_price = null, stock = 8, sku = 'ELOVA-SWY-100'
where product_id = 'c0000000-0000-4000-8000-000000000001';

update public.product_variants
set price = 25, sku = 'ELOVA-SWY-3'
where product_id = 'c0000000-0000-4000-8000-000000000009' and volume_ml = 3;

update public.product_variants
set price = 35, sku = 'ELOVA-SWY-5'
where product_id = 'c0000000-0000-4000-8000-000000000009' and volume_ml = 5;

update public.product_variants
set price = 60, sku = 'ELOVA-SWY-10'
where product_id = 'c0000000-0000-4000-8000-000000000009' and volume_ml = 10;

update public.product_images
set url = '/images/products/product-stronger-with-you.png', alt = 'Stronger With You Intensely'
where product_id = 'c0000000-0000-4000-8000-000000000001';

update public.product_images
set url = '/images/products/product-stronger-with-you.png', alt = 'Stronger With You Intensely decant'
where product_id = 'c0000000-0000-4000-8000-000000000009';

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000001',
  'c0000000-0000-4000-8000-000000000009'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000001', 'd0000000-0000-4000-8000-000000000015', 'top', 0),
  ('c0000000-0000-4000-8000-000000000001', 'd0000000-0000-4000-8000-000000000037', 'top', 1),
  ('c0000000-0000-4000-8000-000000000001', 'd0000000-0000-4000-8000-000000000017', 'top', 2),
  ('c0000000-0000-4000-8000-000000000001', 'd0000000-0000-4000-8000-000000000038', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000001', 'd0000000-0000-4000-8000-000000000039', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000001', 'd0000000-0000-4000-8000-000000000040', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000001', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000001', 'd0000000-0000-4000-8000-000000000006', 'base', 1),
  ('c0000000-0000-4000-8000-000000000001', 'd0000000-0000-4000-8000-000000000041', 'base', 2),
  ('c0000000-0000-4000-8000-000000000001', 'd0000000-0000-4000-8000-000000000042', 'base', 3),
  ('c0000000-0000-4000-8000-000000000009', 'd0000000-0000-4000-8000-000000000015', 'top', 0),
  ('c0000000-0000-4000-8000-000000000009', 'd0000000-0000-4000-8000-000000000037', 'top', 1),
  ('c0000000-0000-4000-8000-000000000009', 'd0000000-0000-4000-8000-000000000017', 'top', 2),
  ('c0000000-0000-4000-8000-000000000009', 'd0000000-0000-4000-8000-000000000038', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000009', 'd0000000-0000-4000-8000-000000000039', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000009', 'd0000000-0000-4000-8000-000000000040', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000009', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000009', 'd0000000-0000-4000-8000-000000000006', 'base', 1),
  ('c0000000-0000-4000-8000-000000000009', 'd0000000-0000-4000-8000-000000000041', 'base', 2),
  ('c0000000-0000-4000-8000-000000000009', 'd0000000-0000-4000-8000-000000000042', 'base', 3)
on conflict do nothing;

update public.set_products
set individual_price = 35
where product_id = 'c0000000-0000-4000-8000-000000000009';
