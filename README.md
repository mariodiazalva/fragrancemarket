# Elova Perfumes (copia base)

Copia independiente para armar una pagina parecida. El proyecto original de la otra PC no se modifica.

Esta copia **no incluye** las claves de Supabase. En el otro Cursor conectas un proyecto de Supabase nuevo.

## Abrir en el otro Cursor

1. Clona este repo y abre la carpeta en Cursor.
2. Copia `.env.example` a `.env.local`.
3. En el dashboard de tu **nuevo** Supabase: Settings → API.
   - `SUPABASE_URL` = Project URL
   - `SUPABASE_ANON_KEY` = anon / public key
4. En Supabase → SQL Editor, ejecuta en orden los archivos de `supabase/migrations/`.
5. Si quieres el catalogo de ejemplo, ejecuta despues los `seed*.sql` / `patch-*.sql` de `supabase/` que necesites.
6. `npm install` y `npm run dev`.

Auth (magic links): en Supabase → Authentication → URL Configuration, Site URL = origen de la app, y Redirect URLs debe incluir `{SITE_URL}/auth/callback`.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
