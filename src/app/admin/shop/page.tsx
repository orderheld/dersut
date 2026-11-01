import type { Metadata } from 'next';
import { ActionForm } from '@/components/admin/ActionForm';
import { CategoryEditor } from '@/components/admin/CategoryEditor';
import { requireAdmin } from '@/lib/admin';
import { config } from '@/lib/config';
import { query } from '@/lib/db';
import { chf, ibanFormat } from '@/lib/format';
import { currentSettings } from '@/lib/settings-core';
import { saveSettingsAction } from '../actions';
import { testCodeAction } from '../testcode-actions';
import { CopyButton } from '@/components/CopyButton';
import { getTestCode, TEST_TOTAL } from '@/lib/testcode';
import { absUrl } from '@/lib/format';

export const metadata: Metadata = { title: 'Firma & Shop' };

export default async function ShopSettings() {
  await requireAdmin();
  const rows = await query<{ category: string; n: number }>(`SELECT category, COUNT(*)::int AS n FROM products WHERE category <> '' GROUP BY category`);
  const counts = Object.fromEntries(rows.map((r) => [r.category, r.n]));
  const c = config.company;
  const s = currentSettings();
  const test = await getTestCode();
  const testLink = test.enabled ? absUrl(`/api/testcode?c=${encodeURIComponent(test.code)}`) : '';

  return (
    <>
      <header className="pagehead">
        <div><h1>Firma &amp; Shop</h1><p className="muted">Stammdaten an einem Ort. Sie erscheinen im Impressum, im Fuss der Webseite, auf Rechnungen, Lieferscheinen, Etiketten und in allen E-Mails.</p></div>
      </header>
      <ActionForm action={saveSettingsAction} className="grid2">
        <div>
          <section className="card form">
            <h2>Firma</h2>
            <label>Firmenname<input name="company_name" required defaultValue={c.name} /></label>
            <label>Strasse und Nr.<input name="company_street" required defaultValue={c.street} /></label>
            <div className="row2">
              <label>PLZ<input name="company_zip" required defaultValue={c.zip} /></label>
              <label>Ort<input name="company_city" required defaultValue={c.city} /></label>
            </div>
            <div className="row2">
              <label>UID<input name="company_uid" defaultValue={c.uid} placeholder="CHE-123.456.789" /></label>
              <label>MWST-Nummer<input name="company_vatNo" defaultValue={c.vatNo} placeholder="CHE-123.456.789 MWST" /></label>
            </div>
            <label>Handelsregister<input name="company_register" defaultValue={c.register} /></label>
          </section>
          <section className="card form">
            <h2>Kontakt</h2>
            <label>E-Mail-Adresse <span className="muted">(für alles: Absender, Bestellkopien, Kontaktformular)</span><input name="email" type="email" required defaultValue={config.email.info} /></label>
            <p className="muted small" style={{ marginTop: -8 }}>Muss auf @dersut.ch enden, weil nur diese Domain für den Versand eingerichtet ist.</p>
            <label>Telefon <span className="muted">(optional)</span><input name="company_phone" type="tel" defaultValue={c.phone} placeholder="+41 78 673 21 47" /></label>
            <p className="muted small" style={{ marginTop: -8 }}>Erscheint auf der Kontaktseite, auf Rechnungen und Lieferscheinen und in der E-Mail-Signatur.</p>
          </section>
          <section className="card form" id="kategorien">
            <h2>Kategorien</h2>
            <p className="muted small">Ordnen die Produkte im Shop: Kundinnen filtern oben im Shop nach Kategorie, und jede Kategorie mit Produkten hat eine eigene Seite (gut für Google). Leere Kategorien bleiben unsichtbar. Zuordnung beim Produkt, Reihenfolge wie hier.</p>
            <CategoryEditor initial={s.categories} counts={counts} />
          </section>
        </div>
        <div>
          <section className="card form">
            <h2>Bank &amp; Zahlung</h2>
            <label>Kontoinhaber<input name="bank_holder" required defaultValue={config.bank.holder} /></label>
            <label>Bank<input name="bank_bank" required defaultValue={config.bank.bank} /></label>
            <label>IBAN<input name="bank_iban" required defaultValue={ibanFormat(config.bank.iban)} /></label>
            <p className="muted small" style={{ marginTop: -8 }}>Erscheint auf Rechnungen, im QR-Zahlteil und in der Bestellbestätigung. Bitte genau prüfen.</p>
            <label>Zahlungsfrist Vorauskasse (Tage)<input name="paymentDays" type="number" min={1} max={60} required defaultValue={config.shop.paymentDays} /></label>
          </section>
          <section className="card form" id="versand">
            <h2>Versand</h2>
            <div className="row2">
              <label>Versandpauschale (CHF)<input name="shipping" inputMode="decimal" required defaultValue={(config.shop.shipping / 100).toFixed(2)} /></label>
              <label>Gratisversand ab Warenwert (CHF)<input name="freeShippingFrom" inputMode="decimal" required defaultValue={(config.shop.freeShippingFrom / 100).toFixed(2)} /></label>
            </div>
            <p className="muted small" style={{ marginTop: -8 }}>Gilt sofort für Warenkorb, Kasse, Google-Shopping-Feed und alle Texte der Webseite in vier Sprachen (z. B. «Gratis Versand ab {chf(config.shop.freeShippingFrom)}»). Gratisversand ab 0 = immer gratis. Testbestellungen bleiben immer versandkostenfrei. MWST {config.shop.vatRate} %.</p>
          </section>
          <div className="savebar"><button className="btn btn--primary btn--lg btn--block" type="submit">Speichern</button></div>
        </div>
      </ActionForm>

      <ActionForm action={testCodeAction} className="grid2">
        <section className="card form">
          <h2>Testbestellung zu {chf(TEST_TOTAL)} {test.enabled ? <span className="badge badge--test">aktiv</span> : <span className="badge">aus</span>}</h2>
          <p className="small">Zum Testen der Online-Zahlung mit echtem Geld: Den Testlink im Browser öffnen, dann wie eine Kundin bestellen. Während 24 Stunden kostet in diesem Browser jede Bestellung nur <strong>{chf(TEST_TOTAL)}</strong> (gratis Versand). Die Bestellung ist im Admin und im Betreff der Bestell-Mail als <strong>TEST</strong> markiert. Danach die Bestellung stornieren, dann stimmt auch der Lagerbestand wieder.</p>
          {test.enabled ? (
            <>
              <label>Testlink<input readOnly value={testLink} /></label>
              <p style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <a className="btn btn--primary" href={testLink} target="_blank" rel="noopener noreferrer">Testlink öffnen</a>
                <CopyButton text={testLink} className="btn btn--ghost" label="Link kopieren" />
                <button className="btn btn--ghost" type="submit" name="op" value="renew">Neuen Link erzeugen</button>
                <button className="btn btn--ghost" type="submit" name="op" value="off">Ausschalten</button>
              </p>
              <p className="muted small">Den Link nicht weitergeben: Wer ihn hat, bestellt für {chf(TEST_TOTAL)}. Ausschalten oder neu erzeugen macht alte Links sofort ungültig. Lehnt Payrexx den kleinen Betrag ab, wird die Testbestellung auf Vorauskasse umgestellt und der Grund steht im Verlauf der Bestellung.</p>
            </>
          ) : (
            <p><button className="btn btn--primary" type="submit" name="op" value="on">Testcode einschalten</button></p>
          )}
        </section>
      </ActionForm>
    </>
  );
}
