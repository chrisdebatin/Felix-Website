# Felix – Website

Marketing-Website für **Felix**, den KI-Begleiter am Telefon (IGS Social Tech UG i. G., Düsseldorf).
Deutsch liegt auf `/`, Englisch auf `/en`.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · next-intl · Zod · Resend · Framer Motion · lucide-react · libphonenumber-js

---

## Schnellstart

```bash
npm install
cp .env.example .env.local   # Werte eintragen (für lokale Tests optional)
npm run dev                  # http://localhost:3000
```

Ohne `RESEND_API_KEY` werden E-Mails in der Entwicklung **nur in der Konsole ausgegeben** – Buchung und Kontaktformular lassen sich so komplett lokal testen. In Produktion schlägt der Versand ohne Key fehl (das Formular zeigt dann eine Fehlermeldung mit Telefonnummer).

| Befehl          | Zweck                              |
| --------------- | ---------------------------------- |
| `npm run dev`   | Entwicklungsserver                 |
| `npm run build` | Produktions-Build (inkl. Typprüfung) |
| `npm run start` | Produktions-Build lokal starten    |
| `npm run lint`  | ESLint                             |

## Umgebungsvariablen

| Variable                       | Pflicht | Beschreibung |
| ------------------------------ | ------- | ------------ |
| `NEXT_PUBLIC_SITE_URL`         | ja (Prod) | Öffentliche URL, z. B. `https://www.felix-ruft-an.de`. Für Canonical, hreflang, Sitemap, OG-Bild, JSON-LD. |
| `RESEND_API_KEY`               | ja (Prod) | API-Key von [Resend](https://resend.com). |
| `RESEND_FROM_EMAIL`            | ja (Prod) | Absender, z. B. `Felix <hallo@felix-ruft-an.de>`. Domain muss in Resend verifiziert sein. |
| `BOOKING_NOTIFY_EMAIL`         | ja (Prod) | Empfänger für neue Buchungen (und Kontaktanfragen). |
| `CONTACT_NOTIFY_EMAIL`         | nein    | Eigener Empfänger für Kontaktanfragen. |
| `NEXT_PUBLIC_VERCEL_ANALYTICS` | nein    | `1` = cookielose Vercel Web Analytics einbinden (vorher im Vercel-Projekt aktivieren). |

Siehe `.env.example`.

## Projektstruktur

```
app/
  [locale]/            Alle Seiten (DE ohne Präfix, EN unter /en)
    page.tsx           Startseite
    so-funktionierts/  preise/  faq/  ueber-uns/  kontakt/
    buchen/            3-Schritte-Buchung, buchen/danke = Erfolgsseite
    impressum/  datenschutz/  agb/  widerruf/
  actions/
    booking.ts         Server Action: Buchung prüfen + E-Mails senden
    contact.ts         Server Action: Kontaktformular
    checkout.ts        Platzhalter für Stripe Checkout (Anleitung im Kommentar)
  api/og/[locale]/     Open-Graph-Bild pro Sprache (statisch beim Build erzeugt)
  icon.svg, apple-icon.tsx, sitemap.ts, robots.ts
components/            UI, Layout (Header/Footer/Sticky-CTA), Startseiten-Sektionen, Formulare
i18n/                  next-intl: Routing (inkl. übersetzter Pfade), Navigation, Request-Config
lib/                   Site-Konfiguration, Metadaten, JSON-LD, Zod-Schemas, E-Mail
messages/de.json       ALLE deutschen Texte (Quelle für die Typen)
messages/en.json       Englische Texte (gleiche Struktur)
```

## Texte ändern

Alle Texte stehen in `messages/de.json` und `messages/en.json` – nichts ist im Code hartcodiert. Beide Dateien müssen dieselbe Struktur haben; `de.json` ist die Typ-Quelle, ein fehlender Schlüssel fällt beim Build auf.

- Platzhalter wie `{name}` und Tags wie `<link>…</link>` nicht entfernen.
- Apostrophe bitte typografisch (’) schreiben – ein einfaches `'` kann die Formatierung stören.
- Rechtstexte liegen unter `legal.*`. Über welchen Texten der Hinweis „Entwurf“ steht, legt `legalDraftDocs` in `lib/site.ts` fest.
- Kontaktdaten (E-Mail, Telefon) und Preis-Konstanten für JSON-LD stehen in `lib/site.ts`.

Englische URLs sind übersetzt (`/en/how-it-works`, `/en/pricing`, …) – Zuordnung in `i18n/routing.ts`.

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

## Bezahlung (später)

v1 hat bewusst keine Bezahlintegration. `app/actions/checkout.ts` beschreibt Schritt für Schritt, wie Stripe Checkout (Abo, 30 Tage Testphase) angebunden wird.

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
3. Nach der Verifizierung einen API-Key anlegen und `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `BOOKING_NOTIFY_EMAIL` in Vercel setzen.
4. Testbuchung auf der Live-Seite durchführen und Posteingang prüfen.

## Qualität

- `npm run lint` und `npm run build` laufen fehlerfrei.
- Lighthouse (mobil, lokal gemessen): Barrierefreiheit 100, Best Practices 100, Performance 95–98, SEO lokal 92 (die Canonical-URL zeigt bewusst auf die Live-Domain; live sollte es 100 sein).
- Keine Cookies, deshalb kein Cookie-Banner. Die Sprache steckt in der URL.
- Offene Punkte und Annahmen: siehe [`TODO.md`](./TODO.md).
