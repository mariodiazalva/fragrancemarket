import { SubmitButton } from "@/components/account/SubmitButton";
import { ButtonLink } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  adminAccessMessage,
  type AdminAccess,
  type AdminPath,
} from "@/lib/admin";
import { signInAdminAction } from "@/services/auth.actions";

type AdminGateProps = {
  access: Exclude<AdminAccess, "ok">;
  next: AdminPath;
  error?: string | null;
};

export function AdminGate({ access, next, error }: AdminGateProps) {
  return (
    <section className="max-w-lg border border-elova-border bg-white p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.22em] text-text-secondary">Acceso</p>
      <h1 className="mt-3 font-serif text-2xl tracking-[0.04em] text-text-primary">
        Intranet
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
        {adminAccessMessage(access)}
      </p>

      {error ? (
        <p className="mt-6 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      {access === "signed-out" ? (
        <form action={signInAdminAction} className="mt-8 space-y-5">
          <input type="hidden" name="next" value={next} />
          <Input
            label="Usuario"
            name="email"
            type="email"
            autoComplete="username"
            required
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <SubmitButton pendingLabel="Entrando…">Entrar</SubmitButton>
        </form>
      ) : (
        <div className="mt-8">
          <ButtonLink href="/cuenta" variant="outline">
            Ir a cuenta
          </ButtonLink>
        </div>
      )}
    </section>
  );
}
