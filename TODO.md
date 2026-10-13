# TODO – offene Punkte für Chris

Alle Stellen im Code sind mit `TODO(chris):` markiert (`grep -rn "TODO(chris)" app components lib`).
Inhalte stehen in `messages/de.json` und `messages/en.json` – bei Textänderungen immer beide Dateien anpassen.

## 1. Vor dem Livegang zwingend

- [ ] **Rechtstexte prüfen lassen** (Impressum, Datenschutz, AGB, Widerruf). Alle sind Vorlagen.
  Danach `showLegalDraftNotice = false` und `legalLastUpdated` in `lib/site.ts` setzen.
  → `components/sections/LegalPage.tsx`, `lib/site.ts`
- [ ] **Platzhalter in eckigen Klammern ersetzen** (in `messages/de.json` und `en.json` unter `legal.*`):
  Geschäftsführung, Telefon, E-Mail, HRB-Nummer (nach Eintragung; dann auch „i. G.“ überall entfernen), USt-IdNr., Verantwortlicher nach § 18 MStV, Datenschutzbeauftragte/r (falls benannt), Dienstleister für Telefonie/Spracherkennung/KI-Modell, Löschfrist für Gesprächszusammenfassungen, Zahlungsart in den AGB.
- [ ] **Kontaktdaten** (E-Mail, Telefon) in `lib/site.ts` eintragen. Sie erscheinen in Footer, Kontaktseite, Buchungsseite und JSON-LD. Erreichbarkeit unter `contact.details.hours`.
- [ ] **Kündigungsbutton nach § 312k BGB:** Bei Abo-Verträgen, die online abgeschlossen werden, ist eine Kündigungsschaltfläche („Verträge hier kündigen“) auf der Website Pflicht. Noch nicht umgesetzt.
- [ ] **Widerruf und früher Leistungsbeginn:** Der erste Anruf kommt innerhalb der 14-tägigen Widerrufsfrist. Mit der Anwältin bzw. dem Anwalt klären, ob im Buchungsformular eine ausdrückliche Zustimmung zum vorzeitigen Beginn nötig ist (§ 356 Abs. 4, § 357a BGB). Weil der erste Monat kostenlos ist, entsteht praktisch kein Wertersatz.
- [ ] **OS-Plattform:** Die EU-Plattform zur Online-Streitbeilegung wurde zum 20.07.2025 eingestellt. Deshalb steht im Impressum statt des Links ein Hinweis darauf und die VSBG-Erklärung. Bitte juristisch bestätigen.
- [ ] **Gesundheitsdaten (Art. 9 DSGVO):** Die Einwilligung steht in der Datenschutz-Checkbox im Buchungsformular. Prüfen, ob das reicht oder ob eine eigene Checkbox bzw. die mündliche Einwilligung im ersten Gespräch nötig ist. Außerdem klären: Vertrag mit der Pflegeunion (Auftragsverarbeitung oder gemeinsame Verantwortung) für die Weitergabe des Feedbacks.
- [ ] **„Server in der EU“** stimmt nur, wenn alle Dienstleister (Telefonie, Sprach-KI, Datenbank, Resend-Region) in der EU verarbeiten. Hosting-Funktionen laufen über `vercel.json` in Frankfurt. → `components/home/TrustSection.tsx`, FAQ `data`, Datenschutz Abschnitt 7
- [ ] **Domain, Resend und Env-Variablen** einrichten (siehe README, Abschnitt „Domain verbinden“).

## 2. Inhaltliche Annahmen bestätigen

