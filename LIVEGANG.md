# dersut.ch live schalten – Schritt für Schritt

Alle E-Mails laufen über **info@dersut.ch** (Absender, Bestellkopien, Kontaktformular).
Das Postfach bleibt bei cyon. Du brauchst Konten bei **vercel.com** und **resend.com** (beide gratis).
Neon wird direkt in Vercel angelegt, dafür brauchst du kein eigenes Konto.

Befehle immer in **PowerShell** einfügen und mit Enter bestätigen.

---

## Schritt 1 – Neueste Version entpacken

`dersut-next.zip` aus dem Chat in den Download-Ordner laden, dann:

```powershell
Set-ExecutionPolicy -Scope Process Bypass -Force
Expand-Archive "$env:USERPROFILE\Downloads\dersut-next.zip" -DestinationPath C:\Projekte -Force
cd C:\Projekte\dersut-next
npm install
npm run fetch-assets
```

`fetch-assets` speichert die Dersut-Bilder im Projekt, damit sie mit hochgeladen werden.

## Schritt 2 – Vercel einrichten

```powershell
npm install -g vercel
vercel login
```

Im Browser bei Vercel anmelden (z. B. «Continue with Email»). Danach:

```powershell
cd C:\Projekte\dersut-next
vercel link
```

Fragen so beantworten:

| Frage | Antwort |
|---|---|
| Set up “C:\Projekte\dersut-next”? | `y` |
| Which scope? | dein Konto (Enter) |
| Link to existing project? | `n` |
| What’s your project’s name? | `dersut` |
| In which directory is your code located? | Enter (`./`) |
| Want to modify these settings? | `n` |

## Schritt 3 – Datenbank (Neon) in Vercel anlegen

1. <https://vercel.com> → Projekt **dersut** öffnen → Reiter **Storage** → **Create Database**.
2. **Neon** wählen → **Continue** → Region **Frankfurt (eu-central-1)** → Plan **Free** → **Create**.
3. Bei «Connect Project» alle drei Umgebungen anhaken (Development, Preview, Production) → **Connect**.

Vercel trägt `DATABASE_URL` jetzt automatisch ein. Die Tabellen legt die Webseite beim ersten Aufruf selbst an.

4. **Settings → Functions → Function Region** → **Frankfurt, Germany (fra1)** → Save
   (gleiche Region wie die Datenbank, damit die Seite schnell ist).

## Schritt 4 – Geheimschlüssel und Adresse eintragen

In PowerShell einen zufälligen Schlüssel erzeugen. Er wird direkt in die Zwischenablage kopiert:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))" | Set-Clipboard
```

In Vercel → Projekt **dersut** → **Settings → Environment Variables** → **Add New**:

| Key | Value | Environments |
|---|---|---|
| `SESSION_SECRET` | Ctrl+V (der Schlüssel aus der Zwischenablage) | alle |
| `SITE_URL` | `https://dersut.ch` | Production |

## Schritt 5 – Resend (E-Mail-Versand) einrichten

1. <https://resend.com> → Konto anlegen → **Domains → Add Domain**.
2. Domain: `dersut.ch`, Region: **Ireland (eu-west-1)** → **Add**.
3. Resend zeigt jetzt 3–4 DNS-Einträge. Diese bei cyon eintragen:
   <https://my.cyon.ch> → **Domains** → **dersut.ch** → **DNS-Einträge** → für jeden Eintrag **Eintrag hinzufügen**.

   | Typ | Name bei cyon | Wert (aus Resend kopieren) | Priorität |
   |---|---|---|---|
   | TXT | `resend._domainkey` | `p=MIGfMA0G…` (langer Schlüssel) | – |
   | MX | `send` | `feedback-smtp.eu-west-1.amazonses.com` | 10 |
   | TXT | `send` | `v=spf1 include:amazonses.com ~all` | – |
   | TXT | `_dmarc` (falls von Resend angezeigt) | `v=DMARC1; p=none;` | – |

   Bei cyon nur den vorderen Teil als Namen eintragen (also `send`, nicht `send.dersut.ch`).
   Diese Einträge betreffen nur den Versand über Resend. **Den bestehenden MX-Eintrag von dersut.ch nicht ändern**,
   sonst kommen keine E-Mails mehr bei info@dersut.ch an.

