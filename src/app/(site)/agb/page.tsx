import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { config } from '@/lib/config';
import { chf } from '@/lib/format';

export const metadata: Metadata = { title: 'Allgemeine Geschäftsbedingungen' };

export default function Agb() {
  const c = config.company;
  return (
    <>
      <PageHero crumb="AGB" title="Allgemeine Geschäftsbedingungen" lead={`Für Bestellungen im Onlineshop von ${c.name}`} />
      <section className="section">
        <div className="wrap prose">
          <h2>1. Geltungsbereich</h2>
          <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Bestellungen über den Onlineshop unter {config.primaryHost}. Vertragspartnerin ist die {c.name}{c.city ? `, ${c.zip} ${c.city}` : ''} (nachfolgend «wir»). Abweichende Bedingungen der Kundschaft gelten nur, wenn wir ihnen schriftlich zustimmen.</p>
          <h2>2. Angebot und Vertragsabschluss</h2>
          <p>Die Darstellung der Produkte im Onlineshop ist kein verbindliches Angebot. Mit dem Klick auf «Zahlungspflichtig bestellen» geben Sie ein verbindliches Angebot ab. Der Vertrag kommt mit unserer Bestellbestätigung per E-Mail zustande, die Ihre Bestellnummer und die Zahlungsangaben enthält.</p>
          <h2>3. Preise</h2>
          <p>Alle Preise verstehen sich in Schweizer Franken (CHF) inklusive der gesetzlichen Mehrwertsteuer. Massgebend ist der Preis zum Zeitpunkt der Bestellung. Für den Versand berechnen wir pauschal {chf(config.shop.shipping)} pro Bestellung.</p>
          <h2>4. Zahlung (Vorauskasse)</h2>
          <p>Die Zahlung erfolgt ausschliesslich per Vorauskasse mittels Banküberweisung auf das in der Bestellbestätigung genannte Konto. Bitte geben Sie im Zahlungszweck Ihre Bestellnummer an. Der Betrag ist innert {config.shop.paymentDays} Tagen nach Bestellung zur Zahlung fällig. Geht innert dieser Frist keine Zahlung ein, sind wir berechtigt, vom Vertrag zurückzutreten und die Bestellung zu stornieren.</p>
          <h2>5. Lieferung</h2>
          <p>Wir liefern ausschliesslich an Adressen in der Schweiz. Der Versand erfolgt mit der Schweizerischen Post nach Eingang der vollständigen Zahlung, in der Regel innert 1 bis 3 Arbeitstagen. Ist ein Produkt wider Erwarten nicht lieferbar, informieren wir Sie umgehend und erstatten bereits geleistete Zahlungen vollständig zurück.</p>
          <h2>6. Eigentumsvorbehalt und Gefahrenübergang</h2>
          <p>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum. Nutzen und Gefahr gehen mit der Übergabe der Ware an die Schweizerische Post auf die Kundschaft über.</p>
          <h2>7. Prüfung, Mängel und Rückgabe</h2>
          <p>Bitte prüfen Sie die Ware bei Erhalt und melden Sie Transportschäden oder Mängel innert 7 Tagen an <a href={`mailto:${config.email.orders}`}>{config.email.orders}</a>. Bei berechtigten Beanstandungen liefern wir nach unserer Wahl Ersatz oder erstatten den Kaufpreis. Lebensmittel sind aus hygienischen Gründen von Umtausch und Rückgabe ausgeschlossen, sofern die Verpackung geöffnet wurde. Ein gesetzliches Widerrufsrecht für Online-Käufe besteht in der Schweiz nicht.</p>
          <h2>8. Haftung</h2>
          <p>Wir haften im Rahmen der gesetzlichen Bestimmungen. Die Haftung für leichte Fahrlässigkeit ist, soweit gesetzlich zulässig, ausgeschlossen.</p>
          <h2>9. Datenschutz</h2>
          <p>Wir bearbeiten Ihre Personendaten gemäss unserer <Link href="/datenschutz">Datenschutzerklärung</Link>.</p>
          <h2>10. Anwendbares Recht und Gerichtsstand</h2>
          <p>Es gilt ausschliesslich schweizerisches Recht unter Ausschluss des UN-Kaufrechts (CISG). Gerichtsstand ist der Sitz der {c.name}, soweit nicht zwingende Bestimmungen einen anderen Gerichtsstand vorsehen.</p>
        </div>
      </section>
    </>
  );
}
