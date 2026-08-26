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
  price = 32,
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
set price = 22, sku = 'ELOVA-QAHWA-3'
where product_id = 'c0000000-0000-4000-8000-000000000015' and volume_ml = 3;

update public.product_variants
set price = 32, sku = 'ELOVA-QAHWA-5'
where product_id = 'c0000000-0000-4000-8000-000000000015' and volume_ml = 5;

update public.product_variants
set price = 50, sku = 'ELOVA-QAHWA-10'
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
set individual_price = 32
where product_id = 'c0000000-0000-4000-8000-000000000015';
