-- Fix UTF-8 names/descriptions after a Windows encoding paste.
-- Encoding-proof: strings are base64, not raw accents.
-- SQL Editor -> New query -> paste -> Run.

update public.products
set
  name = convert_from(decode('U3Ryb25nZXIgV2l0aCBZb3UgSW50ZW5zZWx5', 'base64'), 'UTF8'),
  description = convert_from(decode('VW5hIGZyYWdhbmNpYSBpbnRlbnNhLCBjw6FsaWRhIHkgYWRpY3RpdmEgcXVlIGNvbWJpbmEgYWNvcmRlcyBkdWxjZXMgeSBlc3BlY2lhZG9zIGNvbiB1bmEgYmFzZSBwcm9mdW5kYSB5IGVudm9sdmVudGUuIFN0cm9uZ2VyIFdpdGggWW91IEludGVuc2VseSBkZXN0YWNhIHBvciBzdSBjYXLDoWN0ZXIgc2VkdWN0b3IgeSBtYXNjdWxpbm8sIHNpZW5kbyBlc3BlY2lhbG1lbnRlIGF0cmFjdGl2byBwYXJhIG5vY2hlcywgY2l0YXMgeSBvY2FzaW9uZXMgZXNwZWNpYWxlcy4=', 'base64'), 'UTF8'),
  fragrance_family = ARRAY[convert_from(decode('w6FtYmFy', 'base64'), 'UTF8'), convert_from(decode('YXJvbcOhdGljbw==', 'base64'), 'UTF8'), convert_from(decode('ZXNwZWNpYWRv', 'base64'), 'UTF8'), convert_from(decode('b3JpZW50YWw=', 'base64'), 'UTF8')]::text[]
where id in ('c0000000-0000-4000-8000-000000000001', 'c0000000-0000-4000-8000-000000000009');

update public.product_images
set alt = convert_from(decode('U3Ryb25nZXIgV2l0aCBZb3UgSW50ZW5zZWx5', 'base64'), 'UTF8')
where product_id = 'c0000000-0000-4000-8000-000000000001';

update public.product_images
set alt = convert_from(decode('U3Ryb25nZXIgV2l0aCBZb3UgSW50ZW5zZWx5IGRlY2FudA==', 'base64'), 'UTF8')
where product_id = 'c0000000-0000-4000-8000-000000000009';

update public.products
set
  name = convert_from(decode('T2R5c3NleSBBcXVh', 'base64'), 'UTF8'),
  description = convert_from(decode('VW5hIGZyYWdhbmNpYSBmcmVzY2EsIGPDrXRyaWNhIHkgYXJvbcOhdGljYSBjb24gdW4gY2Fyw6FjdGVyIGxpbXBpbyB5IG1hc2N1bGluby4gT2R5c3NleSBBcXVhIGNvbWJpbmEgbm90YXMgcmVmcmVzY2FudGVzIGNvbiB1biBmb25kbyBhbWFkZXJhZG8gcXVlIGxhIGNvbnZpZXJ0ZSBlbiB1bmEgb3BjacOzbiB2ZXJzw6F0aWwsIGlkZWFsIHBhcmEgZWwgZMOtYSBhIGTDrWEsIGTDrWFzIGNhbHVyb3NvcyB5IG9jYXNpb25lcyBkb25kZSBidXNjYXMgdHJhbnNtaXRpciBmcmVzY3VyYSB5IGVsZWdhbmNpYS4=', 'base64'), 'UTF8'),
  fragrance_family = ARRAY[convert_from(decode('Y8OtdHJpY28=', 'base64'), 'UTF8'), convert_from(decode('YXJvbcOhdGljbw==', 'base64'), 'UTF8'), convert_from(decode('ZnJlc2Nv', 'base64'), 'UTF8'), convert_from(decode('YW1hZGVyYWRv', 'base64'), 'UTF8')]::text[]
where id in ('c0000000-0000-4000-8000-000000000002', 'c0000000-0000-4000-8000-000000000011');

update public.product_images
set alt = convert_from(decode('T2R5c3NleSBBcXVh', 'base64'), 'UTF8')
where product_id = 'c0000000-0000-4000-8000-000000000002';

