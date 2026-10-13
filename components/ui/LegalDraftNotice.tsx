import { TriangleAlert } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { showLegalDraftNotice } from "@/lib/site";

export async function LegalDraftNotice() {
  if (!showLegalDraftNotice) return null;
  const t = await getTranslations("common.legalDraft");
  return (
    <div
      role="note"
      className="mb-10 flex gap-3 rounded-card border-2 border-dashed border-brand-dark/50 bg-accent-soft/60 p-5"
    >
      <TriangleAlert aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-brand-dark" />
      <p>
        <strong className="font-semibold">{t("title")}: </strong>
        {t("text")}
      </p>
    </div>
  );
}
