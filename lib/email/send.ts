import "server-only";
import { Resend } from "resend";

type Mail = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export function notifyAddress(): string | undefined {
  return process.env.BOOKING_NOTIFY_EMAIL || undefined;
}

/**
 * Versendet eine E-Mail über Resend.
 * Ohne RESEND_API_KEY wird in der Entwicklung nur geloggt; in Produktion schlägt der Versand fehl.
 */
export async function sendMail(mail: Mail): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[mail:dev] RESEND_API_KEY fehlt – E-Mail wird nur geloggt:\n", {
        to: mail.to,
        subject: mail.subject,
        text: mail.text,
      });
      return true;
    }
    console.error("[mail] RESEND_API_KEY ist nicht gesetzt.");
    return false;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Felix <onboarding@resend.dev>",
    to: mail.to,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    replyTo: mail.replyTo,
  });
  if (error) {
    console.error("[mail] Versand fehlgeschlagen:", error.name, error.message);
    return false;
  }
  return true;
}
