# Dersut Kaffee Schweiz – Webseite & Onlineshop (Next.js)

> **Livegang Schritt für Schritt mit PowerShell: siehe [LIVEGANG.md](LIVEGANG.md).**

Webseite mit Onlineshop für die Dersut Kaffee GmbH, offizieller Vertrieb von Dersut Caffè in der Schweiz.

- **Next.js 16** (App Router, TypeScript) – Hosting auf **Vercel**
- **Neon** (Postgres) für Bestellungen, Produkte, Nachrichten, Admin-Zugänge
- **Resend** für alle E-Mails (Absender `info@dersut.ch`)
- **Eine E-Mail-Adresse für alles:** `info@dersut.ch` (Absender, Bestellkopien, Kontaktformular)
- **cyon** bleibt Registrar für die Domains und Anbieter der Postfächer (Webmail)

## Funktionen

- Seiten: Startseite, Shop, Produktseiten, Geschichte, Qualität & Röstung, Zertifizierungen, Nachhaltigkeit,
  Offizieller Vertrieb, Gastronomie, Versand & Zahlung, Kontakt, AGB, Datenschutz, Impressum
- Warenkorb, Kasse, Lieferung nur Schweiz, Versand pauschal CHF 12.–, Preise inkl. 8.1 % MWST
- Zahlung ausschliesslich per Vorauskasse: Bestellnummer (z. B. `DS-26-1001`), IBAN und Swiss-QR-Code auf der
  Bestätigungsseite und in der E-Mail
- Admin unter `/admin`: bezahlt / versendet (mit Post-Sendungsnummer) / storniert markieren, automatische
  Kunden-E-Mails, Sammelaktionen, Suche, CSV-Export, Produkte inkl. Bildupload, Lagerbestand, Kontaktanfragen,
  mehrere Admin-Zugänge, Testmail
- Hauptadresse ist `https://dersutkaffee.ch`; `dersut.ch` und alle `www.`-Varianten leiten dorthin weiter

---

## 1. Lokal starten (Windows PowerShell)