update public.product_images
set alt = convert_from(decode('T2R5c3NleSBBcXVhIGRlY2FudA==', 'base64'), 'UTF8')
where product_id = 'c0000000-0000-4000-8000-000000000011';

update public.products
set
  name = convert_from(decode('Qm9ybiBpbiBSb21hIFVvbW8gSW50ZW5zZQ==', 'base64'), 'UTF8'),
  description = convert_from(decode('VW5hIGZyYWdhbmNpYSBpbnRlbnNhLCBlbGVnYW50ZSB5IHNlZHVjdG9yYSBxdWUgY29tYmluYSBsYSBjYWxpZGV6IGRlIGxhIHZhaW5pbGxhIGNvbiBhY29yZGVzIGFyb23DoXRpY29zIHkgYW1hZGVyYWRvcy4gQm9ybiBpbiBSb21hIFVvbW8gSW50ZW5zZSBwcm95ZWN0YSB1bmEgcGVyc29uYWxpZGFkIHNvZmlzdGljYWRhIHkgbW9kZXJuYSwgaWRlYWwgcGFyYSBkZXN0YWNhciBlc3BlY2lhbG1lbnRlIGR1cmFudGUgbGEgbm9jaGUgeSBlbiBvY2FzaW9uZXMgZXNwZWNpYWxlcy4=', 'base64'), 'UTF8'),
  fragrance_family = ARRAY[convert_from(decode('w6FtYmFy', 'base64'), 'UTF8'), convert_from(decode('YXJvbcOhdGljbw==', 'base64'), 'UTF8'), convert_from(decode('YW1hZGVyYWRv', 'base64'), 'UTF8'), convert_from(decode('b3JpZW50YWw=', 'base64'), 'UTF8')]::text[]
where id in ('c0000000-0000-4000-8000-000000000003', 'c0000000-0000-4000-8000-000000000012');

update public.product_images
set alt = convert_from(decode('Qm9ybiBpbiBSb21hIFVvbW8gSW50ZW5zZQ==', 'base64'), 'UTF8')
where product_id = 'c0000000-0000-4000-8000-000000000003';

update public.product_images
set alt = convert_from(decode('Qm9ybiBpbiBSb21hIFVvbW8gSW50ZW5zZSBkZWNhbnQ=', 'base64'), 'UTF8')
where product_id = 'c0000000-0000-4000-8000-000000000012';

update public.products
set
  name = convert_from(decode('QWNxdWEgZGkgR2nDsiBQcm9mb25kbw==', 'base64'), 'UTF8'),
  description = convert_from(decode('VW5hIGZyYWdhbmNpYSBmcmVzY2EsIGVsZWdhbnRlIHkgcHJvZnVuZGFtZW50ZSBtYXJpbmEgcXVlIGNhcHR1cmEgbGEgc2Vuc2FjacOzbiBkZWwgb2PDqWFubyB5IGxhIG5hdHVyYWxlemEuIEFjcXVhIGRpIEdpw7IgUHJvZm9uZG8gY29tYmluYSBjw610cmljb3MgeSBub3RhcyBtYXJpbmFzIGNvbiB1biBjb3JhesOzbiBhcm9tw6F0aWNvIHkgdW4gZm9uZG8gYW1hZGVyYWRvLCBjcmVhbmRvIHVuIGFyb21hIGxpbXBpbywgbWFzY3VsaW5vIHkgc29maXN0aWNhZG8sIGlkZWFsIHBhcmEgZWwgZMOtYSBhIGTDrWEgeSBsb3MgZMOtYXMgY8OhbGlkb3Mu', 'base64'), 'UTF8'),
  fragrance_family = ARRAY[convert_from(decode('YXJvbcOhdGljbw==', 'base64'), 'UTF8'), convert_from(decode('Y8OtdHJpY28=', 'base64'), 'UTF8'), convert_from(decode('ZnJlc2Nv', 'base64'), 'UTF8'), convert_from(decode('YW1hZGVyYWRv', 'base64'), 'UTF8')]::text[]
where id in ('c0000000-0000-4000-8000-000000000004', 'c0000000-0000-4000-8000-000000000013');

