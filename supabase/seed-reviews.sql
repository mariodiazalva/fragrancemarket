-- Demo reviews for Home. Run after seed.sql.
-- is_demo = true so they are never presented as real testimonials.

insert into public.reviews (
  id, product_id, author_name, rating, title, body, is_published, is_demo, created_at
) values
  (
    'f0000000-0000-4000-8000-000000000001',
    'c0000000-0000-4000-8000-000000000002',
    'Ana M.',
    5,
    'El decant me evitó una compra a ciegas',
    'Pedí 5 ml antes del frasco. La persistencia y el secado coincidieron con lo que buscaba.',
    true,
    true,
    '2026-07-02'
  ),
  (
    'f0000000-0000-4000-8000-000000000002',
    'c0000000-0000-4000-8000-000000000003',
    'Diego R.',
    4,
    'Bien para decidir entre dos ouds',
    'El set Arabian me sirvió para comparar. Me quedé con uno y dejé el otro.',
    true,
    true,
    '2026-07-08'
  ),
  (
    'f0000000-0000-4000-8000-000000000003',
    'c0000000-0000-4000-8000-000000000004',
    'Lucía V.',
    5,
    'Llegó ordenado y fácil de probar',
    'Los viales venían identificados. Usé el de 3 ml en la oficina durante una semana.',
    true,
    true,
    '2026-07-15'
  )
on conflict (id) do nothing;
