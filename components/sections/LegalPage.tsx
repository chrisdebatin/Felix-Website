import { getFormatter, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { LegalDraftNotice } from "@/components/ui/LegalDraftNotice";
import { legalDraftDocs, legalLastUpdated } from "@/lib/site";

type Section = {
  heading: string;
  paragraphs: string[];
  list?: string[];
  after?: string[];
};

export type LegalDoc = "imprint" | "privacy";

/**
 * Rendert einen Rechtstext aus messages/*.json (legal.<doc>).
 * `lead` steht vor den Abschnitten aus den Texten (z. B. Firmenangaben aus lib/site.ts).
 */
export async function LegalPage({
  doc,
  lead,
  children,
}: {
  doc: LegalDoc;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const t = await getTranslations(`legal.${doc}`);
  const legal = await getTranslations("legal");
  const format = await getFormatter();
  const sections = t.raw("sections") as Section[];
  const intro = t.has("intro") ? (t.raw("intro") as string) : null;
  const languageNote = legal("languageNote");

  return (
    <section className="py-12 sm:py-20">
      <Container size="narrow">
        {legalDraftDocs.includes(doc) ? <LegalDraftNotice /> : null}
        <h1 className="text-4xl sm:text-5xl">{t("title")}</h1>
        <p className="mt-3 text-muted">
          {legal("updated", { date: format.dateTime(legalLastUpdated, { dateStyle: "long" }) })}
        </p>
        {languageNote ? (
          <p className="mt-4 rounded-card bg-sage p-4 text-base text-muted">{languageNote}</p>
        ) : null}
        <div className="prose-legal mt-8 text-lg">
          {intro ? <p>{intro}</p> : null}
          {lead}
          {sections.map((s) => (
            <div key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
              {s.list ? (
                <ul>
                  {s.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              ) : null}
              {s.after?.map((p, i) => (
                <p key={`after-${i}`} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>
          ))}
          {children}
        </div>
      </Container>
    </section>
  );
}
