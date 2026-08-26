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
  price = 370,
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
set label = '100 ml', volume_ml = 100, price = 370, compare_at_price = null, stock = 10, sku = 'ELOVA-GIO-100'
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
