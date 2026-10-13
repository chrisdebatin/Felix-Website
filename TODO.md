# TODO: offene Punkte

Inhaltliche Grundlage ist das Briefing Version 3 vom 13.10.2026.
Fehlende Angaben werden auf der Website nicht angezeigt. Im Code sind sie mit `TODO PLATZHALTER` markiert:
`grep -rn "TODO PLATZHALTER" app components lib`

## 1. Platzhalter (werden nachgeliefert)

Alle Werte kommen in `lib/site.ts`. Sobald ein Wert eingetragen ist, erscheint er automatisch an den richtigen Stellen.

| # | Platzhalter | Feld in `lib/site.ts` | Erscheint in |
| --- | --- | --- | --- |
| 1 | Rufnummer von Felix | `felixPhone` | FAQ „Welche Nummer ruft an?“ (bis dahin ausgeblendet) |
| 2 | Kontakt-E-Mail, Telefon, Erreichbarkeit | `company.email`, `company.phone`, `company.hours` | Footer, Kontakt, Impressum, Datenschutz |
| 3 | Anschrift der IGS Social Tech UG bestätigen (bisher Kruppstraße 108, 40227 Düsseldorf) | `company.address` | Footer, Kontakt, Impressum, Datenschutz, JSON-LD |
| 4 | Geschäftsführung, USt-ID, Verantwortlich nach § 18 Abs. 2 MStV | `company.managingDirector`, `company.vatId`, `company.responsibleForContent` | Impressum |
| 5 | Datenschutzbeauftragte/r | `company.dataProtectionOfficer` | Datenschutz, Abschnitt 1 |
| 6 | Ort für die Seite „Über uns“ | Text `about.hero.text` in `messages/*.json` | Über uns, Einleitung |

## 2. Rechtliches

- [ ] **Impressum ist derzeit unvollständig.** Ohne Anschrift, Vertretung und Kontaktdaten erfüllt es § 5 DDG nicht. Die Platzhalter 2 bis 4 haben deshalb Vorrang.
- [ ] Datenschutzerklärung rechtlich prüfen lassen. Danach in `lib/site.ts` `"privacy"` aus `legalDraftDocs` entfernen und `legalLastUpdated` setzen.
- [ ] Prüfen, ob ein Vertrag zur Auftragsverarbeitung mit Vercel und Resend abgeschlossen bzw. akzeptiert ist (so steht es in der Datenschutzerklärung).
- [ ] Aufsichtsbehörde (derzeit LDI NRW) bestätigen, sobald die Anschrift feststeht.
- [ ] Abschnitt „Verbraucherstreitbeilegung“ ist entfernt. Nach der Rechtsprüfung entscheiden, ob er wieder nötig ist.
- [ ] Nutzung des Pflegeunion-Logos und der CI schriftlich freigeben lassen (Pflegeunion bzw. IGS Management GmbH).

## 3. Technik und Betrieb

- [ ] **Kontaktformular aktivieren:** Resend-Konto anlegen, Domain `felix-ruft-an.de` verifizieren, `RESEND_API_KEY` und `RESEND_FROM_EMAIL` in Vercel setzen, neu deployen (Anleitung im README). Ohne das zeigt das Formular auf der Live-Seite eine Fehlermeldung. Anfragen gehen an `info@felix-ruft-an.de`.
- [ ] Vercel Web Analytics ist nicht aktiv. Falls es eingeschaltet wird: `NEXT_PUBLIC_VERCEL_ANALYTICS=1` setzen und die Datenschutzerklärung um einen Abschnitt zur Reichweitenmessung ergänzen.
- [ ] Spam-Schutz: Honeypot und Mindest-Ausfüllzeit sind aktiv. Bei Bedarf Rate-Limiting ergänzen (z. B. Vercel Firewall).
- [ ] Nach dem Livegang Google Search Console einrichten (Sitemap: `/sitemap.xml`).

## 4. Bilder und CI (optional)

- [ ] Platzhalter-Illustrationen durch echte Fotos ersetzen (`components/ui/PhotoPlaceholder.tsx`), z. B. auf „So funktioniert’s“ und „Über uns“.
- [ ] Optional: Script-Schrift der Pflegeunion („Nifty Script“) für einzelne Akzentwörter, nur mit Lizenz.
- [ ] Optional: Pflegeunion-Logo als Hauptlogo im Header statt des Felix-Zeichens.
