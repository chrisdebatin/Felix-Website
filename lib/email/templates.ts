import "server-only";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const nl2br = (s: string) => escapeHtml(s).replace(/\n/g, "<br>");

/** Schlichtes, mailclient-taugliches HTML-Layout in den Felix-Farben (Waldgrün, Lime, Salbei). */
export function renderEmail({
  preheader,
  paragraphs,
  table,
  tableTitle,
  footer,
}: {
  preheader?: string;
  paragraphs: string[];
  table?: [string, string][];
  tableTitle?: string;
  footer?: string;
}): string {
  const rows = (table ?? [])
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#55605A;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:8px 0;color:#003820;font-weight:600">${nl2br(value)}</td></tr>`,
    )
    .join("");

  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#F3F7E3;font-family:Helvetica,Arial,sans-serif;font-size:17px;line-height:1.6;color:#1C2420">
${preheader ? `<div style="display:none;max-height:0;overflow:hidden">${escapeHtml(preheader)}</div>` : ""}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3F7E3;padding:32px 16px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border-radius:20px;padding:32px;border-top:6px solid #AFCA0B">
<tr><td style="font-family:Helvetica,Arial,sans-serif;font-size:28px;font-weight:800;color:#003820;padding-bottom:16px"><span style="color:#00633A">&#9679;</span> Felix</td></tr>
${paragraphs.map((p) => `<tr><td style="padding-bottom:14px">${nl2br(p)}</td></tr>`).join("")}
${
  rows
    ? `<tr><td style="padding:8px 0 16px">${tableTitle ? `<p style="margin:0 0 8px;font-weight:bold">${escapeHtml(tableTitle)}</p>` : ""}<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid #DDE5CF;border-bottom:1px solid #DDE5CF">${rows}</table></td></tr>`
    : ""
}
${footer ? `<tr><td style="padding-top:16px;font-size:14px;color:#55605A">${nl2br(footer)}</td></tr>` : ""}
</table></td></tr></table></body></html>`;
}

export function renderText({
  paragraphs,
  table,
  footer,
}: {
  paragraphs: string[];
  table?: [string, string][];
  footer?: string;
}): string {
  const tableText = (table ?? []).map(([l, v]) => `${l}: ${v}`).join("\n");
  return [...paragraphs, tableText, footer].filter(Boolean).join("\n\n");
}
