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
