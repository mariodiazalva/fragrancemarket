-- Replaces Rose Silence with Lattafa Yara.
-- Safe to re-run.

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000011', 'Lattafa', 'lattafa')
on conflict (slug) do nothing;

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000053', 'Orquídea', 'orquidea'),
  ('d0000000-0000-4000-8000-000000000054', 'Heliotropo', 'heliotropo'),
  ('d0000000-0000-4000-8000-000000000055', 'Acorde tropical', 'acorde-tropical'),
  ('d0000000-0000-4000-8000-000000000056', 'Frutas', 'frutas')
on conflict (slug) do nothing;

update public.products
set
  name = 'Yara',
  slug = 'yara',
  brand_id = 'a0000000-0000-4000-8000-000000000011',
  category_id = 'b0000000-0000-4000-8000-000000000002',
  description = 'Una fragancia femenina, dulce y cremosa, con un carácter delicado y envolvente. Lattafa Yara combina frutas suaves, flores blancas y acordes de vainilla y almizcle, creando un aroma elegante, juvenil y muy fácil de llevar.',
  gender = 'feminine',
  price = 150,
  compare_at_price = null,
  stock = 7,
  fragrance_family = array['floral', 'gourmand', 'ámbar', 'oriental']::text[],
  occasions = array['diario', 'cita', 'fiesta', 'noche']::text[],
  intensity = 4,
  featured = true,
  bestseller = false
where id = 'c0000000-0000-4000-8000-000000000008'
   or slug in ('rose-silence', 'yara');

update public.products
set
  name = 'Yara',
  slug = 'yara-decant',
  brand_id = 'a0000000-0000-4000-8000-000000000011',
  category_id = 'b0000000-0000-4000-8000-000000000002',
  description = 'Una fragancia femenina, dulce y cremosa, con un carácter delicado y envolvente. Lattafa Yara combina frutas suaves, flores blancas y acordes de vainilla y almizcle, creando un aroma elegante, juvenil y muy fácil de llevar.',
  gender = 'feminine',
  price = 30,
  compare_at_price = null,
  stock = 18,
  fragrance_family = array['floral', 'gourmand', 'ámbar', 'oriental']::text[],
  occasions = array['diario', 'cita', 'fiesta', 'noche']::text[],
  intensity = 4,
  featured = false,
  bestseller = false
where id = 'c0000000-0000-4000-8000-000000000016'
   or slug in ('rose-silence-decant', 'yara-decant');

update public.product_variants
set label = '100 ml', volume_ml = 100, price = 150, compare_at_price = null, stock = 7, sku = 'ELOVA-YARA-100'
where product_id = 'c0000000-0000-4000-8000-000000000008';

update public.product_variants
set price = 22, sku = 'ELOVA-YARA-3'
where product_id = 'c0000000-0000-4000-8000-000000000016' and volume_ml = 3;

update public.product_variants
set price = 30, sku = 'ELOVA-YARA-5'
where product_id = 'c0000000-0000-4000-8000-000000000016' and volume_ml = 5;

update public.product_variants
set price = 45, sku = 'ELOVA-YARA-10'
where product_id = 'c0000000-0000-4000-8000-000000000016' and volume_ml = 10;

update public.product_images
set url = '/images/products/product-yara.png', alt = 'Yara'
where product_id = 'c0000000-0000-4000-8000-000000000008';

update public.product_images
set url = '/images/products/product-yara.png', alt = 'Yara decant'
where product_id = 'c0000000-0000-4000-8000-000000000016';

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000008',
  'c0000000-0000-4000-8000-000000000016'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000008', 'd0000000-0000-4000-8000-000000000053', 'top', 0),
  ('c0000000-0000-4000-8000-000000000008', 'd0000000-0000-4000-8000-000000000054', 'top', 1),
  ('c0000000-0000-4000-8000-000000000008', 'd0000000-0000-4000-8000-000000000048', 'top', 2),
  ('c0000000-0000-4000-8000-000000000008', 'd0000000-0000-4000-8000-000000000055', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000008', 'd0000000-0000-4000-8000-000000000056', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000008', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000008', 'd0000000-0000-4000-8000-000000000010', 'base', 1),
  ('c0000000-0000-4000-8000-000000000008', 'd0000000-0000-4000-8000-000000000005', 'base', 2),
  ('c0000000-0000-4000-8000-000000000016', 'd0000000-0000-4000-8000-000000000053', 'top', 0),
  ('c0000000-0000-4000-8000-000000000016', 'd0000000-0000-4000-8000-000000000054', 'top', 1),
  ('c0000000-0000-4000-8000-000000000016', 'd0000000-0000-4000-8000-000000000048', 'top', 2),
  ('c0000000-0000-4000-8000-000000000016', 'd0000000-0000-4000-8000-000000000055', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000016', 'd0000000-0000-4000-8000-000000000056', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000016', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000016', 'd0000000-0000-4000-8000-000000000010', 'base', 1),
  ('c0000000-0000-4000-8000-000000000016', 'd0000000-0000-4000-8000-000000000005', 'base', 2)
on conflict do nothing;

update public.set_products
set individual_price = 30
where product_id = 'c0000000-0000-4000-8000-000000000016';
