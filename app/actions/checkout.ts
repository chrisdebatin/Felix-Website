"use server";

/**
 * Platzhalter für die spätere Bezahlung per Stripe Checkout (Abo mit 30 Tagen Testphase).
 * In v1 gibt es bewusst keine Bezahlintegration – Buchungen laufen über app/actions/booking.ts.
 *
 * So lässt sich Stripe später ergänzen:
 *
 * 1. `npm install stripe` und Env-Variablen setzen:
 *      STRIPE_SECRET_KEY, STRIPE_PRICE_ID (Abo-Preis 10 €/Monat), STRIPE_WEBHOOK_SECRET
 * 2. Diese Action implementieren:
 *
 *      import Stripe from "stripe";
 *      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
 *
 *      const session = await stripe.checkout.sessions.create({
 *        mode: "subscription",
 *        line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
 *        subscription_data: { trial_period_days: pricing.trialDays, metadata: { bookingId } },
 *        payment_method_collection: "if_required", // Testphase ohne Zahlungsdaten möglich
 *        customer_email: bookerEmail,
 *        locale: locale === "en" ? "en" : "de",
 *        success_url: `${siteUrl}${getPathname({ locale, href: "/buchen/danke" })}?session_id={CHECKOUT_SESSION_ID}`,
 *        cancel_url: `${siteUrl}${getPathname({ locale, href: "/buchen" })}`,
 *      });
 *      return { ok: true, url: session.url };
 *
 * 3. In components/forms/BookingForm.tsx nach erfolgreichem submitBooking() diese Action
 *    aufrufen und mit `window.location.assign(url)` zu Stripe weiterleiten.
 * 4. Webhook-Route (z. B. app/api/stripe/webhook/route.ts) für
 *    `customer.subscription.*` und `invoice.*` anlegen.
 * 5. Kündigungsbutton nach § 312k BGB und Stripe-Kundenportal ergänzen.
 */

export type CheckoutResult = { ok: true; url: string } | { ok: false; reason: "not-implemented" };

export async function createCheckoutSession(): Promise<CheckoutResult> {
  return { ok: false, reason: "not-implemented" };
}
