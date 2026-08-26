/** Public pay-to details shown to customers. Not a payment gateway. */

export const storePaymentDetails = {
  holderName: "Felix Enzo Farid Cabrera Castillo",
  yapePlinPhoneDisplay: "973 043 302",
  yapePlinPhoneDigits: "973043302",
  yapePlinTelHref: "tel:+51973043302",
  bankName: "BCP",
  currencyLabel: "Soles",
  bcpAccount: "57097829878010",
  cci: "00257019782987801003",
  qrSrc: "/images/payments/yape-qr.jpg",
  qrWidth: 666,
  qrHeight: 1024,
  qrAlt: "Código QR de Yape para pagar a Felix Enzo Farid Cabrera Castillo",
} as const;

export function paymentReceiptWhatsAppUrl(orderReference: string): string {
  const configured = process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "";
  const matched = configured.match(/wa\.me\/(\d+)/i);
  const digits = matched?.[1] ?? `51${storePaymentDetails.yapePlinPhoneDigits}`;
  const text = `Hola, adjunto el comprobante de pago del pedido ${orderReference}.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