| Annahme | Wo |
| --- | --- |
| Preis 10 €/Monat inkl. MwSt., erster Monat kostenlos, monatlich zum Monatsende kündbar | `lib/site.ts`, `messages/*` (`pricing`, `common.price`, `faq.items.costs`, `emails`) |
| Bezahlung: keine Zahlungsdaten bei Buchung, „wir melden uns vor Ende des Gratismonats“ | `pricing.notes`, AGB § 4, `app/[locale]/preise/page.tsx` |
| Erster Anruf **innerhalb von 2 Werktagen** | `bookingSuccess`, `howItWorks.flow`, `emails.booking` |
| Anrufdauer **ca. 5–10 Minuten** | `howItWorks.duration` |
| Zeitfenster: vormittags 9–12, nachmittags 14–17, abends 17–19 Uhr | `common.timeWindows` |
| Rhythmen: täglich / mehrmals pro Woche / wöchentlich | `common.rhythms` |
| Feste Rufnummer von Felix: **[Rufnummer folgt]** | `faq.items.number`, `bookingSuccess.next` |
| Nicht abgehoben → zweiter Versuch nach ca. 30 Minuten, dann nächster Termin | `faq.items.missed` |
| **Keine Tonaufnahme**, nur schriftliche Zusammenfassung; kein Mensch hört live mit | `faq.items.recording`, Datenschutz Abschnitt 7 |
| Notfall: Felix rät zur 112 bzw. zum Anruf beim Pflegedienst | `faq.items.emergency` |
| Felix spricht zurzeit nur Deutsch | `faq.items.languages` |
| Weitergabe an den Pflegedienst nur nach ausdrücklicher Zustimmung im Gespräch | `howItWorks.feedback`, `faq.items.careService`, Datenschutz Abschnitt 8 |
| Kündigen und Pausieren per E-Mail, Telefon oder Kontaktformular; Uhrzeit auch im Gespräch änderbar | `faq.items.cancel`, `changeTime`, `pause`, `howItWorks.pause` |
| Angehörige bekommen „auf Wunsch eine kurze Rückmeldung“ (mit Zustimmung) – geplant? | `home.benefits.forFamily.items[3]` |
| Beispielfragen von Felix entsprechen dem echten Gesprächsleitfaden | `howItWorks.topics` |
| Felix nutzt „er“ als Pronomen (DE); im Englischen meist neutral formuliert | gesamte Texte |
| Formulierung zur Pflegeunion (Footer, Über uns, Impressum) | `footer.disclaimer`, `about.partner`, `legal.imprint` |
| Team: Namen, Rollen, Beschreibung | `about.team` |
| Kann jeder Felix buchen oder nur Kundinnen und Kunden der Pflegeunion? Falls nur Pflegeunion: Feld im Buchungsformular ergänzen | `components/forms/BookingForm.tsx` |

## 3. CI und Bilder

- [ ] **Pflegeunion-Logo und -CI:** Felix nutzt jetzt Farben, Schrift und Logo-Formen der Pflegeunion, und das Pflegeunion-Logo erscheint als Partner-Hinweis (Startseite, Footer, Über uns; im Vorschaubild für geteilte Links nur als Text). Die ursprüngliche Vorgabe war „eigenständig, nicht an die Pflegeunion anlehnen“. Nutzung schriftlich von der Pflegeunion (IGS Management GmbH) freigeben lassen. → `components/ui/PartnerBadge.tsx`, `public/brand/pflegeunion-logo.png`
- [ ] Optional: Script-Schrift der Pflegeunion („Nifty Script“) für einzelne Akzentwörter – nur mit Lizenz; Schriftdateien bitte bereitstellen.
- [ ] Optional: Pflegeunion-Logo als Hauptlogo im Header statt des Felix-Zeichens (`components/Logo.tsx`, `components/layout/Header.tsx`).

- [ ] Platzhalter-Illustrationen durch echte Fotos ersetzen (`components/ui/PhotoPlaceholder.tsx`, Prop `photo` beschreibt das gewünschte Motiv):
  „So funktioniert’s“ (Seniorin am Telefon), „Über uns“ (Teamfoto + 3 Porträts).
- [ ] Optional: Foto im Hero hinter der Gesprächskarte (`components/home/Hero.tsx`).

## 4. Technik und Betrieb

- [ ] Buchungen kommen derzeit nur per E-Mail an. Später an Telefonie-System bzw. Datenbank anbinden (`app/actions/booking.ts`).
- [ ] Stripe Checkout (Abo mit 30-Tage-Trial) nach Anleitung in `app/actions/checkout.ts`.
- [ ] Spam-Schutz: Honeypot und Mindest-Ausfüllzeit sind aktiv. Bei Bedarf Rate-Limiting ergänzen (z. B. Vercel Firewall oder Upstash).
- [ ] Vercel Web Analytics: im Vercel-Projekt aktivieren und `NEXT_PUBLIC_VERCEL_ANALYTICS=1` setzen. Der Abschnitt in der Datenschutzerklärung ist schon da; ohne Analytics den Abschnitt 4 entfernen.
- [ ] Nach dem Livegang Lighthouse und die Google Search Console prüfen (Sitemap: `/sitemap.xml`).
