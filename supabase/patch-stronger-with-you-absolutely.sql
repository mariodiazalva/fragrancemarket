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
