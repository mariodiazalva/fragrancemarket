-- Sync live Supabase with the edited catalog and prices.
-- SQL Editor -> New query -> copy this file from Cursor -> Run.
-- Safe to re-run.


-- ===== patch-stronger-with-you.sql =====
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


-- ===== patch-odyssey-aqua.sql =====
-- Replaces Amber Veil with Armaf Odyssey Aqua.
-- Safe to re-run.

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000012', 'Armaf', 'armaf')
on conflict (slug) do nothing;

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000048', 'Mandarina', 'mandarina'),
  ('d0000000-0000-4000-8000-000000000049', 'Lavanda', 'lavanda'),
  ('d0000000-0000-4000-8000-000000000050', 'Geranio', 'geranio'),
  ('d0000000-0000-4000-8000-000000000051', 'Menta', 'menta'),
  ('d0000000-0000-4000-8000-000000000052', 'Pachulí', 'pachuli')
on conflict (slug) do nothing;

update public.products
set
  name = 'Odyssey Aqua',
  slug = 'odyssey-aqua',
  brand_id = 'a0000000-0000-4000-8000-000000000012',
  category_id = 'b0000000-0000-4000-8000-000000000002',
  description = 'Una fragancia fresca, cítrica y aromática con un carácter limpio y masculino. Odyssey Aqua combina notas refrescantes con un fondo amaderado que la convierte en una opción versátil, ideal para el día a día, días calurosos y ocasiones donde buscas transmitir frescura y elegancia.',
  gender = 'masculine',
  price = 170,
  compare_at_price = null,
  stock = 12,
  fragrance_family = array['cítrico', 'aromático', 'fresco', 'amaderado']::text[],
  occasions = array['diario', 'cita', 'fiesta', 'formal']::text[],
  intensity = 4,
  featured = true,
  bestseller = false
where id = 'c0000000-0000-4000-8000-000000000002'
   or slug in ('amber-veil', 'odyssey-aqua');

update public.products
set
  name = 'Odyssey Aqua',
  slug = 'odyssey-aqua-decant',
  brand_id = 'a0000000-0000-4000-8000-000000000012',
  category_id = 'b0000000-0000-4000-8000-000000000002',
  description = 'Una fragancia fresca, cítrica y aromática con un carácter limpio y masculino. Odyssey Aqua combina notas refrescantes con un fondo amaderado que la convierte en una opción versátil, ideal para el día a día, días calurosos y ocasiones donde buscas transmitir frescura y elegancia.',
  gender = 'masculine',
  price = 18,
  compare_at_price = null,
  stock = 18,
  fragrance_family = array['cítrico', 'aromático', 'fresco', 'amaderado']::text[],
  occasions = array['diario', 'cita', 'fiesta', 'formal']::text[],
  intensity = 4,
  featured = false,
  bestseller = false
where id = 'c0000000-0000-4000-8000-000000000011'
   or slug in ('amber-veil-decant', 'odyssey-aqua-decant');

update public.product_variants
set label = '100 ml', volume_ml = 100, price = 170, compare_at_price = null, stock = 12, sku = 'ELOVA-AQUA-100'
where product_id = 'c0000000-0000-4000-8000-000000000002';

update public.product_variants
set price = 15, sku = 'ELOVA-AQUA-3'
where product_id = 'c0000000-0000-4000-8000-000000000011' and volume_ml = 3;

update public.product_variants
set price = 18, sku = 'ELOVA-AQUA-5'
where product_id = 'c0000000-0000-4000-8000-000000000011' and volume_ml = 5;

update public.product_variants
set price = 25, sku = 'ELOVA-AQUA-10'
where product_id = 'c0000000-0000-4000-8000-000000000011' and volume_ml = 10;

update public.product_images
set url = '/images/products/product-odyssey-aqua.png', alt = 'Odyssey Aqua'
where product_id = 'c0000000-0000-4000-8000-000000000002';