update public.product_images
set alt = convert_from(decode('QWNxdWEgZGkgR2nDsiBQcm9mb25kbw==', 'base64'), 'UTF8')
where product_id = 'c0000000-0000-4000-8000-000000000004';

update public.product_images
set alt = convert_from(decode('QWNxdWEgZGkgR2nDsiBQcm9mb25kbyBkZWNhbnQ=', 'base64'), 'UTF8')
where product_id = 'c0000000-0000-4000-8000-000000000013';

update public.products
set
  name = convert_from(decode('OSBQTSBOaWdodCBPdXQ=', 'base64'), 'UTF8'),
  description = convert_from(decode('VW5hIGZyYWdhbmNpYSBtYXNjdWxpbmEsIGludGVuc2EgeSBzb2Zpc3RpY2FkYSwgZGlzZcOxYWRhIHBhcmEgZGVzdGFjYXIgZHVyYW50ZSBsYSBub2NoZS4gOSBQTSBOaWdodCBPdXQgY29tYmluYSBhY29yZGVzIGVzcGVjaWFkb3MgeSBhcm9tw6F0aWNvcyBjb24gdW4gZm9uZG8gY8OhbGlkbyB5IGFtYWRlcmFkbywgY3JlYW5kbyB1bmEgZXNlbmNpYSBlbGVnYW50ZSwgc2VkdWN0b3JhIHkgbW9kZXJuYSwgcGVyZmVjdGEgcGFyYSBjaXRhcywgZmllc3RhcyB5IG9jYXNpb25lcyBlc3BlY2lhbGVzLg==', 'base64'), 'UTF8'),
  fragrance_family = ARRAY[convert_from(decode('w6FtYmFy', 'base64'), 'UTF8'), convert_from(decode('YXJvbcOhdGljbw==', 'base64'), 'UTF8'), convert_from(decode('ZXNwZWNpYWRv', 'base64'), 'UTF8'), convert_from(decode('YW1hZGVyYWRv', 'base64'), 'UTF8')]::text[]
where id in ('c0000000-0000-4000-8000-000000000005', 'c0000000-0000-4000-8000-000000000014');

update public.product_images
set alt = convert_from(decode('OSBQTSBOaWdodCBPdXQ=', 'base64'), 'UTF8')
where product_id = 'c0000000-0000-4000-8000-000000000005';

update public.product_images
set alt = convert_from(decode('OSBQTSBOaWdodCBPdXQgZGVjYW50', 'base64'), 'UTF8')
where product_id = 'c0000000-0000-4000-8000-000000000014';

update public.products
set
  name = convert_from(decode('S2hhbXJhaCBRYWh3YQ==', 'base64'), 'UTF8'),
  description = convert_from(decode('VW5hIGZyYWdhbmNpYSBjw6FsaWRhLCBkdWxjZSB5IGVudm9sdmVudGUgcXVlIGNvbWJpbmEgZXNwZWNpYXMgYXJvbcOhdGljYXMgY29uIGFjb3JkZXMgZ291cm1hbmQgZGUgY2FuZWxhLCBwcmFsaW7DqSB5IGNhZsOpLiBLaGFtcmFoIFFhaHdhIG9mcmVjZSB1biBhcm9tYSBpbnRlbnNvIHkgYWRpY3Rpdm8sIHBlcmZlY3RvIHBhcmEgcXVpZW5lcyBidXNjYW4gdW5hIGZyYWdhbmNpYSBsbGFtYXRpdmEsIHNvZmlzdGljYWRhIHkgZXNwZWNpYWxtZW50ZSBhdHJhY3RpdmEgZHVyYW50ZSBsYSBub2NoZSB5IGVuIGNsaW1hcyBmcmVzY29zLg==', 'base64'), 'UTF8'),
  fragrance_family = ARRAY[convert_from(decode('w6FtYmFy', 'base64'), 'UTF8'), convert_from(decode('ZXNwZWNpYWRv', 'base64'), 'UTF8'), convert_from(decode('Z291cm1hbmQ=', 'base64'), 'UTF8'), convert_from(decode('b3JpZW50YWw=', 'base64'), 'UTF8')]::text[]
