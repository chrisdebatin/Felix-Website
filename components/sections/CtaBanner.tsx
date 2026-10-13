import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import type { AppPathname } from "@/i18n/routing";

/** Abschluss-Block: grüne Fläche mit Lime-Hügel wie im Logo. Button nur, wenn `action` gesetzt ist. */
export function CtaBanner({
  title,
  text,
  note,
  action,
}: {
  title: string;
  text?: string;
  note?: string;
  action?: { href: AppPathname; label: string };
}) {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] bg-forest px-5 pb-28 pt-12 text-white sm:px-14 sm:pb-36 sm:pt-16 [--focus-color:var(--color-lime)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-28 -top-28 size-96 rounded-full border-[2.5rem] border-white/[0.07]"
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 1200 160"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full sm:h-28"
            >
              <path d="M0 160V96C220 18 980 18 1200 96V160Z" fill="#AFCA0B" />
            </svg>
            <div className="relative max-w-2xl">
              <h2 className="text-3xl text-white sm:text-[2.5rem]">{title}</h2>
              {text ? <p className="mt-4 text-lg text-white sm:text-xl">{text}</p> : null}
              {action ? (
                <div className="mt-8">
                  <ButtonLink href={action.href}>
                    {action.label}
                    <ArrowRight aria-hidden="true" className="hidden size-5 sm:block" />
                  </ButtonLink>
                </div>
              ) : null}
              {note ? <p className="mt-6 text-base font-semibold text-white">{note}</p> : null}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
