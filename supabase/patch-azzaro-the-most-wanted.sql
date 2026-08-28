-- Adds Azzaro The Most Wanted (perfume + decant). Distinct from The Most Wanted Parfum.
-- Safe to re-run.

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000123', 'Acordes ambarados', 'acordes-ambarados')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000069',
    'The Most Wanted',
    'the-most-wanted',
    'a0000000-0000-4000-8000-000000000022',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina intensa, dulce y seductora, con un carácter moderno y sofisticado. The Most Wanted combina un acorde especiado y cálido con un corazón dulce y un fondo amaderado, creando un aroma envolvente y llamativo, perfecto para destacar durante la noche y en ocasiones especiales.',
    'perfume',
    'masculine',
    393,
    null,
    10,
    array['ámbar', 'gourmand', 'especiado', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    true,
    false,
    69,
    '2026-08-28'
  ),
  (
    'c0000000-0000-4000-8000-000000000070',
    'The Most Wanted',
    'the-most-wanted-decant',
    'a0000000-0000-4000-8000-000000000022',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina intensa, dulce y seductora, con un carácter moderno y sofisticado. The Most Wanted combina un acorde especiado y cálido con un corazón dulce y un fondo amaderado, creando un aroma envolvente y llamativo, perfecto para destacar durante la noche y en ocasiones especiales.',
    'decant',
    'masculine',
    30,
    null,
    18,
    array['ámbar', 'gourmand', 'especiado', 'amaderado']::text[],
    array['cita', 'diario', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    false,
    false,
    70,
    '2026-08-28'
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
  ('c0000000-0000-4000-8000-000000000069', '100 ml', 100, 393, null, 10, 'ELOVA-THE-MOST-WANTED-100', true, 1),
  ('c0000000-0000-4000-8000-000000000070', '3 ml', 3, 22, null, 22, 'ELOVA-THE-MOST-WANTED-3', false, 1),
  ('c0000000-0000-4000-8000-000000000070', '5 ml', 5, 30, null, 18, 'ELOVA-THE-MOST-WANTED-5', false, 2),
  ('c0000000-0000-4000-8000-000000000070', '10 ml', 10, 49, null, 11, 'ELOVA-THE-MOST-WANTED-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000069', '/images/products/product-the-most-wanted.jpg', 'The Most Wanted', 0),
  ('c0000000-0000-4000-8000-000000000070', '/images/products/product-the-most-wanted.jpg', 'The Most Wanted decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000069',
  'c0000000-0000-4000-8000-000000000070'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000069', 'd0000000-0000-4000-8000-000000000024', 'top', 0),
  ('c0000000-0000-4000-8000-000000000069', 'd0000000-0000-4000-8000-000000000038', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000069', 'd0000000-0000-4000-8000-000000000123', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000069', 'd0000000-0000-4000-8000-000000000006', 'base', 0),
  ('c0000000-0000-4000-8000-000000000069', 'd0000000-0000-4000-8000-000000000064', 'base', 1),
  ('c0000000-0000-4000-8000-000000000070', 'd0000000-0000-4000-8000-000000000024', 'top', 0),
  ('c0000000-0000-4000-8000-000000000070', 'd0000000-0000-4000-8000-000000000038', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000070', 'd0000000-0000-4000-8000-000000000123', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000070', 'd0000000-0000-4000-8000-000000000006', 'base', 0),
  ('c0000000-0000-4000-8000-000000000070', 'd0000000-0000-4000-8000-000000000064', 'base', 1)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000069', 56),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000070', 57),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000069', 48),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000070', 49)
on conflict do nothing;
