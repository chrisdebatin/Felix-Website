# Felix · Website

Informationswebsite für **Felix**, den KI-Telefonassistenten für Kundinnen und Kunden der Pflegeunion (ambulante Pflege und Tagespflege). Anbieterin: IGS Social Tech UG (haftungsbeschränkt) i. G., in Zusammenarbeit mit der Pflegeunion.
Deutsch liegt auf `/`, Englisch auf `/en`. Es gibt keine Online-Buchung und keine Preise: Kundinnen und Kunden lernen Felix über ihre Pflegekraft kennen.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · next-intl · Zod · Resend · Framer Motion · lucide-react · libphonenumber-js

---

## Inhaltliche Grundlage

Alle Inhalte folgen dem **Briefing für den Website-Agenten, Version 3 (13.10.2026)**. Die wichtigsten Regeln:

- Nur Fakten aus dem Briefing verwenden, nichts dazuerfinden. Kurze, einfache Sätze in der Sie-Form, keine Gedankenstriche im Fließtext.
- Felix ist ein „KI-Telefonassistent“, das Angebot ein wöchentlicher „Check-in“. Keine Aussagen zum Datenstandort und keine Rechtsgrundlagen zum Dienst Felix auf der Website.
- Beispielgespräche sind immer als „Beispiel“ gekennzeichnet.
- **Platzhalter:** Fehlende Angaben (Anschrift, Kontaktdaten, Rufnummer von Felix, Impressumsangaben, Datenschutzbeauftragte/r) stehen als `null` in `lib/site.ts`. Solange ein Wert `null` ist, wird das betroffene Element nicht angezeigt. Im Code markiert `TODO PLATZHALTER` jede dieser Stellen (`grep -rn "TODO PLATZHALTER" app components lib`).

## Schnellstart

```bash
npm install
cp .env.example .env.local   # Werte eintragen (für lokale Tests optional)
npm run dev                  # http://localhost:3000
```

Ohne `RESEND_API_KEY` werden E-Mails aus dem Kontaktformular in der Entwicklung **nur in der Konsole ausgegeben**. In Produktion schlägt der Versand ohne Key fehl, und das Formular zeigt eine Fehlermeldung.

| Befehl          | Zweck                              |
| --------------- | ---------------------------------- |
| `npm run dev`   | Entwicklungsserver                 |
| `npm run build` | Produktions-Build (inkl. Typprüfung) |
| `npm run start` | Produktions-Build lokal starten    |
| `npm run lint`  | ESLint                             |

## Umgebungsvariablen

