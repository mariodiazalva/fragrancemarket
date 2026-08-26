-- ELOVA catalog schema. Catalog tables are publicly readable when published.
-- Orders and customers have RLS enabled with no anon policies (deny by default).

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  brand_id uuid not null references public.brands (id) on delete restrict,
  category_id uuid not null references public.categories (id) on delete restrict,
  description text not null default '',
  type text not null,
  gender text not null,
  price numeric(10, 2) not null,
  compare_at_price numeric(10, 2),
  stock integer not null default 0,
  fragrance_family text[] not null default '{}',
  occasions text[] not null default '{}',
  intensity smallint,
  rating numeric(3, 2),
  rating_count integer not null default 0,
  featured boolean not null default false,
  bestseller boolean not null default false,
  published boolean not null default true,
  seo_title text,
  seo_description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_type_check check (type in ('perfume', 'decant', 'set')),
  constraint products_gender_check check (gender in ('masculine', 'feminine', 'unisex')),
  constraint products_price_check check (price >= 0),
  constraint products_compare_at_price_check check (
    compare_at_price is null or compare_at_price >= 0
  ),
  constraint products_stock_check check (stock >= 0),
  constraint products_intensity_check check (
    intensity is null or intensity between 1 and 5
  ),
  constraint products_rating_check check (
    rating is null or rating between 0 and 5
  ),
  constraint products_rating_count_check check (rating_count >= 0)
);

create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  label text not null,
  volume_ml integer not null,
  price numeric(10, 2) not null,
  compare_at_price numeric(10, 2),
  stock integer not null default 0,
  sku text unique,
  is_full_bottle boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint product_variants_volume_check check (volume_ml > 0),
  constraint product_variants_price_check check (price >= 0),
  constraint product_variants_stock_check check (stock >= 0)
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  url text not null,
  alt text,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  unique (product_id, position)
);

create table public.fragrance_notes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.product_notes (
  product_id uuid not null references public.products (id) on delete cascade,
  note_id uuid not null references public.fragrance_notes (id) on delete restrict,
  stage text not null,
  position integer not null default 0,
  primary key (product_id, note_id, stage),
  constraint product_notes_stage_check check (stage in ('top', 'heart', 'base'))
);

create table public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.collection_products (
  collection_id uuid not null references public.collections (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  position integer not null default 0,
  primary key (collection_id, product_id)
);

create table public.sets (
  id uuid primary key default gen_random_uuid(),
  product_id uuid unique references public.products (id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  price numeric(10, 2) not null,
  compare_at_price numeric(10, 2),
  image_url text,
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  constraint sets_price_check check (price >= 0)
);

create table public.set_products (
  set_id uuid not null references public.sets (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete restrict,
  size_label text,
  quantity integer not null default 1,
  individual_price numeric(10, 2),
  position integer not null default 0,
  primary key (set_id, product_id),
  constraint set_products_quantity_check check (quantity > 0)
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers (id) on delete set null,
  status text not null default 'pending',
  subtotal numeric(10, 2) not null default 0,
  shipping_amount numeric(10, 2) not null default 0,
  total numeric(10, 2) not null default 0,
  currency text not null default 'PEN',
  shipping_address jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint orders_status_check check (
    status in ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled')
  )
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  variant_id uuid references public.product_variants (id) on delete set null,
  product_name text not null,
  quantity integer not null,
  unit_price numeric(10, 2) not null,
  created_at timestamptz not null default now(),
  constraint order_items_quantity_check check (quantity > 0),
  constraint order_items_unit_price_check check (unit_price >= 0)
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  customer_id uuid references public.customers (id) on delete set null,
  author_name text not null,
  rating integer not null,
  title text,
  body text not null default '',
  is_published boolean not null default false,
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  constraint reviews_rating_check check (rating between 1 and 5)
);

create index products_featured_published_idx
  on public.products (sort_order)
  where featured = true and published = true;

create index product_variants_product_id_idx on public.product_variants (product_id);
create index product_images_product_id_idx on public.product_images (product_id, position);
create index product_notes_product_id_idx on public.product_notes (product_id);
create index reviews_product_id_idx on public.reviews (product_id)
  where is_published = true;
create index orders_customer_id_idx on public.orders (customer_id);

create trigger products_set_updated_at
  before update on public.products
  for each row execute procedure public.set_updated_at();

create trigger customers_set_updated_at
  before update on public.customers
  for each row execute procedure public.set_updated_at();

create trigger orders_set_updated_at
  before update on public.orders
  for each row execute procedure public.set_updated_at();

alter table public.brands enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_images enable row level security;
alter table public.fragrance_notes enable row level security;
alter table public.product_notes enable row level security;
alter table public.collections enable row level security;
alter table public.collection_products enable row level security;
alter table public.sets enable row level security;
alter table public.set_products enable row level security;
alter table public.reviews enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.customers enable row level security;

create policy "Public read brands"
  on public.brands for select to anon, authenticated using (true);

create policy "Public read categories"
  on public.categories for select to anon, authenticated using (true);

create policy "Public read published products"
  on public.products for select to anon, authenticated using (published = true);

create policy "Public read variants of published products"
  on public.product_variants for select to anon, authenticated
  using (
    exists (
      select 1 from public.products p
      where p.id = product_id and p.published = true
    )
  );

create policy "Public read images of published products"
  on public.product_images for select to anon, authenticated
  using (
    exists (
      select 1 from public.products p
      where p.id = product_id and p.published = true
    )
  );

create policy "Public read fragrance notes"
  on public.fragrance_notes for select to anon, authenticated using (true);

create policy "Public read notes of published products"
  on public.product_notes for select to anon, authenticated
  using (
    exists (
      select 1 from public.products p
      where p.id = product_id and p.published = true
    )
  );

create policy "Public read published collections"
  on public.collections for select to anon, authenticated using (published = true);

create policy "Public read collection products"
  on public.collection_products for select to anon, authenticated
  using (
    exists (
      select 1 from public.collections c
      where c.id = collection_id and c.published = true
    )
  );

create policy "Public read published sets"
  on public.sets for select to anon, authenticated using (published = true);

create policy "Public read set products"
  on public.set_products for select to anon, authenticated
  using (
    exists (
      select 1 from public.sets s
      where s.id = set_id and s.published = true
    )
  );

create policy "Public read published reviews"
  on public.reviews for select to anon, authenticated using (is_published = true);

grant usage on schema public to anon, authenticated, service_role;

grant select on table
  public.brands,
  public.categories,
  public.products,
  public.product_variants,
  public.product_images,
  public.fragrance_notes,
  public.product_notes,
  public.collections,
  public.collection_products,
  public.sets,
  public.set_products,
  public.reviews
to anon, authenticated;

grant all on table
  public.brands,
  public.categories,
  public.products,
  public.product_variants,
  public.product_images,
  public.fragrance_notes,
  public.product_notes,
  public.collections,
  public.collection_products,
  public.sets,
  public.set_products,
  public.reviews,
  public.customers,
  public.orders,
  public.order_items
to service_role;