Voraussetzung: [Node.js 20 oder neuer](https://nodejs.org) und [Git](https://git-scm.com).

```powershell
cd C:\Projekte\dersut-next        # Ordner, in den Sie das Projekt entpackt haben
npm install
Copy-Item .env.example .env.local
notepad .env.local                # Werte eintragen (siehe unten)
npm run dev
```

Dann <http://localhost:3000> öffnen, Admin unter <http://localhost:3000/admin>.

Zum Testen ganz ohne Neon kann in `.env.local` auch `DATABASE_URL="pglite:./.data"` stehen
(lokale Test-Datenbank im Ordner `.data`). Ohne `RESEND_API_KEY` werden E-Mails nur in der Konsole angezeigt.

`SESSION_SECRET` erzeugen (zufälliger Wert, mind. 24 Zeichen):

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

## 2. Offizielle Dersut-Bilder herunterladen (einmalig)

Die Bilder (Logo, Fotos, Produktfotos, Zertifikate) stammen von dersut.it. Dieser Befehl lädt sie in
`public/brand/`, danach liefert die Webseite sie selbst aus:

```powershell
npm run fetch-assets
```

Ohne diesen Schritt werden die Bilder direkt von dersut.it geladen.

## 3. Neon (Datenbank)

1. Auf <https://neon.tech> ein Projekt anlegen, Region **AWS Europe Central 1 (Frankfurt)**.
2. *Connect* → **Pooled connection** kopieren → als `DATABASE_URL` eintragen.
3. Test: `npm run db:setup`. Die Tabellen und die zwei Startprodukte legt die Webseite beim ersten Aufruf selbst an.

## 4. GitHub und Vercel

```powershell
git init
git add .
git commit -m "Dersut Webseite"
git branch -M main
git remote add origin https://github.com/IHR-KONTO/dersut-next.git
git push -u origin main
```

1. Auf <https://vercel.com> → *Add New → Project* → das GitHub-Repository importieren (Framework: Next.js).
2. Unter *Settings → Environment Variables* eintragen: `DATABASE_URL`, `RESEND_API_KEY`, `SESSION_SECRET`,
   `SITE_URL=https://dersutkaffee.ch`. Region der Functions: *Settings → Functions → Frankfurt (fra1)*.
3. Optional für Bild-Uploads im Admin: *Storage → Blob → Create* und mit dem Projekt verbinden
   (setzt `BLOB_READ_WRITE_TOKEN` automatisch).
4. *Deploy*. Jeder weitere `git push` veröffentlicht automatisch.

## 5. Domains bei cyon auf Vercel zeigen

In Vercel unter *Settings → Domains* hinzufügen: `dersutkaffee.ch` (Hauptadresse), `www.dersutkaffee.ch`,
`dersut.ch` und `www.dersut.ch` (alle drei mit Weiterleitung auf dersutkaffee.ch).

Im cyon-Kundencenter → *Domains → DNS-Editor* für **dersut.ch**:

| Typ | Name | Wert |
|---|---|---|
| A | `@` (dersut.ch) | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Für **dersutkaffee.ch** dieselben zwei Einträge. Vercel zeigt die exakten Werte unter *Domains* an;
falls sie abweichen, gelten die Angaben von Vercel. Bestehende A/AAAA-Einträge für `@` und `www`, die auf cyon
zeigen, entfernen.

**Wichtig:** Die **MX-Einträge** (E-Mail) **nicht ändern**. Das Postfach `info@dersut.ch` bleibt bei cyon und
funktioniert wie bisher im cyon-Webmail.

## 6. Resend (E-Mail-Versand)

1. Auf <https://resend.com> Konto anlegen → *Domains → Add Domain* → `dersut.ch`, Region **eu-west-1 (Irland)**.
2. Resend zeigt einige DNS-Einträge (TXT für DKIM, MX und TXT für die Subdomain `send`). Diese genau so im
   cyon-DNS-Editor für dersut.ch eintragen. Sie betreffen nur `send.dersut.ch` bzw. `resend._domainkey` und
   stören die cyon-Postfächer nicht.
3. Falls bei cyon bereits ein SPF-Eintrag (`v=spf1 …`) für `@` existiert, diesen **nicht** doppelt anlegen.
4. Nach der Verifizierung *API Keys → Create* → als `RESEND_API_KEY` in Vercel eintragen und neu deployen.
5. Im Admin unter *Einstellungen → Testmail senden* prüfen.

## 7. Admin einrichten

`https://dersutkaffee.ch/admin` aufrufen und **sofort** das erste Konto anlegen. Die Einrichtungsseite ist nur
verfügbar, solange noch kein Konto existiert. Weitere Zugänge unter *Einstellungen*.

## 8. Noch offene Angaben in `src/lib/config.ts`

| Feld | Wozu |
|---|---|
| `company.street`, `zip`, `city` | Impressum, Footer, E-Mails und **Swiss-QR-Code** (erscheint erst mit vollständiger Adresse) |
| `company.uid`, `vatNo`, `register`, `managing` | Impressum (leere Felder werden ausgeblendet) |
| `company.phone` | optional |

Nach der Änderung: `git commit -am "Firmenangaben"` und `git push`.

## Täglicher Ablauf

1. Neue Bestellung → E-Mail an info@dersut.ch, Bestellung erscheint im Admin unter *Zu erledigen*.
2. Zahlung auf dem Konto mit Mitteilung «Bestellung DS-…» → im Admin **Bezahlt ✓** (Kunde erhält E-Mail).
3. Paket versenden → **Als versendet markieren**, optional mit Sendungsnummer (Kunde erhält E-Mail mit Link).

Datensicherung: Neon erstellt automatisch Sicherungen (Point-in-Time-Restore). Zusätzlich im Admin jederzeit
*CSV exportieren*.
