-- Update the payment FAQ after manual Yape / BCP details went live.
-- Safe to re-run in the SQL Editor.

update public.faqs
set answer = 'Aceptamos Yape, Plin y transferencia BCP. El QR y los números de cuenta aparecen al finalizar el pedido. El pedido queda pendiente hasta que validemos el pago.'
where id = 'pagos';