where id in ('c0000000-0000-4000-8000-000000000006', 'c0000000-0000-4000-8000-000000000015');

update public.product_images
set alt = convert_from(decode('S2hhbXJhaCBRYWh3YQ==', 'base64'), 'UTF8')
where product_id = 'c0000000-0000-4000-8000-000000000006';

update public.product_images
set alt = convert_from(decode('S2hhbXJhaCBRYWh3YSBkZWNhbnQ=', 'base64'), 'UTF8')
where product_id = 'c0000000-0000-4000-8000-000000000015';

update public.products
set
  name = convert_from(decode('TGUgTWFsZQ==', 'base64'), 'UTF8'),
  description = convert_from(decode('VW4gY2zDoXNpY28gbWFzY3VsaW5vLCBzZW5zdWFsIHkgZWxlZ2FudGUgcXVlIGNvbWJpbmEgbGEgZnJlc2N1cmEgZGUgbGEgbWVudGEgY29uIGxhIHN1YXZpZGFkIGRlIGxhIGxhdmFuZGEgeSBsYSBjYWxpZGV6IGRlIGxhIHZhaW5pbGxhLiBMZSBNYWxlIG9mcmVjZSB1biBhcm9tYSBkaXN0aW50aXZvLCBsaW1waW8geSBzZWR1Y3RvciwgaWRlYWwgdGFudG8gcGFyYSBlbCBkw61hIGEgZMOtYSBjb21vIHBhcmEgb2Nhc2lvbmVzIGVzcGVjaWFsZXMu', 'base64'), 'UTF8'),
  fragrance_family = ARRAY[convert_from(decode('YXJvbcOhdGljbw==', 'base64'), 'UTF8'), convert_from(decode('w6FtYmFy', 'base64'), 'UTF8'), convert_from(decode('ZXNwZWNpYWRv', 'base64'), 'UTF8'), convert_from(decode('ZmxvcmFs', 'base64'), 'UTF8')]::text[]
where id in ('c0000000-0000-4000-8000-000000000007', 'c0000000-0000-4000-8000-000000000022');

update public.product_images
set alt = convert_from(decode('TGUgTWFsZQ==', 'base64'), 'UTF8')
where product_id = 'c0000000-0000-4000-8000-000000000007';

update public.product_images
set alt = convert_from(decode('TGUgTWFsZSBkZWNhbnQ=', 'base64'), 'UTF8')
where product_id = 'c0000000-0000-4000-8000-000000000022';

update public.products
set
  name = convert_from(decode('WWFyYQ==', 'base64'), 'UTF8'),
  description = convert_from(decode('VW5hIGZyYWdhbmNpYSBmZW1lbmluYSwgZHVsY2UgeSBjcmVtb3NhLCBjb24gdW4gY2Fyw6FjdGVyIGRlbGljYWRvIHkgZW52b2x2ZW50ZS4gTGF0dGFmYSBZYXJhIGNvbWJpbmEgZnJ1dGFzIHN1YXZlcywgZmxvcmVzIGJsYW5jYXMgeSBhY29yZGVzIGRlIHZhaW5pbGxhIHkgYWxtaXpjbGUsIGNyZWFuZG8gdW4gYXJvbWEgZWxlZ2FudGUsIGp1dmVuaWwgeSBtdXkgZsOhY2lsIGRlIGxsZXZhci4=', 'base64'), 'UTF8'),
  fragrance_family = ARRAY[convert_from(decode('ZmxvcmFs', 'base64'), 'UTF8'), convert_from(decode('Z291cm1hbmQ=', 'base64'), 'UTF8'), convert_from(decode('w6FtYmFy', 'base64'), 'UTF8'), convert_from(decode('b3JpZW50YWw=', 'base64'), 'UTF8')]::text[]
where id in ('c0000000-0000-4000-8000-000000000008', 'c0000000-0000-4000-8000-000000000016');

update public.product_images
set alt = convert_from(decode('WWFyYQ==', 'base64'), 'UTF8')
where product_id = 'c0000000-0000-4000-8000-000000000008';

