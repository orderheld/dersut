import type { Metadata } from 'next';
import { ActionForm } from '@/components/admin/ActionForm';
import { CategoryEditor } from '@/components/admin/CategoryEditor';
import { requireAdmin } from '@/lib/admin';
import { config } from '@/lib/config';
import { query } from '@/lib/db';
import { chf, ibanFormat } from '@/lib/format';
import { currentSettings } from '@/lib/settings-core';
import { saveSettingsAction } from '../actions';

export const metadata: Metadata = { title: 'Firma & Shop' };

export default async function ShopSettings() {
  await requireAdmin();
  const rows = await query<{ category: string; n: number }>(`SELECT category, COUNT(*)::int AS n FROM products WHERE category <> '' GROUP BY category`);
  const counts = Object.fromEntries(rows.map((r) => [r.category, r.n]));
  const c = config.company;
  const s = currentSettings();

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
            <label>Telefon <span className="muted">(optional)</span><input name="company_phone" type="tel" defaultValue={c.phone} placeholder="+41 61 …" /></label>
            <p className="muted small" style={{ marginTop: -8 }}>Erscheint auf der Kontaktseite, auf Rechnungen und Lieferscheinen und in der E-Mail-Signatur.</p>
          </section>
          <section className="card form" id="kategorien">
            <h2>Kategorien</h2>
            <p className="muted small">Ordnen die Produkte im Shop. Sobald Produkte in mindestens zwei Kategorien sind, zeigt der Shop sie nach Kategorie gruppiert. Zuordnung beim Produkt.</p>
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
          <section className="card">
            <h2>Versand</h2>
            <p className="small">Pauschal <strong>{chf(config.shop.shipping)}</strong>, gratis ab <strong>{chf(config.shop.freeShippingFrom)}</strong> Warenwert. MWST {config.shop.vatRate} %.</p>
            <p className="muted small">Diese Beträge stehen auch in vielen Texten der Webseite in vier Sprachen. Für eine Änderung bitte kurz Bescheid geben, dann wird alles zusammen angepasst.</p>
          </section>
          <div className="savebar"><button className="btn btn--primary btn--lg btn--block" type="submit">Speichern</button></div>
        </div>
      </ActionForm>
    </>
  );
}
