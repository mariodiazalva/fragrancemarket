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
