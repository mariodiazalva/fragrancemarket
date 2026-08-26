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
