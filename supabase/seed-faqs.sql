-- FAQ for Home. Safe to re-run. Creates the table if it does not exist yet.

create table if not exists public.faqs (
  id text primary key,
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.faqs enable row level security;

drop policy if exists "Public read published faqs" on public.faqs;

create policy "Public read published faqs"
  on public.faqs for select to anon, authenticated
  using (published = true);

grant select on table public.faqs to anon, authenticated;
grant all on table public.faqs to service_role;

insert into public.faqs (id, question, answer, sort_order, published) values
  (
    'originales',
    '¿Los perfumes son originales?',
    'ELOVA trabaja con fragancias originales. Si tienes una duda concreta sobre un producto, escríbenos antes de comprar y te confirmamos el origen de esa pieza.',
    1,
    true
  ),
  (
    'decant',
    '¿Qué es un decant?',
    'Un decant es una porción más pequeña de una fragancia, pasada a un vial. Sirve para conocer un perfume en la piel durante varios días, sin comprar el frasco completo.',
    2,
    true
  ),
  (
    'tamanos',
    '¿Qué tamaños tienen?',
    'Los decants están pensados en 3 ml, 5 ml y 10 ml. Los frascos completos varían según cada casa. El tamaño disponible aparece en la ficha del producto.',
    3,
    true
  ),
  (
    'envio-plazo',
    '¿Cuánto demora el envío?',
    'El plazo depende del destino y del método elegido. Te lo confirmamos al momento de la compra, antes de pagar.',
    4,
    true
  ),
  (
    'envio-peru',
    '¿Hacen envíos a todo el Perú?',
    'Sí, hacemos envíos a nivel nacional. El costo y el tiempo se calculan según la ciudad o el distrito de entrega.',
    5,
    true
  ),
  (
    'elegir',
    '¿Cómo puedo elegir mi perfume?',
    'Puedes empezar por un decant, explorar por perfil u ocasión, o usar el recomendador. Si aún no estás seguro, un set te permite comparar varias piezas.',
    6,
    true
  ),
  (
    'pagos',
    '¿Qué métodos de pago aceptan?',
    'Aceptamos Yape, Plin y transferencia BCP. El QR y los números de cuenta aparecen al finalizar el pedido. El pedido queda pendiente hasta que validemos el pago.',
    7,
    true
  )
on conflict (id) do nothing;
