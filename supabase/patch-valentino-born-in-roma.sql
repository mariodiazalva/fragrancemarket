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
