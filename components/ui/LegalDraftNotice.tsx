import { TriangleAlert } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function LegalDraftNotice() {
  const t = await getTranslations("common.legalDraft");
  return (
    <div
      role="note"
      className="mb-10 flex gap-3 rounded-card border-2 border-dashed border-forest/40 bg-lime-soft/60 p-5"
    >
      <TriangleAlert aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-forest" />
      <p>
        <strong className="font-extrabold text-forest-deep">{t("title")}: </strong>
        {t("text")}
      </p>
    </div>
  );
}
