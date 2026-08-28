-- Adds Versace Eros Flame (perfume + decant).
-- Safe to re-run.

insert into public.brands (id, name, slug) values
  ('a0000000-0000-4000-8000-000000000023', 'Versace', 'versace')
on conflict (slug) do nothing;

insert into public.fragrance_notes (id, name, slug) values
  ('d0000000-0000-4000-8000-000000000124', 'Chinotto', 'chinotto'),
  ('d0000000-0000-4000-8000-000000000125', 'Pimienta de Madagascar', 'pimienta-de-madagascar'),
  ('d0000000-0000-4000-8000-000000000126', 'Musgo de roble', 'musgo-de-roble')
on conflict (slug) do nothing;

insert into public.products (
  id, name, slug, brand_id, category_id, description, type, gender,
  price, compare_at_price, stock, fragrance_family, occasions, rating,
  intensity, featured, bestseller, sort_order, created_at
) values
  (
    'c0000000-0000-4000-8000-000000000071',
    'Eros Flame',
    'eros-flame',
    'a0000000-0000-4000-8000-000000000023',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina intensa, cálida y seductora que combina cítricos vibrantes con especias aromáticas y un fondo amaderado. Eros Flame tiene un carácter apasionado y elegante, con una mezcla equilibrada entre frescura y calidez que la hace ideal para destacar tanto de día como de noche.',
    'perfume',
    'masculine',
    465,
    null,
    10,
    array['cítrico', 'aromático', 'especiado', 'ámbar', 'amaderado']::text[],
    array['diario', 'cita', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    true,
    false,
    71,
    '2026-08-28'
  ),
  (
    'c0000000-0000-4000-8000-000000000072',
    'Eros Flame',
    'eros-flame-decant',
    'a0000000-0000-4000-8000-000000000023',
    'b0000000-0000-4000-8000-000000000003',
    'Una fragancia masculina intensa, cálida y seductora que combina cítricos vibrantes con especias aromáticas y un fondo amaderado. Eros Flame tiene un carácter apasionado y elegante, con una mezcla equilibrada entre frescura y calidez que la hace ideal para destacar tanto de día como de noche.',
    'decant',
    'masculine',
    35,
    null,
    18,
    array['cítrico', 'aromático', 'especiado', 'ámbar', 'amaderado']::text[],
    array['diario', 'cita', 'fiesta', 'formal', 'noche']::text[],
    4.7,
    5,
    false,
    false,
    72,
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
  ('c0000000-0000-4000-8000-000000000071', '100 ml', 100, 465, null, 10, 'ELOVA-EROS-FLAME-100', true, 1),
  ('c0000000-0000-4000-8000-000000000072', '3 ml', 3, 24, null, 22, 'ELOVA-EROS-FLAME-3', false, 1),
  ('c0000000-0000-4000-8000-000000000072', '5 ml', 5, 35, null, 18, 'ELOVA-EROS-FLAME-5', false, 2),
  ('c0000000-0000-4000-8000-000000000072', '10 ml', 10, 57, null, 11, 'ELOVA-EROS-FLAME-10', false, 3)
on conflict (sku) do update set
  price = excluded.price,
  stock = excluded.stock,
  product_id = excluded.product_id,
  label = excluded.label,
  volume_ml = excluded.volume_ml,
  is_full_bottle = excluded.is_full_bottle;

insert into public.product_images (product_id, url, alt, position) values
  ('c0000000-0000-4000-8000-000000000071', '/images/products/product-eros-flame.png', 'Eros Flame', 0),
  ('c0000000-0000-4000-8000-000000000072', '/images/products/product-eros-flame.png', 'Eros Flame decant', 0)
on conflict (product_id, position) do update set
  url = excluded.url,
  alt = excluded.alt;

delete from public.product_notes
where product_id in (
  'c0000000-0000-4000-8000-000000000071',
  'c0000000-0000-4000-8000-000000000072'
);

insert into public.product_notes (product_id, note_id, stage, position) values
  ('c0000000-0000-4000-8000-000000000071', 'd0000000-0000-4000-8000-000000000048', 'top', 0),
  ('c0000000-0000-4000-8000-000000000071', 'd0000000-0000-4000-8000-000000000019', 'top', 1),
  ('c0000000-0000-4000-8000-000000000071', 'd0000000-0000-4000-8000-000000000001', 'top', 2),
  ('c0000000-0000-4000-8000-000000000071', 'd0000000-0000-4000-8000-000000000059', 'top', 3),
  ('c0000000-0000-4000-8000-000000000071', 'd0000000-0000-4000-8000-000000000124', 'top', 4),
  ('c0000000-0000-4000-8000-000000000071', 'd0000000-0000-4000-8000-000000000050', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000071', 'd0000000-0000-4000-8000-000000000032', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000071', 'd0000000-0000-4000-8000-000000000125', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000071', 'd0000000-0000-4000-8000-000000000041', 'base', 0),
  ('c0000000-0000-4000-8000-000000000071', 'd0000000-0000-4000-8000-000000000009', 'base', 1),
  ('c0000000-0000-4000-8000-000000000071', 'd0000000-0000-4000-8000-000000000005', 'base', 2),
  ('c0000000-0000-4000-8000-000000000071', 'd0000000-0000-4000-8000-000000000023', 'base', 3),
  ('c0000000-0000-4000-8000-000000000071', 'd0000000-0000-4000-8000-000000000052', 'base', 4),
  ('c0000000-0000-4000-8000-000000000071', 'd0000000-0000-4000-8000-000000000126', 'base', 5),
  ('c0000000-0000-4000-8000-000000000072', 'd0000000-0000-4000-8000-000000000048', 'top', 0),
  ('c0000000-0000-4000-8000-000000000072', 'd0000000-0000-4000-8000-000000000019', 'top', 1),
  ('c0000000-0000-4000-8000-000000000072', 'd0000000-0000-4000-8000-000000000001', 'top', 2),
  ('c0000000-0000-4000-8000-000000000072', 'd0000000-0000-4000-8000-000000000059', 'top', 3),
  ('c0000000-0000-4000-8000-000000000072', 'd0000000-0000-4000-8000-000000000124', 'top', 4),
  ('c0000000-0000-4000-8000-000000000072', 'd0000000-0000-4000-8000-000000000050', 'heart', 0),
  ('c0000000-0000-4000-8000-000000000072', 'd0000000-0000-4000-8000-000000000032', 'heart', 1),
  ('c0000000-0000-4000-8000-000000000072', 'd0000000-0000-4000-8000-000000000125', 'heart', 2),
  ('c0000000-0000-4000-8000-000000000072', 'd0000000-0000-4000-8000-000000000041', 'base', 0),
  ('c0000000-0000-4000-8000-000000000072', 'd0000000-0000-4000-8000-000000000009', 'base', 1),
  ('c0000000-0000-4000-8000-000000000072', 'd0000000-0000-4000-8000-000000000005', 'base', 2),
  ('c0000000-0000-4000-8000-000000000072', 'd0000000-0000-4000-8000-000000000023', 'base', 3),
  ('c0000000-0000-4000-8000-000000000072', 'd0000000-0000-4000-8000-000000000052', 'base', 4),
  ('c0000000-0000-4000-8000-000000000072', 'd0000000-0000-4000-8000-000000000126', 'base', 5)
on conflict do nothing;

insert into public.collection_products (collection_id, product_id, position) values
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000071', 20),
  ('aa000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000072', 21),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000071', 58),
  ('aa000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000072', 59),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000071', 50),
  ('aa000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000072', 51)
on conflict do nothing;
