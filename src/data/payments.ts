/** Public pay-to details shown to customers. Not a payment gateway. */

export const storePaymentDetails = {
  holderName: "Mario Alonso Diaz Alva",
  yapePlinPhoneDisplay: "926 628 289",
  yapePlinPhoneDigits: "926628289",
  yapePlinTelHref: "tel:+51926628289",
  bankName: "BCP",
  currencyLabel: "Soles",
  bcpAccount: "57073368233079",
  cci: "00257017336823307905",
  qrSrc: "/images/payments/yape-qr.png",
  qrWidth: 663,
  qrHeight: 1024,
  qrAlt: "Código QR de Yape para pagar a Mario Alonso Diaz Alva",
} as const;

export function paymentReceiptWhatsAppUrl(orderReference: string): string {
  const configured = process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "";
  const matched = configured.match(/wa\.me\/(\d+)/i);
  const digits = matched?.[1] ?? `51${storePaymentDetails.yapePlinPhoneDigits}`;
  const text = `Hola, adjunto el comprobante de pago del pedido ${orderReference}.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
