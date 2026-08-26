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
