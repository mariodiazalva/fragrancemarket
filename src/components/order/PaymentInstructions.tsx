"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

import { paymentReceiptWhatsAppUrl, storePaymentDetails } from "@/data/payments";
import { shortOrderNumber } from "@/lib/order-confirmation";
import { formatPrice } from "@/lib/utils";

type PaymentInstructionsProps = {
  amount: number;
  reference: string;
  showSteps?: boolean;
};

export function PaymentInstructions({
  amount,
  reference,
  showSteps = true,
}: PaymentInstructionsProps) {
  const details = storePaymentDetails;
  const orderRef = shortOrderNumber(reference);
  const whatsappUrl = paymentReceiptWhatsAppUrl(orderRef);

  return (
    <div>
      {showSteps ? (
        <ol className="space-y-4 text-sm leading-relaxed text-text-secondary">
          <li className="flex gap-3">
            <StepIndex>1</StepIndex>
            <p>
              Realiza el pago de{" "}
              <span className="font-medium text-text-primary">{formatPrice(amount)}</span> por
              Yape, Plin o transferencia BCP al{" "}
              <span className="font-medium text-text-primary">{details.yapePlinPhoneDisplay}</span>
              , a nombre de{" "}
              <span className="font-medium text-text-primary">{details.holderName}</span>.
            </p>
          </li>
          <li className="flex gap-3">
            <StepIndex>2</StepIndex>
            <p>
              Envía el comprobante por WhatsApp al{" "}
              <span className="font-medium text-text-primary">{details.yapePlinPhoneDisplay}</span>{" "}
              e indica el pedido{" "}
              <span className="font-medium text-text-primary">{orderRef}</span>.
            </p>
          </li>
        </ol>
      ) : null}

      <div className="mt-6 flex justify-center">
        <Image
          src={details.qrSrc}
          alt={details.qrAlt}
          width={details.qrWidth}
          height={details.qrHeight}
          className="h-auto w-full max-w-[14rem]"
        />
      </div>

      <div className="mt-6 space-y-3">
        <CopyRow
          label="Yape o Plin"
          value={details.yapePlinPhoneDisplay}
          copyValue={details.yapePlinPhoneDigits}
          href={details.yapePlinTelHref}
        />
        <CopyRow label="Titular" value={details.holderName} />
        <CopyRow
          label={`Cuenta ${details.bankName} ${details.currencyLabel}`}
          value={details.bcpAccount}
        />
        <CopyRow label="CCI" value={details.cci} />
        <CopyRow label="Pedido" value={orderRef} copyValue={reference} />
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-11 w-full items-center justify-center border border-elova-gold bg-elova-gold px-5 text-center text-xs font-medium uppercase tracking-[0.1em] text-accent-foreground transition-colors hover:bg-transparent hover:text-elova-gold"
      >
        Enviar comprobante por WhatsApp
      </a>
    </div>
  );
}

function StepIndex({ children }: { children: ReactNode }) {
  return (
    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-elova-black text-[0.65rem] font-medium text-elova-white">
      {children}
    </span>
  );
}

type CopyRowProps = {
  label: string;
  value: string;
  copyValue?: string;
  href?: string;
};

function CopyRow({ label, value, copyValue, href }: CopyRowProps) {
  const [copied, setCopied] = useState(false);
  const textToCopy = copyValue ?? value;

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex items-start justify-between gap-3 rounded-lg border border-elova-border bg-surface-elevated px-4 py-3">
      <div className="min-w-0">
        <p className="text-[0.65rem] uppercase tracking-[0.14em] text-text-secondary">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="mt-1 block break-all text-sm text-text-primary hover:text-elova-gold"
          >
            {value}
          </a>
        ) : (
          <p className="mt-1 break-all text-sm text-text-primary">{value}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onCopy}
        className="shrink-0 text-[0.65rem] uppercase tracking-[0.12em] text-elova-gold hover:underline"
      >
        {copied ? "Copiado" : "Copiar"}
      </button>
    </div>
  );
}