4. In Resend auf **Verify DNS Records** klicken. Das dauert meist wenige Minuten, bis alles grün ist.
5. **API Keys → Create API Key** → Name `dersut`, Permission **Sending access**, Domain `dersut.ch` → **Add** → Key kopieren.
6. In Vercel → **Settings → Environment Variables** → **Add New**:
   `RESEND_API_KEY` = der kopierte Key (beginnt mit `re_`), Environments: alle.

## Schritt 6 – Veröffentlichen

```powershell
cd C:\Projekte\dersut-next
vercel --prod
```

Am Ende steht eine Adresse wie `https://dersut-xxxx.vercel.app`. Die Seite läuft jetzt schon dort.

**Sofort danach** `https://dersut-xxxx.vercel.app/admin` öffnen und das Admin-Konto anlegen
(E-Mail `info@dersut.ch`, starkes Passwort). Die Einrichtungsseite gibt es nur, solange noch kein Konto existiert.
Dann **Einstellungen → Testmail senden** klicken: Die Testmail muss im cyon-Webmail bei info@dersut.ch ankommen.

## Schritt 7 – Domains auf Vercel zeigen lassen

1. Vercel → Projekt **dersut** → **Settings → Domains** → **Add Domain**:
   - `dersut.ch` → bei der Frage nach www: **Add www.dersut.ch and redirect it to dersut.ch** wählen
   - `dersutkaffee.ch` → **Redirect to** `dersut.ch` (301)
   - `www.dersutkaffee.ch` → **Redirect to** `dersut.ch` (301)
2. Vercel zeigt bei jeder Domain «Invalid Configuration» und die nötigen Werte an. Diese bei cyon eintragen
   (<https://my.cyon.ch> → Domains → jeweilige Domain → DNS-Einträge):

   | Domain | Typ | Name | Wert |
   |---|---|---|---|
   | dersut.ch | A | `@` (bzw. leer) | IP-Adresse aus Vercel, meist `76.76.21.21` |
   | dersut.ch | CNAME | `www` | Wert aus Vercel, meist `cname.vercel-dns.com` |
   | dersutkaffee.ch | A | `@` | gleiche IP wie oben |
   | dersutkaffee.ch | CNAME | `www` | gleicher Wert wie oben |

   Bestehende **A**-, **AAAA**- und **CNAME**-Einträge für `@` und `www`, die noch auf cyon zeigen, vorher löschen.
   **MX-Einträge nicht anfassen.**
3. Nach einigen Minuten bis wenigen Stunden zeigt Vercel überall «Valid Configuration». Das SSL-Zertifikat
   erstellt Vercel automatisch.

Fertig: **https://dersut.ch** ist live.

## Später: Änderungen veröffentlichen

```powershell
cd C:\Projekte\dersut-next
vercel --prod
```

## Vor dem Livegang noch ergänzen

In `C:\Projekte\dersut-next\src\lib\config.ts` (mit Notepad öffnen) die Firmenadresse, UID/MWST-Nummer und
Geschäftsführung eintragen. Die Adresse ist im Impressum Pflicht, und erst damit erscheint der Swiss-QR-Code
für die Zahlung. Danach `vercel --prod` ausführen.

```powershell
notepad C:\Projekte\dersut-next\src\lib\config.ts
```

## Hilfe bei Problemen

- **«vercel» wird nicht erkannt:** PowerShell schliessen, neu öffnen, `Set-ExecutionPolicy -Scope Process Bypass -Force` eingeben, nochmals versuchen.
- **Seite zeigt «Ein Fehler ist aufgetreten»:** Vercel → Projekt → **Logs** öffnen und mir einen Screenshot schicken.
  Meist fehlt eine Environment Variable. Nach dem Ergänzen `vercel --prod` erneut ausführen.
- **Testmail kommt nicht an:** In Resend prüfen, ob die Domain auf «Verified» steht.