update public.product_images
set url = '/images/products/product-odyssey-aqua.png', alt = 'Odyssey Aqua decant'
where product_id = 'c0000000-0000-4000-8000-000000000011';

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000002',
  'c0000000-0000-4000-8000-000000000011'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000002', 'd0000000-0000-4000-8000-000000000019', 'top', 0),
  ('c0000000-0000-4000-8000-000000000002', 'd0000000-0000-4000-8000-000000000048', 'top', 1),
  ('c0000000-0000-4000-8000-000000000002', 'd0000000-0000-4000-8000-000000000002', 'top', 2),
  ('c0000000-0000-4000-8000-000000000002', 'd0000000-0000-4000-8000-000000000049', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000002', 'd0000000-0000-4000-8000-000000000050', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000002', 'd0000000-0000-4000-8000-000000000051', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000002', 'd0000000-0000-4000-8000-000000000023', 'base', 0),
  ('c0000000-0000-4000-8000-000000000002', 'd0000000-0000-4000-8000-000000000052', 'base', 1),
  ('c0000000-0000-4000-8000-000000000002', 'd0000000-0000-4000-8000-000000000005', 'base', 2),
  ('c0000000-0000-4000-8000-000000000002', 'd0000000-0000-4000-8000-000000000010', 'base', 3),
  ('c0000000-0000-4000-8000-000000000011', 'd0000000-0000-4000-8000-000000000019', 'top', 0),
  ('c0000000-0000-4000-8000-000000000011', 'd0000000-0000-4000-8000-000000000048', 'top', 1),
  ('c0000000-0000-4000-8000-000000000011', 'd0000000-0000-4000-8000-000000000002', 'top', 2),
  ('c0000000-0000-4000-8000-000000000011', 'd0000000-0000-4000-8000-000000000049', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000011', 'd0000000-0000-4000-8000-000000000050', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000011', 'd0000000-0000-4000-8000-000000000051', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000011', 'd0000000-0000-4000-8000-000000000023', 'base', 0),
  ('c0000000-0000-4000-8000-000000000011', 'd0000000-0000-4000-8000-000000000052', 'base', 1),
  ('c0000000-0000-4000-8000-000000000011', 'd0000000-0000-4000-8000-000000000005', 'base', 2),
  ('c0000000-0000-4000-8000-000000000011', 'd0000000-0000-4000-8000-000000000010', 'base', 3)
on conflict do nothing;

update public.set_products
set individual_price = 18
where product_id = 'c0000000-0000-4000-8000-000000000011';


-- ===== patch-valentino-born-in-roma.sql =====
-- Replaces Oud Sable with Valentino Born in Roma Uomo Intense.
-- Safe to re-run. Does not delete Bakhoor Night (still uses product-oud.png).

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000009', 'Valentino', 'valentino')
on conflict (slug) do nothing;

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000036', 'Lavandín', 'lavandin')
on conflict (slug) do nothing;

update public.products
set
  name = 'Born in Roma Uomo Intense',
  slug = 'born-in-roma-uomo-intense',
  brand_id = 'a0000000-0000-4000-8000-000000000009',
  category_id = 'b0000000-0000-4000-8000-000000000003',
  description = 'Una fragancia intensa, elegante y seductora que combina la calidez de la vainilla con acordes aromáticos y amaderados. Born in Roma Uomo Intense proyecta una personalidad sofisticada y moderna, ideal para destacar especialmente durante la noche y en ocasiones especiales.',
  gender = 'masculine',
  price = 650,
  compare_at_price = null,
  stock = 6,
  fragrance_family = array['ámbar', 'aromático', 'amaderado', 'oriental']::text[],
  occasions = array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
  intensity = 5,
  featured = true,
  bestseller = true
where id = 'c0000000-0000-4000-8000-000000000003'
   or slug in ('oud-sable', 'born-in-roma-uomo-intense');

update public.products
set
  name = 'Born in Roma Uomo Intense',
  slug = 'born-in-roma-uomo-intense-decant',
  brand_id = 'a0000000-0000-4000-8000-000000000009',
  category_id = 'b0000000-0000-4000-8000-000000000003',
  description = 'Una fragancia intensa, elegante y seductora que combina la calidez de la vainilla con acordes aromáticos y amaderados. Born in Roma Uomo Intense proyecta una personalidad sofisticada y moderna, ideal para destacar especialmente durante la noche y en ocasiones especiales.',
  gender = 'masculine',
  price = 45,
  compare_at_price = null,
  stock = 18,
  fragrance_family = array['ámbar', 'aromático', 'amaderado', 'oriental']::text[],
  occasions = array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
  intensity = 5,
  featured = false,
  bestseller = true
where id = 'c0000000-0000-4000-8000-000000000012'
   or slug in ('oud-sable-decant', 'born-in-roma-uomo-intense-decant');

update public.product_variants
set label = '100 ml', volume_ml = 100, price = 650, compare_at_price = null, stock = 6, sku = 'ELOVA-BIR-100'
where product_id = 'c0000000-0000-4000-8000-000000000003';

update public.product_variants
set price = 26, sku = 'ELOVA-BIR-3'
where product_id = 'c0000000-0000-4000-8000-000000000012' and volume_ml = 3;

update public.product_variants
set price = 45, sku = 'ELOVA-BIR-5'
where product_id = 'c0000000-0000-4000-8000-000000000012' and volume_ml = 5;

update public.product_variants
set price = 75, sku = 'ELOVA-BIR-10'
where product_id = 'c0000000-0000-4000-8000-000000000012' and volume_ml = 10;

update public.product_images
set url = '/images/products/product-born-in-roma-v2.png', alt = 'Born in Roma Uomo Intense'
where product_id = 'c0000000-0000-4000-8000-000000000003';

update public.product_images
set url = '/images/products/product-born-in-roma-v2.png', alt = 'Born in Roma Uomo Intense decant'
where product_id = 'c0000000-0000-4000-8000-000000000012';

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000003',
  'c0000000-0000-4000-8000-000000000012'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000003', 'd0000000-0000-4000-8000-000000000009', 'top', 0),
  ('c0000000-0000-4000-8000-000000000003', 'd0000000-0000-4000-8000-000000000036', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000003', 'd0000000-0000-4000-8000-000000000028', 'base', 0),
  ('c0000000-0000-4000-8000-000000000012', 'd0000000-0000-4000-8000-000000000009', 'top', 0),
  ('c0000000-0000-4000-8000-000000000012', 'd0000000-0000-4000-8000-000000000036', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000012', 'd0000000-0000-4000-8000-000000000028', 'base', 0)
on conflict do nothing;

update public.set_products
set individual_price = 45
where set_id = 'e0000000-0000-4000-8000-000000000004'
  and product_id = 'c0000000-0000-4000-8000-000000000012';


-- ===== patch-khamrah-qahwa.sql =====
-- Replaces Velvet Ember with Lattafa Khamrah Qahwa.
-- Safe to re-run.

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000011', 'Lattafa', 'lattafa')
on conflict (slug) do nothing;

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000043', 'Jengibre', 'jengibre'),
  ('d0000000-0000-4000-8000-000000000044', 'Praliné', 'praline'),
  ('d0000000-0000-4000-8000-000000000045', 'Frutas confitadas', 'frutas-confitadas'),
  ('d0000000-0000-4000-8000-000000000046', 'Flores blancas', 'flores-blancas'),
  ('d0000000-0000-4000-8000-000000000047', 'Café', 'cafe')
on conflict (slug) do nothing;

update public.products
set
  name = 'Khamrah Qahwa',
  slug = 'khamrah-qahwa',
  brand_id = 'a0000000-0000-4000-8000-000000000011',
  category_id = 'b0000000-0000-4000-8000-000000000002',
  description = 'Una fragancia cálida, dulce y envolvente que combina especias aromáticas con acordes gourmand de canela, praliné y café. Khamrah Qahwa ofrece un aroma intenso y adictivo, perfecto para quienes buscan una fragancia llamativa, sofisticada y especialmente atractiva durante la noche y en climas frescos.',
  gender = 'unisex',
  price = 165,
  compare_at_price = null,
  stock = 9,
  fragrance_family = array['ámbar', 'especiado', 'gourmand', 'oriental']::text[],
  occasions = array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
  intensity = 5,
  featured = true,
  bestseller = true
where id = 'c0000000-0000-4000-8000-000000000006'
   or slug in ('velvet-ember', 'khamrah-qahwa');

update public.products
set
  name = 'Khamrah Qahwa',
  slug = 'khamrah-qahwa-decant',
  brand_id = 'a0000000-0000-4000-8000-000000000011',
  category_id = 'b0000000-0000-4000-8000-000000000002',
  description = 'Una fragancia cálida, dulce y envolvente que combina especias aromáticas con acordes gourmand de canela, praliné y café. Khamrah Qahwa ofrece un aroma intenso y adictivo, perfecto para quienes buscan una fragancia llamativa, sofisticada y especialmente atractiva durante la noche y en climas frescos.',
  gender = 'unisex',
  price = 18,
  compare_at_price = null,
  stock = 18,
  fragrance_family = array['ámbar', 'especiado', 'gourmand', 'oriental']::text[],
  occasions = array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
  intensity = 5,
  featured = false,
  bestseller = true
where id = 'c0000000-0000-4000-8000-000000000015'
   or slug in ('velvet-ember-decant', 'khamrah-qahwa-decant');

update public.product_variants
set label = '100 ml', volume_ml = 100, price = 165, compare_at_price = null, stock = 9, sku = 'ELOVA-QAHWA-100'
where product_id = 'c0000000-0000-4000-8000-000000000006';

update public.product_variants
set price = 15, sku = 'ELOVA-QAHWA-3'
where product_id = 'c0000000-0000-4000-8000-000000000015' and volume_ml = 3;

update public.product_variants
set price = 18, sku = 'ELOVA-QAHWA-5'
where product_id = 'c0000000-0000-4000-8000-000000000015' and volume_ml = 5;

update public.product_variants
set price = 22, sku = 'ELOVA-QAHWA-10'
where product_id = 'c0000000-0000-4000-8000-000000000015' and volume_ml = 10;

update public.product_images
set url = '/images/products/product-khamrah-qahwa.png', alt = 'Khamrah Qahwa'
where product_id = 'c0000000-0000-4000-8000-000000000006';

update public.product_images
set url = '/images/products/product-khamrah-qahwa.png', alt = 'Khamrah Qahwa decant'
where product_id = 'c0000000-0000-4000-8000-000000000015';

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000006',
  'c0000000-0000-4000-8000-000000000015'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000006', 'd0000000-0000-4000-8000-000000000039', 'top', 0),
  ('c0000000-0000-4000-8000-000000000006', 'd0000000-0000-4000-8000-000000000024', 'top', 1),
  ('c0000000-0000-4000-8000-000000000006', 'd0000000-0000-4000-8000-000000000043', 'top', 2),
  ('c0000000-0000-4000-8000-000000000006', 'd0000000-0000-4000-8000-000000000044', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000006', 'd0000000-0000-4000-8000-000000000045', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000006', 'd0000000-0000-4000-8000-000000000046', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000006', 'd0000000-0000-4000-8000-000000000047', 'base', 0),
  ('c0000000-0000-4000-8000-000000000006', 'd0000000-0000-4000-8000-000000000009', 'base', 1),
  ('c0000000-0000-4000-8000-000000000006', 'd0000000-0000-4000-8000-000000000041', 'base', 2),
  ('c0000000-0000-4000-8000-000000000006', 'd0000000-0000-4000-8000-000000000010', 'base', 3),
  ('c0000000-0000-4000-8000-000000000006', 'd0000000-0000-4000-8000-000000000006', 'base', 4),
  ('c0000000-0000-4000-8000-000000000015', 'd0000000-0000-4000-8000-000000000039', 'top', 0),
  ('c0000000-0000-4000-8000-000000000015', 'd0000000-0000-4000-8000-000000000024', 'top', 1),
  ('c0000000-0000-4000-8000-000000000015', 'd0000000-0000-4000-8000-000000000043', 'top', 2),
  ('c0000000-0000-4000-8000-000000000015', 'd0000000-0000-4000-8000-000000000044', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000015', 'd0000000-0000-4000-8000-000000000045', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000015', 'd0000000-0000-4000-8000-000000000046', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000015', 'd0000000-0000-4000-8000-000000000047', 'base', 0),
  ('c0000000-0000-4000-8000-000000000015', 'd0000000-0000-4000-8000-000000000009', 'base', 1),
  ('c0000000-0000-4000-8000-000000000015', 'd0000000-0000-4000-8000-000000000041', 'base', 2),
  ('c0000000-0000-4000-8000-000000000015', 'd0000000-0000-4000-8000-000000000010', 'base', 3),
  ('c0000000-0000-4000-8000-000000000015', 'd0000000-0000-4000-8000-000000000006', 'base', 4)
on conflict do nothing;

update public.set_products
set individual_price = 18
where product_id = 'c0000000-0000-4000-8000-000000000015';


-- ===== patch-acqua-di-gio-profondo.sql =====
-- Replaces Iris Quiet with Giorgio Armani Acqua di Giò Profondo.
-- Safe to re-run.

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000013', 'Giorgio Armani', 'giorgio-armani')
on conflict (slug) do nothing;

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000049', 'Lavanda', 'lavanda'),
  ('d0000000-0000-4000-8000-000000000057', 'Notas marinas', 'notas-marinas'),
  ('d0000000-0000-4000-8000-000000000058', 'Mandarina verde', 'mandarina-verde'),
  ('d0000000-0000-4000-8000-000000000059', 'Romero', 'romero'),
  ('d0000000-0000-4000-8000-000000000060', 'Lentisco', 'lentisco'),
  ('d0000000-0000-4000-8000-000000000061', 'Ámbar mineral', 'ambar-mineral'),
  ('d0000000-0000-4000-8000-000000000062', 'Madera de pachulí', 'madera-de-pachuli')
on conflict (slug) do nothing;

update public.products
set
  name = 'Acqua di Giò Profondo',
  slug = 'acqua-di-gio-profondo',
  brand_id = 'a0000000-0000-4000-8000-000000000013',
  category_id = 'b0000000-0000-4000-8000-000000000003',
  description = 'Una fragancia fresca, elegante y profundamente marina que captura la sensación del océano y la naturaleza. Acqua di Giò Profondo combina cítricos y notas marinas con un corazón aromático y un fondo amaderado, creando un aroma limpio, masculino y sofisticado, ideal para el día a día y los días cálidos.',
  gender = 'masculine',
  price = 550,
  compare_at_price = null,
  stock = 10,
  fragrance_family = array['aromático', 'cítrico', 'fresco', 'amaderado']::text[],
  occasions = array['diario', 'cita', 'fiesta', 'formal']::text[],
  intensity = 4,
  featured = true,
  bestseller = false
where id = 'c0000000-0000-4000-8000-000000000004'
   or slug in ('iris-quiet', 'acqua-di-gio-profondo');

update public.products
set
  name = 'Acqua di Giò Profondo',
  slug = 'acqua-di-gio-profondo-decant',
  brand_id = 'a0000000-0000-4000-8000-000000000013',
  category_id = 'b0000000-0000-4000-8000-000000000003',
  description = 'Una fragancia fresca, elegante y profundamente marina que captura la sensación del océano y la naturaleza. Acqua di Giò Profondo combina cítricos y notas marinas con un corazón aromático y un fondo amaderado, creando un aroma limpio, masculino y sofisticado, ideal para el día a día y los días cálidos.',
  gender = 'masculine',
  price = 52,
  compare_at_price = null,
  stock = 18,
  fragrance_family = array['aromático', 'cítrico', 'fresco', 'amaderado']::text[],
  occasions = array['diario', 'cita', 'fiesta', 'formal']::text[],
  intensity = 4,
  featured = false,
  bestseller = false
where id = 'c0000000-0000-4000-8000-000000000013'
   or slug in ('iris-quiet-decant', 'acqua-di-gio-profondo-decant');

update public.product_variants
set label = '100 ml', volume_ml = 100, price = 550, compare_at_price = null, stock = 10, sku = 'ELOVA-GIO-100'
where product_id = 'c0000000-0000-4000-8000-000000000004';

update public.product_variants
set price = 35, sku = 'ELOVA-GIO-3'
where product_id = 'c0000000-0000-4000-8000-000000000013' and volume_ml = 3;

update public.product_variants
set price = 52, sku = 'ELOVA-GIO-5'
where product_id = 'c0000000-0000-4000-8000-000000000013' and volume_ml = 5;

update public.product_variants
set price = 75, sku = 'ELOVA-GIO-10'
where product_id = 'c0000000-0000-4000-8000-000000000013' and volume_ml = 10;

update public.product_images
set url = '/images/products/product-acqua-di-gio-profondo.png', alt = 'Acqua di Giò Profondo'
where product_id = 'c0000000-0000-4000-8000-000000000004';

update public.product_images
set url = '/images/products/product-acqua-di-gio-profondo.png', alt = 'Acqua di Giò Profondo decant'
where product_id = 'c0000000-0000-4000-8000-000000000013';

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000004',
  'c0000000-0000-4000-8000-000000000013'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000004', 'd0000000-0000-4000-8000-000000000057', 'top', 0),
  ('c0000000-0000-4000-8000-000000000004', 'd0000000-0000-4000-8000-000000000058', 'top', 1),
  ('c0000000-0000-4000-8000-000000000004', 'd0000000-0000-4000-8000-000000000002', 'top', 2),
  ('c0000000-0000-4000-8000-000000000004', 'd0000000-0000-4000-8000-000000000059', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000004', 'd0000000-0000-4000-8000-000000000030', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000004', 'd0000000-0000-4000-8000-000000000049', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000004', 'd0000000-0000-4000-8000-000000000060', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000004', 'd0000000-0000-4000-8000-000000000010', 'base', 0),
  ('c0000000-0000-4000-8000-000000000004', 'd0000000-0000-4000-8000-000000000061', 'base', 1),
  ('c0000000-0000-4000-8000-000000000004', 'd0000000-0000-4000-8000-000000000062', 'base', 2),
  ('c0000000-0000-4000-8000-000000000013', 'd0000000-0000-4000-8000-000000000057', 'top', 0),
  ('c0000000-0000-4000-8000-000000000013', 'd0000000-0000-4000-8000-000000000058', 'top', 1),
  ('c0000000-0000-4000-8000-000000000013', 'd0000000-0000-4000-8000-000000000002', 'top', 2),
  ('c0000000-0000-4000-8000-000000000013', 'd0000000-0000-4000-8000-000000000059', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000013', 'd0000000-0000-4000-8000-000000000030', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000013', 'd0000000-0000-4000-8000-000000000049', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000013', 'd0000000-0000-4000-8000-000000000060', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000013', 'd0000000-0000-4000-8000-000000000010', 'base', 0),
  ('c0000000-0000-4000-8000-000000000013', 'd0000000-0000-4000-8000-000000000061', 'base', 1),
  ('c0000000-0000-4000-8000-000000000013', 'd0000000-0000-4000-8000-000000000062', 'base', 2)
on conflict do nothing;

update public.set_products
set individual_price = 52
where product_id = 'c0000000-0000-4000-8000-000000000013';


-- ===== patch-afnan-9pm-night-out.sql =====
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


-- ===== patch-le-male.sql =====
-- Replaces Salt & Cedar with Jean Paul Gaultier Le Male.
-- Adds the matching decant (product 022). Safe to re-run.

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000015', 'Jean Paul Gaultier', 'jean-paul-gaultier')
on conflict (slug) do nothing;

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000065', 'Flor de azahar', 'flor-de-azahar'),
  ('d0000000-0000-4000-8000-000000000066', 'Comino', 'comino')
on conflict (slug) do nothing;

update public.products
set
  name = 'Le Male',
  slug = 'le-male',
  brand_id = 'a0000000-0000-4000-8000-000000000015',
  category_id = 'b0000000-0000-4000-8000-000000000003',
  description = 'Un clásico masculino, sensual y elegante que combina la frescura de la menta con la suavidad de la lavanda y la calidez de la vainilla. Le Male ofrece un aroma distintivo, limpio y seductor, ideal tanto para el día a día como para ocasiones especiales.',
  gender = 'masculine',
  price = 470,
  compare_at_price = null,
  stock = 11,
  fragrance_family = array['aromático', 'ámbar', 'especiado', 'floral']::text[],
  occasions = array['diario', 'cita', 'fiesta', 'formal', 'noche']::text[],
  intensity = 4,
  featured = true,
  bestseller = false
where id = 'c0000000-0000-4000-8000-000000000007'
   or slug in ('salt-and-cedar', 'le-male');

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values (
  'c0000000-0000-4000-8000-000000000022',
  'Le Male',
  'le-male-decant',
  'a0000000-0000-4000-8000-000000000015',
  'b0000000-0000-4000-8000-000000000003',
  'Un clásico masculino, sensual y elegante que combina la frescura de la menta con la suavidad de la lavanda y la calidez de la vainilla. Le Male ofrece un aroma distintivo, limpio y seductor, ideal tanto para el día a día como para ocasiones especiales.',
  'decant',
  'masculine',
  30,
  null,
  18,
  array['aromático', 'ámbar', 'especiado', 'floral']::text[],
  array['diario', 'cita', 'fiesta', 'formal', 'noche']::text[],
  4.7,
  4,
  false,
  false,
  22,
  '2026-03-07'
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
  intensity = excluded.intensity;

update public.product_variants
set label = '120 ml', volume_ml = 120, price = 470, compare_at_price = null, stock = 11, sku = 'ELOVA-MALE-120'
where product_id = 'c0000000-0000-4000-8000-000000000007';

insert into public.product_variants (
  product_id, label, volume_ml, price, compare_at_price, stock, sku, is_full_bottle, sort_order
) values
  ('c0000000-0000-4000-8000-000000000022', '3 ml', 3, 20, null, 22, 'ELOVA-MALE-3', false, 1),
  ('c0000000-0000-4000-8000-000000000022', '5 ml', 5, 30, null, 18, 'ELOVA-MALE-5', false, 2),
  ('c0000000-0000-4000-8000-000000000022', '10 ml', 10, 48, null, 11, 'ELOVA-MALE-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml;

update public.product_images
set url = '/images/products/product-le-male.png', alt = 'Le Male'
where product_id = 'c0000000-0000-4000-8000-000000000007';

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000022', '/images/products/product-le-male.png', 'Le Male decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000007',
  'c0000000-0000-4000-8000-000000000022'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000007', 'd0000000-0000-4000-8000-000000000051', 'top', 0),
  ('c0000000-0000-4000-8000-000000000007', 'd0000000-0000-4000-8000-000000000049', 'top', 1),
  ('c0000000-0000-4000-8000-000000000007', 'd0000000-0000-4000-8000-000000000002', 'top', 2),
  ('c0000000-0000-4000-8000-000000000007', 'd0000000-0000-4000-8000-000000000024', 'top', 3),
  ('c0000000-0000-4000-8000-000000000007', 'd0000000-0000-4000-8000-000000000039', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000007', 'd0000000-0000-4000-8000-000000000065', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000007', 'd0000000-0000-4000-8000-000000000066', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000007', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000007', 'd0000000-0000-4000-8000-000000000041', 'base', 1),
  ('c0000000-0000-4000-8000-000000000007', 'd0000000-0000-4000-8000-000000000005', 'base', 2),
  ('c0000000-0000-4000-8000-000000000007', 'd0000000-0000-4000-8000-000000000023', 'base', 3),
  ('c0000000-0000-4000-8000-000000000007', 'd0000000-0000-4000-8000-000000000006', 'base', 4),
  ('c0000000-0000-4000-8000-000000000022', 'd0000000-0000-4000-8000-000000000051', 'top', 0),
  ('c0000000-0000-4000-8000-000000000022', 'd0000000-0000-4000-8000-000000000049', 'top', 1),
  ('c0000000-0000-4000-8000-000000000022', 'd0000000-0000-4000-8000-000000000002', 'top', 2),
  ('c0000000-0000-4000-8000-000000000022', 'd0000000-0000-4000-8000-000000000024', 'top', 3),
  ('c0000000-0000-4000-8000-000000000022', 'd0000000-0000-4000-8000-000000000039', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000022', 'd0000000-0000-4000-8000-000000000065', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000022', 'd0000000-0000-4000-8000-000000000066', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000022', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000022', 'd0000000-0000-4000-8000-000000000041', 'base', 1),
  ('c0000000-0000-4000-8000-000000000022', 'd0000000-0000-4000-8000-000000000005', 'base', 2),
  ('c0000000-0000-4000-8000-000000000022', 'd0000000-0000-4000-8000-000000000023', 'base', 3),
  ('c0000000-0000-4000-8000-000000000022', 'd0000000-0000-4000-8000-000000000006', 'base', 4)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000022', 3)
on conflict do nothing;


-- ===== patch-lattafa-yara.sql =====
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
  price = 140,
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
set label = '100 ml', volume_ml = 100, price = 140, compare_at_price = null, stock = 7, sku = 'ELOVA-YARA-100'
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


-- ===== patch-xerjoff-erba-pura.sql =====
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


-- ===== patch-carolina-herrera-212-vip-black.sql =====
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
    430,
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
  ('c0000000-0000-4000-8000-000000000023', '100 ml', 100, 430, null, 10, 'ELOVA-VIPB-100', true, 1),
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


-- ===== patch-liquid-brun.sql =====
-- Adds French Avenue Liquid Brun (perfume + decant).
-- Safe to re-run.

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000018', 'French Avenue', 'french-avenue')
on conflict (slug) do nothing;

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000077', 'Nuez moscada', 'nuez-moscada'),
  ('d0000000-0000-4000-8000-000000000078', 'Acordes amaderados', 'acordes-amaderados')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000025',
    'Liquid Brun',
    'liquid-brun',
    'a0000000-0000-4000-8000-000000000018',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia cálida, dulce y sofisticada, con un perfil gourmand y especiado que transmite elegancia y sensualidad. Liquid Brun destaca por su combinación de vainilla cremosa, canela y acordes amaderados, creando un aroma envolvente y adictivo, ideal para noches y climas frescos.',
    'perfume',
    'masculine',
    250,
    null,
    10,
    array['ámbar', 'gourmand', 'especiado', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    true,
    false,
    25,
    '2026-08-21'
  ),
  (
    'c0000000-0000-4000-8000-000000000026',
    'Liquid Brun',
    'liquid-brun-decant',
    'a0000000-0000-4000-8000-000000000018',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia cálida, dulce y sofisticada, con un perfil gourmand y especiado que transmite elegancia y sensualidad. Liquid Brun destaca por su combinación de vainilla cremosa, canela y acordes amaderados, creando un aroma envolvente y adictivo, ideal para noches y climas frescos.',
    'decant',
    'masculine',
    32,
    null,
    18,
    array['ámbar', 'gourmand', 'especiado', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    false,
    false,
    26,
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
  ('c0000000-0000-4000-8000-000000000025', '100 ml', 100, 250, null, 10, 'ELOVA-BRUN-100', true, 1),
  ('c0000000-0000-4000-8000-000000000026', '3 ml', 3, 22, null, 22, 'ELOVA-BRUN-3', false, 1),
  ('c0000000-0000-4000-8000-000000000026', '5 ml', 5, 32, null, 18, 'ELOVA-BRUN-5', false, 2),
  ('c0000000-0000-4000-8000-000000000026', '10 ml', 10, 38, null, 11, 'ELOVA-BRUN-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000025', '/images/products/product-liquid-brun.png', 'Liquid Brun', 0),
  ('c0000000-0000-4000-8000-000000000026', '/images/products/product-liquid-brun.png', 'Liquid Brun decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000025',
  'c0000000-0000-4000-8000-000000000026'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000025', 'd0000000-0000-4000-8000-000000000039', 'top', 0),
  ('c0000000-0000-4000-8000-000000000025', 'd0000000-0000-4000-8000-000000000024', 'top', 1),
  ('c0000000-0000-4000-8000-000000000025', 'd0000000-0000-4000-8000-000000000077', 'top', 2),
  ('c0000000-0000-4000-8000-000000000025', 'd0000000-0000-4000-8000-000000000078', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000025', 'd0000000-0000-4000-8000-000000000044', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000025', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000025', 'd0000000-0000-4000-8000-000000000006', 'base', 1),
  ('c0000000-0000-4000-8000-000000000025', 'd0000000-0000-4000-8000-000000000010', 'base', 2),
  ('c0000000-0000-4000-8000-000000000026', 'd0000000-0000-4000-8000-000000000039', 'top', 0),
  ('c0000000-0000-4000-8000-000000000026', 'd0000000-0000-4000-8000-000000000024', 'top', 1),
  ('c0000000-0000-4000-8000-000000000026', 'd0000000-0000-4000-8000-000000000077', 'top', 2),
  ('c0000000-0000-4000-8000-000000000026', 'd0000000-0000-4000-8000-000000000078', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000026', 'd0000000-0000-4000-8000-000000000044', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000026', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000026', 'd0000000-0000-4000-8000-000000000006', 'base', 1),
  ('c0000000-0000-4000-8000-000000000026', 'd0000000-0000-4000-8000-000000000010', 'base', 2)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000025', 12),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000026', 13),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000025', 8),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000026', 9)
on conflict do nothing;


-- ===== patch-al-haramain-amber-oud-gold.sql =====
-- Adds Al Haramain Amber Oud Gold Edition (perfume + decant).
-- Safe to re-run.

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000019', 'Al Haramain', 'al-haramain')
on conflict (slug) do nothing;

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000079', 'Acordes verdes', 'acordes-verdes'),
  ('d0000000-0000-4000-8000-000000000080', 'Melón', 'melon'),
  ('d0000000-0000-4000-8000-000000000081', 'Piña', 'pina')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000027',
    'Amber Oud Gold Edition',
    'amber-oud-gold-edition',
    'a0000000-0000-4000-8000-000000000019',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia lujosa, dulce y vibrante con un marcado carácter frutal. Amber Oud Gold Edition combina frutas exóticas y cítricos con una base cálida de vainilla, ámbar y almizcle, creando un aroma elegante, llamativo y de gran presencia. Su perfil unisex la hace versátil para cualquier ocasión.',
    'perfume',
    'unisex',
    260,
    null,
    10,
    array['frutal', 'cítrico', 'ámbar', 'almizclado', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    true,
    false,
    27,
    '2026-08-21'
  ),
  (
    'c0000000-0000-4000-8000-000000000028',
    'Amber Oud Gold Edition',
    'amber-oud-gold-edition-decant',
    'a0000000-0000-4000-8000-000000000019',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia lujosa, dulce y vibrante con un marcado carácter frutal. Amber Oud Gold Edition combina frutas exóticas y cítricos con una base cálida de vainilla, ámbar y almizcle, creando un aroma elegante, llamativo y de gran presencia. Su perfil unisex la hace versátil para cualquier ocasión.',
    'decant',
    'unisex',
    35,
    null,
    18,
    array['frutal', 'cítrico', 'ámbar', 'almizclado', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    false,
    false,
    28,
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
  ('c0000000-0000-4000-8000-000000000027', '120 ml', 120, 260, null, 10, 'ELOVA-AOUD-120', true, 1),
  ('c0000000-0000-4000-8000-000000000028', '3 ml', 3, 25, null, 22, 'ELOVA-AOUD-3', false, 1),
  ('c0000000-0000-4000-8000-000000000028', '5 ml', 5, 35, null, 18, 'ELOVA-AOUD-5', false, 2),
  ('c0000000-0000-4000-8000-000000000028', '10 ml', 10, 45, null, 11, 'ELOVA-AOUD-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000027', '/images/products/product-amber-oud-gold.png', 'Amber Oud Gold Edition', 0),
  ('c0000000-0000-4000-8000-000000000028', '/images/products/product-amber-oud-gold.png', 'Amber Oud Gold Edition decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000027',
  'c0000000-0000-4000-8000-000000000028'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000027', 'd0000000-0000-4000-8000-000000000002', 'top', 0),
  ('c0000000-0000-4000-8000-000000000027', 'd0000000-0000-4000-8000-000000000079', 'top', 1),
  ('c0000000-0000-4000-8000-000000000027', 'd0000000-0000-4000-8000-000000000080', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000027', 'd0000000-0000-4000-8000-000000000081', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000027', 'd0000000-0000-4000-8000-000000000006', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000027', 'd0000000-0000-4000-8000-000000000009', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000027', 'd0000000-0000-4000-8000-000000000010', 'base', 0),
  ('c0000000-0000-4000-8000-000000000027', 'd0000000-0000-4000-8000-000000000064', 'base', 1),
  ('c0000000-0000-4000-8000-000000000027', 'd0000000-0000-4000-8000-000000000009', 'base', 2),
  ('c0000000-0000-4000-8000-000000000028', 'd0000000-0000-4000-8000-000000000002', 'top', 0),
  ('c0000000-0000-4000-8000-000000000028', 'd0000000-0000-4000-8000-000000000079', 'top', 1),
  ('c0000000-0000-4000-8000-000000000028', 'd0000000-0000-4000-8000-000000000080', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000028', 'd0000000-0000-4000-8000-000000000081', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000028', 'd0000000-0000-4000-8000-000000000006', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000028', 'd0000000-0000-4000-8000-000000000009', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000028', 'd0000000-0000-4000-8000-000000000010', 'base', 0),
  ('c0000000-0000-4000-8000-000000000028', 'd0000000-0000-4000-8000-000000000064', 'base', 1),
  ('c0000000-0000-4000-8000-000000000028', 'd0000000-0000-4000-8000-000000000009', 'base', 2)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000027', 4),
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000028', 5),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000027', 14),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000028', 15),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000027', 10),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000028', 11)
on conflict do nothing;


-- ===== patch-xerjoff-naxos.sql =====
-- Adds Xerjoff Naxos (perfume + decant).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000082', 'Miel', 'miel'),
  ('d0000000-0000-4000-8000-000000000083', 'Jazmín', 'jazmin'),
  ('d0000000-0000-4000-8000-000000000084', 'Cashmeran', 'cashmeran'),
  ('d0000000-0000-4000-8000-000000000085', 'Tabaco', 'tabaco')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000029',
    'Naxos',
    'naxos',
    'a0000000-0000-4000-8000-000000000016',
    'b0000000-0000-4000-8000-000000000001',
    'Una fragancia lujosa, cálida y sofisticada que combina cítricos frescos con lavanda, miel y tabaco. Naxos destaca por su carácter dulce, elegante y envolvente, con una excelente presencia y un fondo cálido de vainilla y haba tonka. Una opción refinada y memorable, perfecta para destacar en ocasiones especiales.',
    'perfume',
    'unisex',
    970,
    null,
    10,
    array['aromático', 'ámbar', 'cítrico', 'floral', 'gourmand']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    true,
    false,
    29,
    '2026-08-25'
  ),
  (
    'c0000000-0000-4000-8000-000000000030',
    'Naxos',
    'naxos-decant',
    'a0000000-0000-4000-8000-000000000016',
    'b0000000-0000-4000-8000-000000000001',
    'Una fragancia lujosa, cálida y sofisticada que combina cítricos frescos con lavanda, miel y tabaco. Naxos destaca por su carácter dulce, elegante y envolvente, con una excelente presencia y un fondo cálido de vainilla y haba tonka. Una opción refinada y memorable, perfecta para destacar en ocasiones especiales.',
    'decant',
    'unisex',
    63,
    null,
    18,
    array['aromático', 'ámbar', 'cítrico', 'floral', 'gourmand']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    false,
    false,
    30,
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
  ('c0000000-0000-4000-8000-000000000029', '100 ml', 100, 970, null, 10, 'ELOVA-NAXOS-100', true, 1),
  ('c0000000-0000-4000-8000-000000000030', '3 ml', 3, 35, null, 22, 'ELOVA-NAXOS-3', false, 1),
  ('c0000000-0000-4000-8000-000000000030', '5 ml', 5, 63, null, 18, 'ELOVA-NAXOS-5', false, 2),
  ('c0000000-0000-4000-8000-000000000030', '10 ml', 10, 115, null, 11, 'ELOVA-NAXOS-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000029', '/images/products/product-naxos.png', 'Naxos', 0),
  ('c0000000-0000-4000-8000-000000000030', '/images/products/product-naxos.png', 'Naxos decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000029',
  'c0000000-0000-4000-8000-000000000030'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000019', 'top', 0),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000002', 'top', 1),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000049', 'top', 2),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000082', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000039', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000083', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000084', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000085', 'base', 0),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000009', 'base', 1),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000041', 'base', 2),
  ('c0000000-0000-4000-8000-000000000029', 'd0000000-0000-4000-8000-000000000010', 'base', 3),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000019', 'top', 0),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000002', 'top', 1),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000049', 'top', 2),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000082', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000039', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000083', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000084', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000085', 'base', 0),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000009', 'base', 1),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000041', 'base', 2),
  ('c0000000-0000-4000-8000-000000000030', 'd0000000-0000-4000-8000-000000000010', 'base', 3)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000029', 6),
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000030', 7),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000029', 16),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000030', 17),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000029', 12),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000030', 13),
  ('aa000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000029', 4),
  ('aa000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000030', 5)
on conflict do nothing;


-- ===== patch-stronger-with-you-absolutely.sql =====
-- Adds Emporio Armani Stronger With You Absolutely (perfume + decant).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000086', 'Ron', 'ron'),
  ('d0000000-0000-4000-8000-000000000087', 'Elemi', 'elemi'),
  ('d0000000-0000-4000-8000-000000000088', 'Castaña', 'castana'),
  ('d0000000-0000-4000-8000-000000000089', 'Davana', 'davana')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000031',
    'Stronger With You Absolutely',
    'stronger-with-you-absolutely',
    'a0000000-0000-4000-8000-000000000010',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina, cálida y seductora, con un perfil dulce y profundo. Stronger With You Absolutely combina ron, castaña y vainilla con un fondo amaderado y ahumado, creando un aroma intenso, elegante y envolvente. Ideal para noches, citas y ocasiones especiales.',
    'perfume',
    'masculine',
    535,
    null,
    10,
    array['ámbar', 'gourmand', 'aromático', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    true,
    false,
    31,
    '2026-08-25'
  ),
  (
    'c0000000-0000-4000-8000-000000000032',
    'Stronger With You Absolutely',
    'stronger-with-you-absolutely-decant',
    'a0000000-0000-4000-8000-000000000010',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina, cálida y seductora, con un perfil dulce y profundo. Stronger With You Absolutely combina ron, castaña y vainilla con un fondo amaderado y ahumado, creando un aroma intenso, elegante y envolvente. Ideal para noches, citas y ocasiones especiales.',
    'decant',
    'masculine',
    37,
    null,
    18,
    array['ámbar', 'gourmand', 'aromático', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    false,
    false,
    32,
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
  ('c0000000-0000-4000-8000-000000000031', '100 ml', 100, 535, null, 10, 'ELOVA-SWYA-100', true, 1),
  ('c0000000-0000-4000-8000-000000000032', '3 ml', 3, 25, null, 22, 'ELOVA-SWYA-3', false, 1),
  ('c0000000-0000-4000-8000-000000000032', '5 ml', 5, 37, null, 18, 'ELOVA-SWYA-5', false, 2),
  ('c0000000-0000-4000-8000-000000000032', '10 ml', 10, 65, null, 11, 'ELOVA-SWYA-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000031', '/images/products/product-stronger-with-you-absolutely.png', 'Stronger With You Absolutely', 0),
  ('c0000000-0000-4000-8000-000000000032', '/images/products/product-stronger-with-you-absolutely.png', 'Stronger With You Absolutely decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000031',
  'c0000000-0000-4000-8000-000000000032'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000031', 'd0000000-0000-4000-8000-000000000086', 'top', 0),
  ('c0000000-0000-4000-8000-000000000031', 'd0000000-0000-4000-8000-000000000087', 'top', 1),
  ('c0000000-0000-4000-8000-000000000031', 'd0000000-0000-4000-8000-000000000088', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000031', 'd0000000-0000-4000-8000-000000000049', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000031', 'd0000000-0000-4000-8000-000000000089', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000031', 'd0000000-0000-4000-8000-000000000072', 'base', 0),
  ('c0000000-0000-4000-8000-000000000031', 'd0000000-0000-4000-8000-000000000023', 'base', 1),
  ('c0000000-0000-4000-8000-000000000031', 'd0000000-0000-4000-8000-000000000052', 'base', 2),
  ('c0000000-0000-4000-8000-000000000032', 'd0000000-0000-4000-8000-000000000086', 'top', 0),
  ('c0000000-0000-4000-8000-000000000032', 'd0000000-0000-4000-8000-000000000087', 'top', 1),
  ('c0000000-0000-4000-8000-000000000032', 'd0000000-0000-4000-8000-000000000088', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000032', 'd0000000-0000-4000-8000-000000000049', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000032', 'd0000000-0000-4000-8000-000000000089', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000032', 'd0000000-0000-4000-8000-000000000072', 'base', 0),
  ('c0000000-0000-4000-8000-000000000032', 'd0000000-0000-4000-8000-000000000023', 'base', 1),
  ('c0000000-0000-4000-8000-000000000032', 'd0000000-0000-4000-8000-000000000052', 'base', 2)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000031', 18),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000032', 19),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000031', 14),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000032', 15)
on conflict do nothing;


-- ===== patch-valentino-born-in-roma-extradose.sql =====
-- Adds Valentino Born in Roma Extradose (perfume + decant).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000090', 'Acordes especiados', 'acordes-especiados'),
  ('d0000000-0000-4000-8000-000000000091', 'Notas aromáticas', 'notas-aromaticas'),
  ('d0000000-0000-4000-8000-000000000092', 'Acordes florales', 'acordes-florales')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000033',
    'Born in Roma Extradose',
    'born-in-roma-extradose',
    'a0000000-0000-4000-8000-000000000009',
    'b0000000-0000-4000-8000-000000000003',
    'Una interpretación más intensa y profunda de la línea Born in Roma, con un carácter moderno, seductor y sofisticado. Born in Roma Extradose combina acordes aromáticos y especiados con una base cálida y amaderada, creando una fragancia de gran presencia, ideal para destacar especialmente durante la noche.',
    'perfume',
    'masculine',
    670,
    null,
    10,
    array['ámbar', 'aromático', 'amaderado', 'especiado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    true,
    false,
    33,
    '2026-08-25'
  ),
  (
    'c0000000-0000-4000-8000-000000000034',
    'Born in Roma Extradose',
    'born-in-roma-extradose-decant',
    'a0000000-0000-4000-8000-000000000009',
    'b0000000-0000-4000-8000-000000000003',
    'Una interpretación más intensa y profunda de la línea Born in Roma, con un carácter moderno, seductor y sofisticado. Born in Roma Extradose combina acordes aromáticos y especiados con una base cálida y amaderada, creando una fragancia de gran presencia, ideal para destacar especialmente durante la noche.',
    'decant',
    'masculine',
    45,
    null,
    18,
    array['ámbar', 'aromático', 'amaderado', 'especiado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    false,
    false,
    34,
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
  ('c0000000-0000-4000-8000-000000000033', '100 ml', 100, 670, null, 10, 'ELOVA-BIREX-100', true, 1),
  ('c0000000-0000-4000-8000-000000000034', '3 ml', 3, 30, null, 22, 'ELOVA-BIREX-3', false, 1),
  ('c0000000-0000-4000-8000-000000000034', '5 ml', 5, 45, null, 18, 'ELOVA-BIREX-5', false, 2),
  ('c0000000-0000-4000-8000-000000000034', '10 ml', 10, 78, null, 11, 'ELOVA-BIREX-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000033', '/images/products/product-born-in-roma-extradose.png', 'Born in Roma Extradose', 0),
  ('c0000000-0000-4000-8000-000000000034', '/images/products/product-born-in-roma-extradose.png', 'Born in Roma Extradose decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000033',
  'c0000000-0000-4000-8000-000000000034'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000033', 'd0000000-0000-4000-8000-000000000090', 'top', 0),
  ('c0000000-0000-4000-8000-000000000033', 'd0000000-0000-4000-8000-000000000091', 'top', 1),
  ('c0000000-0000-4000-8000-000000000033', 'd0000000-0000-4000-8000-000000000049', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000033', 'd0000000-0000-4000-8000-000000000092', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000033', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000033', 'd0000000-0000-4000-8000-000000000064', 'base', 1),
  ('c0000000-0000-4000-8000-000000000033', 'd0000000-0000-4000-8000-000000000006', 'base', 2),
  ('c0000000-0000-4000-8000-000000000034', 'd0000000-0000-4000-8000-000000000090', 'top', 0),
  ('c0000000-0000-4000-8000-000000000034', 'd0000000-0000-4000-8000-000000000091', 'top', 1),
  ('c0000000-0000-4000-8000-000000000034', 'd0000000-0000-4000-8000-000000000049', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000034', 'd0000000-0000-4000-8000-000000000092', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000034', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000034', 'd0000000-0000-4000-8000-000000000064', 'base', 1),
  ('c0000000-0000-4000-8000-000000000034', 'd0000000-0000-4000-8000-000000000006', 'base', 2)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000033', 20),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000034', 21),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000033', 16),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000034', 17)
on conflict do nothing;


-- ===== patch-valentino-born-in-roma-coral-fantasy.sql =====
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


-- ===== patch-le-beau-le-parfum.sql =====
-- Adds Jean Paul Gaultier Le Beau Le Parfum (perfume + decant).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000094', 'Coco', 'coco')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000037',
    'Le Beau Le Parfum',
    'le-beau-le-parfum',
    'a0000000-0000-4000-8000-000000000015',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina intensa, dulce y seductora, con un carácter tropical y envolvente. Le Beau Le Parfum combina coco, piña y haba tonka con un fondo cálido y amaderado, creando un aroma sensual, sofisticado y de gran presencia.',
    'perfume',
    'masculine',
    560,
    null,
    10,
    array['ámbar', 'amaderado', 'gourmand', 'oriental']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    true,
    false,
    37,
    '2026-08-25'
  ),
  (
    'c0000000-0000-4000-8000-000000000038',
    'Le Beau Le Parfum',
    'le-beau-le-parfum-decant',
    'a0000000-0000-4000-8000-000000000015',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina intensa, dulce y seductora, con un carácter tropical y envolvente. Le Beau Le Parfum combina coco, piña y haba tonka con un fondo cálido y amaderado, creando un aroma sensual, sofisticado y de gran presencia.',
    'decant',
    'masculine',
    35,
    null,
    18,
    array['ámbar', 'amaderado', 'gourmand', 'oriental']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    false,
    false,
    38,
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
  ('c0000000-0000-4000-8000-000000000037', '125 ml', 125, 560, null, 10, 'ELOVA-LEBEAU-125', true, 1),
  ('c0000000-0000-4000-8000-000000000038', '3 ml', 3, 24, null, 22, 'ELOVA-LEBEAU-3', false, 1),
  ('c0000000-0000-4000-8000-000000000038', '5 ml', 5, 35, null, 18, 'ELOVA-LEBEAU-5', false, 2),
  ('c0000000-0000-4000-8000-000000000038', '10 ml', 10, 58, null, 11, 'ELOVA-LEBEAU-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000037', '/images/products/product-le-beau-le-parfum.png', 'Le Beau Le Parfum', 0),
  ('c0000000-0000-4000-8000-000000000038', '/images/products/product-le-beau-le-parfum.png', 'Le Beau Le Parfum decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000037',
  'c0000000-0000-4000-8000-000000000038'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000037', 'd0000000-0000-4000-8000-000000000081', 'top', 0),
  ('c0000000-0000-4000-8000-000000000037', 'd0000000-0000-4000-8000-000000000094', 'top', 1),
  ('c0000000-0000-4000-8000-000000000037', 'd0000000-0000-4000-8000-000000000043', 'top', 2),
  ('c0000000-0000-4000-8000-000000000037', 'd0000000-0000-4000-8000-000000000094', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000037', 'd0000000-0000-4000-8000-000000000016', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000037', 'd0000000-0000-4000-8000-000000000041', 'base', 0),
  ('c0000000-0000-4000-8000-000000000037', 'd0000000-0000-4000-8000-000000000005', 'base', 1),
  ('c0000000-0000-4000-8000-000000000037', 'd0000000-0000-4000-8000-000000000006', 'base', 2),
  ('c0000000-0000-4000-8000-000000000038', 'd0000000-0000-4000-8000-000000000081', 'top', 0),
  ('c0000000-0000-4000-8000-000000000038', 'd0000000-0000-4000-8000-000000000094', 'top', 1),
  ('c0000000-0000-4000-8000-000000000038', 'd0000000-0000-4000-8000-000000000043', 'top', 2),
  ('c0000000-0000-4000-8000-000000000038', 'd0000000-0000-4000-8000-000000000094', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000038', 'd0000000-0000-4000-8000-000000000016', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000038', 'd0000000-0000-4000-8000-000000000041', 'base', 0),
  ('c0000000-0000-4000-8000-000000000038', 'd0000000-0000-4000-8000-000000000005', 'base', 1),
  ('c0000000-0000-4000-8000-000000000038', 'd0000000-0000-4000-8000-000000000006', 'base', 2)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000037', 24),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000038', 25),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000037', 20),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000038', 21)
on conflict do nothing;


-- ===== patch-le-male-elixir.sql =====
-- Adds Jean Paul Gaultier Le Male Elixir (perfume + decant).
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000095', 'Benjuí', 'benjui'),
  ('d0000000-0000-4000-8000-000000000096', 'Opopónaco', 'opoponaco')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000039',
    'Le Male Elixir',
    'le-male-elixir',
    'a0000000-0000-4000-8000-000000000015',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia intensa, cálida y seductora que lleva el ADN de Le Male a un nivel más profundo y opulento. Le Male Elixir combina miel, tabaco y vainilla con un fondo amaderado, creando un aroma dulce, masculino y envolvente, perfecto para destacar durante la noche.',
    'perfume',
    'masculine',
    541,
    null,
    10,
    array['ámbar', 'gourmand', 'aromático', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    true,
    false,
    39,
    '2026-08-25'
  ),
  (
    'c0000000-0000-4000-8000-000000000040',
    'Le Male Elixir',
    'le-male-elixir-decant',
    'a0000000-0000-4000-8000-000000000015',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia intensa, cálida y seductora que lleva el ADN de Le Male a un nivel más profundo y opulento. Le Male Elixir combina miel, tabaco y vainilla con un fondo amaderado, creando un aroma dulce, masculino y envolvente, perfecto para destacar durante la noche.',
    'decant',
    'masculine',
    34,
    null,
    18,
    array['ámbar', 'gourmand', 'aromático', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    false,
    false,
    40,
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
  ('c0000000-0000-4000-8000-000000000039', '125 ml', 125, 541, null, 10, 'ELOVA-ELIXIR-125', true, 1),
  ('c0000000-0000-4000-8000-000000000040', '3 ml', 3, 23, null, 22, 'ELOVA-ELIXIR-3', false, 1),
  ('c0000000-0000-4000-8000-000000000040', '5 ml', 5, 34, null, 18, 'ELOVA-ELIXIR-5', false, 2),
  ('c0000000-0000-4000-8000-000000000040', '10 ml', 10, 56, null, 11, 'ELOVA-ELIXIR-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000039', '/images/products/product-le-male-elixir.png', 'Le Male Elixir', 0),
  ('c0000000-0000-4000-8000-000000000040', '/images/products/product-le-male-elixir.png', 'Le Male Elixir decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000039',
  'c0000000-0000-4000-8000-000000000040'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000039', 'd0000000-0000-4000-8000-000000000049', 'top', 0),
  ('c0000000-0000-4000-8000-000000000039', 'd0000000-0000-4000-8000-000000000051', 'top', 1),
  ('c0000000-0000-4000-8000-000000000039', 'd0000000-0000-4000-8000-000000000095', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000039', 'd0000000-0000-4000-8000-000000000009', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000039', 'd0000000-0000-4000-8000-000000000082', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000039', 'd0000000-0000-4000-8000-000000000085', 'base', 0),
  ('c0000000-0000-4000-8000-000000000039', 'd0000000-0000-4000-8000-000000000041', 'base', 1),
  ('c0000000-0000-4000-8000-000000000039', 'd0000000-0000-4000-8000-000000000096', 'base', 2),
  ('c0000000-0000-4000-8000-000000000040', 'd0000000-0000-4000-8000-000000000049', 'top', 0),
  ('c0000000-0000-4000-8000-000000000040', 'd0000000-0000-4000-8000-000000000051', 'top', 1),
  ('c0000000-0000-4000-8000-000000000040', 'd0000000-0000-4000-8000-000000000095', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000040', 'd0000000-0000-4000-8000-000000000009', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000040', 'd0000000-0000-4000-8000-000000000082', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000040', 'd0000000-0000-4000-8000-000000000085', 'base', 0),
  ('c0000000-0000-4000-8000-000000000040', 'd0000000-0000-4000-8000-000000000041', 'base', 1),
  ('c0000000-0000-4000-8000-000000000040', 'd0000000-0000-4000-8000-000000000096', 'base', 2)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000039', 26),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000040', 27),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000039', 22),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000040', 23)
on conflict do nothing;

-- Adds Armaf Odyssey Mandarin Sky (perfume + decant).
insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000097', 'Naranja', 'naranja'),
  ('d0000000-0000-4000-8000-000000000098', 'Caramelo', 'caramelo'),
  ('d0000000-0000-4000-8000-000000000099', 'Cumarina', 'cumarina'),
  ('d0000000-0000-4000-8000-000000000100', 'Ambroxan', 'ambroxan')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000041',
    'Odyssey Mandarin Sky',
    'odyssey-mandarin-sky',
    'a0000000-0000-4000-8000-000000000012',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia masculina dulce, cítrica y moderna que combina la frescura de la mandarina con un corazón gourmand y un fondo cálido y amaderado. Odyssey Mandarin Sky ofrece un aroma llamativo, juvenil y seductor, ideal para el día a día, citas y salidas nocturnas.',
    'perfume',
    'masculine',
    160,
    null,
    10,
    array['cítrico', 'frutal', 'ámbar', 'gourmand', 'amaderado']::text[],
    array['diario', 'cita', 'fiesta', 'noche']::text[],
    4.6,
    4,
    true,
    false,
    41,
    '2026-08-26'
  ),
  (
    'c0000000-0000-4000-8000-000000000042',
    'Odyssey Mandarin Sky',
    'odyssey-mandarin-sky-decant',
    'a0000000-0000-4000-8000-000000000012',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia masculina dulce, cítrica y moderna que combina la frescura de la mandarina con un corazón gourmand y un fondo cálido y amaderado. Odyssey Mandarin Sky ofrece un aroma llamativo, juvenil y seductor, ideal para el día a día, citas y salidas nocturnas.',
    'decant',
    'masculine',
    18,
    null,
    18,
    array['cítrico', 'frutal', 'ámbar', 'gourmand', 'amaderado']::text[],
    array['diario', 'cita', 'fiesta', 'noche']::text[],
    4.6,
    4,
    false,
    false,
    42,
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
  ('c0000000-0000-4000-8000-000000000041', '100 ml', 100, 160, null, 10, 'ELOVA-MANDARIN-100', true, 1),
  ('c0000000-0000-4000-8000-000000000042', '3 ml', 3, 15, null, 22, 'ELOVA-MANDARIN-3', false, 1),
  ('c0000000-0000-4000-8000-000000000042', '5 ml', 5, 18, null, 18, 'ELOVA-MANDARIN-5', false, 2),
  ('c0000000-0000-4000-8000-000000000042', '10 ml', 10, 24, null, 11, 'ELOVA-MANDARIN-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000041', '/images/products/product-odyssey-mandarin-sky.png', 'Odyssey Mandarin Sky', 0),
  ('c0000000-0000-4000-8000-000000000042', '/images/products/product-odyssey-mandarin-sky.png', 'Odyssey Mandarin Sky decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000041',
  'c0000000-0000-4000-8000-000000000042'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000041', 'd0000000-0000-4000-8000-000000000048', 'top', 0),
  ('c0000000-0000-4000-8000-000000000041', 'd0000000-0000-4000-8000-000000000097', 'top', 1),
  ('c0000000-0000-4000-8000-000000000041', 'd0000000-0000-4000-8000-000000000011', 'top', 2),
  ('c0000000-0000-4000-8000-000000000041', 'd0000000-0000-4000-8000-000000000098', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000041', 'd0000000-0000-4000-8000-000000000041', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000041', 'd0000000-0000-4000-8000-000000000099', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000041', 'd0000000-0000-4000-8000-000000000028', 'base', 0),
  ('c0000000-0000-4000-8000-000000000041', 'd0000000-0000-4000-8000-000000000023', 'base', 1),
  ('c0000000-0000-4000-8000-000000000041', 'd0000000-0000-4000-8000-000000000100', 'base', 2),
  ('c0000000-0000-4000-8000-000000000042', 'd0000000-0000-4000-8000-000000000048', 'top', 0),
  ('c0000000-0000-4000-8000-000000000042', 'd0000000-0000-4000-8000-000000000097', 'top', 1),
  ('c0000000-0000-4000-8000-000000000042', 'd0000000-0000-4000-8000-000000000011', 'top', 2),
  ('c0000000-0000-4000-8000-000000000042', 'd0000000-0000-4000-8000-000000000098', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000042', 'd0000000-0000-4000-8000-000000000041', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000042', 'd0000000-0000-4000-8000-000000000099', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000042', 'd0000000-0000-4000-8000-000000000028', 'base', 0),
  ('c0000000-0000-4000-8000-000000000042', 'd0000000-0000-4000-8000-000000000023', 'base', 1),
  ('c0000000-0000-4000-8000-000000000042', 'd0000000-0000-4000-8000-000000000100', 'base', 2)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000041', 8),
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000042', 9),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000041', 28),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000042', 29),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000041', 24),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000042', 25)
on conflict do nothing;

-- Adds Lattafa Khamrah (perfume + decant).
insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000101', 'Dátiles', 'datiles'),
  ('d0000000-0000-4000-8000-000000000102', 'Nardos', 'nardos'),
  ('d0000000-0000-4000-8000-000000000103', 'Mahonial', 'mahonial'),
  ('d0000000-0000-4000-8000-000000000104', 'Mirra', 'mirra'),
  ('d0000000-0000-4000-8000-000000000105', 'Akigalawood', 'akigalawood')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000043',
    'Khamrah',
    'khamrah',
    'a0000000-0000-4000-8000-000000000011',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia dulce, cálida y envolvente con un marcado carácter gourmand. Khamrah combina especias aromáticas con canela, dátiles y praliné, creando un aroma seductor y adictivo que destaca especialmente durante la noche y en climas frescos.',
    'perfume',
    'unisex',
    155,
    null,
    10,
    array['ámbar', 'gourmand', 'especiado', 'oriental']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    true,
    false,
    43,
    '2026-08-26'
  ),
  (
    'c0000000-0000-4000-8000-000000000044',
    'Khamrah',
    'khamrah-decant',
    'a0000000-0000-4000-8000-000000000011',
    'b0000000-0000-4000-8000-000000000002',
    'Una fragancia dulce, cálida y envolvente con un marcado carácter gourmand. Khamrah combina especias aromáticas con canela, dátiles y praliné, creando un aroma seductor y adictivo que destaca especialmente durante la noche y en climas frescos.',
    'decant',
    'unisex',
    32,
    null,
    18,
    array['ámbar', 'gourmand', 'especiado', 'oriental']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.8,
    5,
    false,
    false,
    44,
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
  ('c0000000-0000-4000-8000-000000000043', '100 ml', 100, 155, null, 10, 'ELOVA-KHAMRAH-100', true, 1),
  ('c0000000-0000-4000-8000-000000000044', '3 ml', 3, 23, null, 22, 'ELOVA-KHAMRAH-3', false, 1),
  ('c0000000-0000-4000-8000-000000000044', '5 ml', 5, 32, null, 18, 'ELOVA-KHAMRAH-5', false, 2),
  ('c0000000-0000-4000-8000-000000000044', '10 ml', 10, 45, null, 11, 'ELOVA-KHAMRAH-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000043', '/images/products/product-khamrah.png', 'Khamrah', 0),
  ('c0000000-0000-4000-8000-000000000044', '/images/products/product-khamrah.png', 'Khamrah decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000043',
  'c0000000-0000-4000-8000-000000000044'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000039', 'top', 0),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000077', 'top', 1),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000002', 'top', 2),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000101', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000044', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000102', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000103', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000041', 'base', 1),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000104', 'base', 2),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000006', 'base', 3),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000095', 'base', 4),
  ('c0000000-0000-4000-8000-000000000043', 'd0000000-0000-4000-8000-000000000105', 'base', 5),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000039', 'top', 0),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000077', 'top', 1),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000002', 'top', 2),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000101', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000044', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000102', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000103', 'heart', 3),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000009', 'base', 0),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000041', 'base', 1),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000104', 'base', 2),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000006', 'base', 3),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000095', 'base', 4),
  ('c0000000-0000-4000-8000-000000000044', 'd0000000-0000-4000-8000-000000000105', 'base', 5)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000043', 30),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000044', 31),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000043', 26),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000044', 27)
on conflict do nothing;


