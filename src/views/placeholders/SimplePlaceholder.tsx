import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type SimplePlaceholderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function SimplePlaceholder({
  eyebrow = "Próximamente",
  title,
  description,
}: SimplePlaceholderProps) {
  return (
    <main className="flex flex-1 flex-col justify-center py-24">
      <Container size="narrow" className="elova-fade-up text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-elova-gold">
          {eyebrow}
        </p>
        <h1 className="mt-5 font-serif text-[2rem] font-bold tracking-[-0.02em] text-text-primary sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
        <div className="mt-8">
          <ButtonLink href="/" variant="outline">
            Volver al inicio
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
