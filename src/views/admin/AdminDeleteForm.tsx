"use client";

import type { ReactNode } from "react";

import { SubmitButton } from "@/components/account/SubmitButton";

type AdminDeleteFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  confirmMessage: string;
  fields: Record<string, string>;
  children?: ReactNode;
  pendingLabel?: string;
};

export function AdminDeleteForm({
  action,
  confirmMessage,
  fields,
  children = "Eliminar",
  pendingLabel = "Eliminando…",
}: AdminDeleteFormProps) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      {Object.entries(fields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <SubmitButton pendingLabel={pendingLabel} variant="outline" size="sm">
        {children}
      </SubmitButton>
    </form>
  );
}