update public.product_images
set alt = convert_from(decode('WWFyYSBkZWNhbnQ=', 'base64'), 'UTF8')
where product_id = 'c0000000-0000-4000-8000-000000000016';

update public.products
set
  name = convert_from(decode('RXJiYSBQdXJh', 'base64'), 'UTF8'),
  description = convert_from(decode('VW5hIGZyYWdhbmNpYSB2aWJyYW50ZSwgbHVqb3NhIHkgZW52b2x2ZW50ZSBxdWUgY29tYmluYSB1biBleHBsb3Npdm8gYWNvcmRlIGZydXRhbCBjb24gY8OtdHJpY29zIGZyZXNjb3MgeSB1bmEgYmFzZSBjw6FsaWRhIHkgYWxtaXpjbGFkYS4gRXJiYSBQdXJhIGRlc3RhY2EgcG9yIHN1IGdyYW4gcHJlc2VuY2lhIHkgZXN0ZWxhLCBvZnJlY2llbmRvIHVuIGFyb21hIG1vZGVybm8sIHNlbnN1YWwgeSBzb2Zpc3RpY2FkbyBxdWUgZnVuY2lvbmEgdGFudG8gcGFyYSBob21icmVzIGNvbW8gcGFyYSBtdWplcmVzLg==', 'base64'), 'UTF8'),
  fragrance_family = ARRAY[convert_from(decode('Y8OtdHJpY28=', 'base64'), 'UTF8'), convert_from(decode('ZnJ1dGFs', 'base64'), 'UTF8'), convert_from(decode('w6FtYmFy', 'base64'), 'UTF8'), convert_from(decode('YWxtaXpjbGFkbw==', 'base64'), 'UTF8'), convert_from(decode('YW1hZGVyYWRv', 'base64'), 'UTF8')]::text[]
where id in ('c0000000-0000-4000-8000-000000000010', 'c0000000-0000-4000-8000-000000000017');

update public.product_images
set alt = convert_from(decode('RXJiYSBQdXJh', 'base64'), 'UTF8')
where product_id = 'c0000000-0000-4000-8000-000000000010';

update public.product_images
set alt = convert_from(decode('RXJiYSBQdXJhIGRlY2FudA==', 'base64'), 'UTF8')
where product_id = 'c0000000-0000-4000-8000-000000000017';

update public.fragrance_notes
set name = convert_from(decode('UGFjaHVsw60=', 'base64'), 'UTF8')
where slug = 'pachuli';

update public.fragrance_notes
set name = convert_from(decode('TGF2YW5kw61u', 'base64'), 'UTF8')
where slug = 'lavandin';

update public.fragrance_notes
set name = convert_from(decode('UHJhbGluw6k=', 'base64'), 'UTF8')
where slug = 'praline';

update public.fragrance_notes
set name = convert_from(decode('Q2Fmw6k=', 'base64'), 'UTF8')
where slug = 'cafe';

update public.fragrance_notes
set name = convert_from(decode('w4FtYmFyIG1pbmVyYWw=', 'base64'), 'UTF8')
where slug = 'ambar-mineral';

update public.fragrance_notes
set name = convert_from(decode('TWFkZXJhIGRlIHBhY2h1bMOt', 'base64'), 'UTF8')
where slug = 'madera-de-pachuli';

update public.fragrance_notes
set name = convert_from(decode('QWNvcmRlcyBhcm9tw6F0aWNvcw==', 'base64'), 'UTF8')
where slug = 'acordes-aromaticos';

update public.fragrance_notes
set name = convert_from(decode('T3JxdcOtZGVh', 'base64'), 'UTF8')
where slug = 'orquidea';

update public.fragrance_notes
set name = convert_from(decode('TGltw7NuIGRlIFNpY2lsaWE=', 'base64'), 'UTF8')
where slug = 'limon-de-sicilia';

update public.fragrance_notes
set name = convert_from(decode('RnJ1dGFzIG1lZGl0ZXJyw6FuZWFz', 'base64'), 'UTF8')
where slug = 'frutas-mediterraneas';

update public.fragrance_notes
set name = convert_from(decode('w4FtYmFy', 'base64'), 'UTF8')
where slug = 'ambar';