| Variable                       | Pflicht | Beschreibung |
| ------------------------------ | ------- | ------------ |
| `NEXT_PUBLIC_SITE_URL`         | nein    | Öffentliche URL. Standard in Produktion: `https://www.felix-ruft-an.de`. Für Canonical, hreflang, Sitemap, OG-Bild, JSON-LD. |
| `RESEND_API_KEY`               | ja (Prod) | API-Key von [Resend](https://resend.com) für das Kontaktformular. |
| `RESEND_FROM_EMAIL`            | ja (Prod) | Absender, z. B. `Felix <info@felix-ruft-an.de>`. Die Domain muss in Resend verifiziert sein. |
| `CONTACT_NOTIFY_EMAIL`         | nein    | Empfänger für Anfragen aus dem Kontaktformular. Standard: `info@felix-ruft-an.de`. |
| `NEXT_PUBLIC_VERCEL_ANALYTICS` | nein    | `1` = cookielose Vercel Web Analytics einbinden. Derzeit aus; beim Einschalten die Datenschutzerklärung ergänzen. |

Siehe `.env.example`.

## Projektstruktur

```
app/
  [locale]/            Alle Seiten (DE ohne Präfix, EN unter /en)
    page.tsx           Startseite
    so-funktionierts/  faq/  ueber-uns/  kontakt/
    impressum/  datenschutz/
  actions/contact.ts   Server Action: Kontaktformular prüfen und per E-Mail weiterleiten
  api/og/[locale]/     Open-Graph-Bild pro Sprache (statisch beim Build erzeugt)
  icon.svg, apple-icon.tsx, sitemap.ts, robots.ts
components/            UI, Layout (Header/Footer), Startseiten-Sektionen, Formulare
i18n/                  next-intl: Routing (inkl. übersetzter Pfade), Navigation, Request-Config
lib/                   Site-Konfiguration und Platzhalter (site.ts), Metadaten, JSON-LD, Zod-Schema, E-Mail
messages/de.json       ALLE deutschen Texte (Quelle für die Typen)
messages/en.json       Englische Texte (gleiche Struktur)
```

Entfernte Seiten (`/buchen`, `/preise`, `/agb`, `/widerruf` und die englischen Gegenstücke) leiten per `next.config.ts` dauerhaft auf die Startseite um.

## Texte ändern

Alle Texte stehen in `messages/de.json` und `messages/en.json`. Beide Dateien müssen dieselbe Struktur haben; `de.json` ist die Typ-Quelle, ein fehlender Schlüssel fällt beim Build auf.

- Platzhalter wie `{number}` und Tags wie `<link>…</link>` nicht entfernen.
- Apostrophe bitte typografisch (’) schreiben. Ein einfaches `'` kann die Formatierung stören.
- Rechtstexte liegen unter `legal.*`. Firmenangaben im Impressum und im Abschnitt „Verantwortlicher“ der Datenschutzerklärung kommen aus `lib/site.ts`. Über welchen Texten der Hinweis „Entwurf“ steht, legt `legalDraftDocs` in `lib/site.ts` fest (derzeit nur Datenschutz).

Englische URLs sind übersetzt (`/en/how-it-works`, `/en/about`, …). Die Zuordnung steht in `i18n/routing.ts`.

## Design-System

Felix nutzt die CI der **Pflegeunion** (Farben, Schrift, Formen) mit einem eigenen Felix-Zeichen in derselben Bildsprache. Die Tokens stehen in `app/globals.css` im `@theme`-Block (Tailwind v4 ersetzt damit die frühere `tailwind.config.js`).

| Token | Wert | Einsatz |
| --- | --- | --- |
| `forest` | `#00633A` | Waldgrün aus dem Logo: Flächen, Links, Icons, Felix-Sprechblasen |
| `forest-dark` / `forest-deep` | `#004D2C` / `#003820` | Hover, Überschriften, Footer, Schrift auf Lime |
| `lime` | `#AFCA0B` | Haupt-Buttons (mit `forest-deep`-Schrift), Akzente, Hügel |
| `lime-soft`, `sage` | `#E7F1C6`, `#F3F7E3` | Badges, helle Abschnitte |
| `ink`, `muted`, `line` | `#1C2420`, `#55605A`, `#DDE5CF` | Fließtext, Nebentext, Rahmen |
| `danger` / `danger-soft` | `#B42318` / `#FEF3F2` | Fehlermeldungen, Notruf-Hinweis |

- **Schrift:** Nunito Sans (Google Fonts, über `next/font`), Überschriften in 800. Die Script-Schrift der Pflegeunion („Nifty Script“) ist bewusst nicht eingebunden (Lizenz unklar, schwerer lesbar).
- **Formen:** Ringe und „Hügel“ aus dem Pflegeunion-Logo in `components/ui/BrandShapes.tsx`.
- **Logo:** `components/Logo.tsx` (Felix-Zeichen: grüner Ring, Lime-Ring, Hügel, Telefonhörer als Lächeln). Gleiche Geometrie in `app/icon.svg` und `lib/og/mark.tsx`. Das Pflegeunion-Logo liegt in `public/brand/pflegeunion-logo.png` und erscheint als Partner-Hinweis (`components/ui/PartnerBadge.tsx`).

**Barrierefreiheit:** Weiße Schrift auf Lime erreicht nur 1,9:1. Lime-Buttons haben deshalb immer dunkelgrüne Schrift (`forest-deep`, 7,1:1), und Lime wird nie als Textfarbe auf Weiß verwendet. Weiß auf `forest` hat 7,4:1. Auf dunkelgrünen Flächen wird der Fokusrahmen per `[--focus-color:var(--color-lime)]` auf Lime umgestellt.

Grundschrift ist 18 px (`html { font-size: 112.5% }`), Zeilenhöhe 1.6. Animationen respektieren „Bewegung reduzieren“. Inhalte im ersten sichtbaren Bereich werden nicht eingeblendet (sonst leidet der LCP-Wert).

---

## Deployment auf Vercel

1. Repository zu GitHub pushen.
2. Auf [vercel.com](https://vercel.com) → **Add New… → Project** → Repository importieren. Framework „Next.js“ wird erkannt, keine weiteren Build-Einstellungen nötig.
3. Unter **Settings → Environment Variables** die Variablen aus der Tabelle oben für *Production* (und optional *Preview*) eintragen.
4. **Deploy**. Server-Funktionen laufen in Frankfurt (`fra1`), festgelegt in `vercel.json`.

### Domain `felix-ruft-an.de` (United Domains) verbinden

Die Domain bleibt bei United Domains; dort werden nur zwei DNS-Einträge gesetzt. So bleiben E-Mail-Einträge (MX) bei United Domains unberührt.

1. **Vercel:** Projekt → **Settings → Domains** → `www.felix-ruft-an.de` hinzufügen, danach `felix-ruft-an.de`. Vercel fragt, ob die Hauptdomain auf `www` weiterleiten soll → ja (empfohlen).
   Vercel zeigt anschließend die benötigten DNS-Werte an.
2. **United Domains:** Einloggen → **Portfolio** → Domain `felix-ruft-an.de` → **DNS-Einstellungen**.
   - Vorhandene A-/AAAA-Einträge für die Hauptdomain und `www` (Parkseite von United Domains) entfernen bzw. ersetzen.
   - **A-Record** für die Hauptdomain (Subdomain-Feld leer bzw. `@`): IP-Adresse, die Vercel anzeigt (üblich: `76.76.21.21`).
   - **CNAME** für `www`: Ziel, das Vercel anzeigt (üblich: `cname.vercel-dns.com`).
   - Speichern.
3. Warten, bis Vercel beide Domains als **Valid Configuration** anzeigt (meist Minuten, selten bis 24 h). Das SSL-Zertifikat erstellt Vercel automatisch.
4. In Vercel `NEXT_PUBLIC_SITE_URL=https://www.felix-ruft-an.de` setzen und neu deployen.

### E-Mail-Versand mit Resend

1. In Resend **Domains → Add Domain** → `felix-ruft-an.de` (Region EU / Frankfurt wählen).
2. Resend zeigt DNS-Einträge (SPF als TXT, DKIM als TXT `resend._domainkey`, MX für eine Unterdomain wie `send`). Diese **zusätzlich** in den DNS-Einstellungen bei United Domains anlegen. Bestehende MX-Einträge der Hauptdomain nicht löschen.
3. Nach der Verifizierung einen API-Key anlegen und `RESEND_API_KEY` sowie `RESEND_FROM_EMAIL` in Vercel setzen. Anfragen gehen automatisch an `info@felix-ruft-an.de`.
4. Testanfrage über das Kontaktformular der Live-Seite senden und den Posteingang von info@felix-ruft-an.de prüfen.

## Qualität

- `npm run lint` und `npm run build` laufen fehlerfrei.
- Lighthouse (mobil, lokal gemessen): Barrierefreiheit 100, Best Practices 100, Performance 95–98, SEO lokal 92 (die Canonical-URL zeigt bewusst auf die Live-Domain; live sollte es 100 sein).
- Keine Cookies, deshalb kein Cookie-Banner. Die Sprache steckt in der URL. Vercel Web Analytics ist nicht aktiv.
- Offene Punkte und Annahmen: siehe [`TODO.md`](./TODO.md).
